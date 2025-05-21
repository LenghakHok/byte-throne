import { Badge } from "@/core/ui/badge";
import { Button } from "@/core/ui/button";
import { Checkbox } from "@/core/ui/checkbox";
import { Small } from "@/core/ui/typography";
import { ProfileDisplay } from "@/domains/dashboard/modules/profile";
import type { TeamsGroupDataMember } from "@/domains/teams/hooks/use-teams-groups-data";
import type { ColumnDef } from "@tanstack/react-table";
import { format } from "date-fns";
import { ChevronDownIcon, CopyIcon } from "lucide-react";
import { toast } from "sonner";

export const teamsTableColumns: ColumnDef<TeamsGroupDataMember>[] = [
  {
    id: "selection",
    header: ({ table }) => (
      <Checkbox
        aria-label="Select all"
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        className="ml-4"
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        aria-label="Select row"
        checked={row.getIsSelected()}
        className="ml-4"
        onCheckedChange={(value) => row.toggleSelected(!!value)}
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    header: "Identifier",
    cell: ({ row }) => (
      <span className="inline-flex items-center gap-2 text-muted-foreground">
        {row.original.id.slice(0, 4)}...{row.original.id.slice(-4)}
        <Button
          className="size-6"
          onClick={async () => {
            toast.success(
              <span>
                <Small className="font-semibold italic">
                  {row.original.id}
                </Small>
                &nbsp; is copied to clipboard
              </span>,
            );
            return await navigator.clipboard.writeText(row.original.id);
          }}
          size="icon"
          variant="ghost"
        >
          <span className="sr-only">Copy ID</span>
          <CopyIcon />
        </Button>
      </span>
    ),
  },
  {
    header: "Profile",
    cell: ({ row }) => <ProfileDisplay user={row.original.user} />,
  },
  {
    header: "Teams",
    cell: ({ row }) => <Badge>{row.original.team?.name}</Badge>,
  },
  {
    header: "Role",
    accessorKey: "role",
    cell: ({ getValue }) => (
      <Badge
        className="capitalize"
        variant="outline"
      >
        {getValue() as string}
      </Badge>
    ),
  },
  {
    header: "Created Date",
    cell: ({ row }) => format(row.original.createdAt, "dd - MMM - yyyy"),
  },
  {
    id: "Actions",
    cell: () => (
      <div className="flex items-center justify-end">
        <Button
          size="sm"
          variant="outline"
        >
          <span>Actions</span>
          <ChevronDownIcon />
        </Button>
      </div>
    ),
  },
];
