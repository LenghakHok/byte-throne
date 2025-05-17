import { cn } from "@/core/lib/cn";
import { Button } from "@/core/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/core/ui/table";
import { Muted } from "@/core/ui/typography";
import type { UseTeamsGroupsDataReturn } from "@/domains/teams/hooks/use-teams-groups-data";
import {
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { PlusIcon, UserPlusIcon } from "lucide-react";
import type { ComponentPropsWithRef } from "react";
import React from "react";
import { teamsTableColumns } from "./teams-table-columns";

interface Props extends ComponentPropsWithRef<"div"> {
  data: UseTeamsGroupsDataReturn;
}

export function TeamsGroupsTable({ className, ...props }: Props) {
  const [rowSelection, setRowSelection] = React.useState({});

  const table = useReactTable({
    data: [],
    columns: teamsTableColumns,
    getCoreRowModel: getCoreRowModel(),
    onRowSelectionChange: setRowSelection,
    state: {
      rowSelection,
    },
  });

  return (
    <div
      className={cn("rounded-md border", className)}
      {...props}
    >
      <Table>
        <TableHeader>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header) => {
                return (
                  <TableHead key={header.id}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext(),
                        )}
                  </TableHead>
                );
              })}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody>
          {table.getRowModel().rows?.length ? (
            table.getRowModel().rows.map((row) => (
              <TableRow
                data-state={row.getIsSelected() && "selected"}
                key={row.id}
              >
                {row.getVisibleCells().map((cell) => (
                  <TableCell key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell
                className="h-fit text-center"
                colSpan={teamsTableColumns.length}
              >
                <TeamGroupTableEmpty />
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
}

function TeamGroupTableEmpty({
  className,
  ...props
}: ComponentPropsWithRef<"div">) {
  return (
    <section
      className={cn(
        "flex w-full flex-col items-center justify-center gap-4 py-6",
        className,
      )}
      {...props}
    >
      {/* Icon */}
      <div className="size-fit rounded-full border p-3">
        <UserPlusIcon className="size-6" />
      </div>

      <strong>No Members Found</strong>
      {/* Title */}
      <Muted className="max-w-xs self-center whitespace-normal text-center">
        Members will be apeared here after they have been added or accepted to
        the team.
      </Muted>

      {/* CTA */}
      <div className="flex w-full flex-row items-center justify-center gap-4">
        <Button>
          <PlusIcon />
          Add Members
        </Button>
      </div>
    </section>
  );
}
