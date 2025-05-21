import { Badge } from "@/core/ui/badge";
import { Button } from "@/core/ui/button";
import { Checkbox } from "@/core/ui/checkbox";
import { ProfileDisplay } from "@/domains/dashboard/modules/profile";
import type { TeamsGroupDataMember } from "@/domains/teams/hooks/use-teams-groups-data";
import type { ColumnDef } from "@tanstack/react-table";
import { format } from "date-fns";
import { ChevronDownIcon } from "lucide-react";

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
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        aria-label="Select row"
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
      />
    ),
    enableSorting: false,
    enableHiding: false,
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
