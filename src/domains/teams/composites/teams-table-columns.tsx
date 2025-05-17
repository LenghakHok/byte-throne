import { Button } from "@/core/ui/button";
import { Checkbox } from "@/core/ui/checkbox";
import { ProfileDisplay } from "@/domains/dashboard/modules/profile";
import type { TeamsGroupDataMember } from "@/domains/teams/hooks/use-teams-groups-data";
import type { ColumnDef } from "@tanstack/react-table";
import { format } from "date-fns";
import { MoreVerticalIcon } from "lucide-react";

export const teamsTableColumns: ColumnDef<TeamsGroupDataMember>[] = [
  {
    id: "selection",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getToggleAllRowsSelectedHandler()
            ? "indeterminate"
            : table.getIsAllRowsSelected()
        }
        onChange={table.getToggleAllRowsSelectedHandler()} //or getToggleAllPageRowsSelectedHandler
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        disabled={!row.getCanSelect()}
        onChange={row.getToggleSelectedHandler()}
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    header: "User",
    cell: ({ row }) => {
      return <ProfileDisplay user={row.original.user} />;
    },
  },
  {
    header: "Identifier",
    accessorKey: "id",
  },
  {
    header: "Role",
    accessorKey: "role",
  },
  {
    header: "Created Date",
    cell: ({ row }) => {
      return format(row.original.createdAt, "dd - MMM - yyyy");
    },
  },
  {
    id: "Actions",
    cell: () => {
      <Button variant="ghost">
        <MoreVerticalIcon />
      </Button>;
    },
  },
];
