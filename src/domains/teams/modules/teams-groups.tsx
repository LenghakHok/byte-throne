import { UserAvatar } from "@/core/components/user-avatar";
import { cn } from "@/core/lib/cn";
import {
  HydrationBoundary,
  type HydrationBoundaryProps,
} from "@/core/lib/query-client";
import { useGetFullOrganization } from "@/core/services/orgs/hooks";
import { Badge } from "@/core/ui/badge";
import { Button } from "@/core/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/core/ui/card";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/core/ui/collapsible";
import { Separator } from "@/core/ui/separator";
import { Muted } from "@/core/ui/typography";
import { If } from "@/core/utils/if";
import {
  TeamsActionsContent,
  TeamsActionsDropdownMenu,
  TeamsActionsTrigger,
} from "@/domains/teams/composites/teams-actions";
import { TeamsGroupsTable } from "@/domains/teams/composites/teams-groups-table";
import { teamsTableColumns } from "@/domains/teams/composites/teams-table-columns";
import {
  useTeamsGroupsData,
  type TeamsGroupDataMember,
  type UseTeamsGroupsDataReturn,
} from "@/domains/teams/hooks/use-teams-groups-data";
import {
  getCoreRowModel,
  useReactTable,
  type Table,
} from "@tanstack/react-table";
import { ChevronRightIcon, Edit3Icon, EyeIcon, PlusIcon } from "lucide-react";
import { useState, type ComponentPropsWithRef, type ReactNode } from "react";
import { teamsUpdateDialog$ } from "../stores/teams-store";

interface Props extends HydrationBoundaryProps {
  organizationId?: string;
}

export function TeamsGroups({ organizationId, ...props }: Props) {
  return (
    <HydrationBoundary {...props}>
      <TeamsGroup organizationId={organizationId} />
    </HydrationBoundary>
  );
}

function TeamsGroup({ organizationId }: Pick<Props, "organizationId">) {
  const [rowSelection, setRowSelection] = useState({});

  const { data: response } = useGetFullOrganization({
    query: {
      organizationId: organizationId,
    },
  });

  const data = useTeamsGroupsData(response?.data);

  const table = useReactTable({
    data: data?.members ?? ([] as TeamsGroupDataMember[]),
    columns: teamsTableColumns,
    getCoreRowModel: getCoreRowModel(),
    onRowSelectionChange: setRowSelection,
    state: {
      rowSelection,
    },
  });

  return data?.teams.map((team) => (
    <Card
      className="z-10 w-full rounded-lg bg-secondary p-1"
      key={team.id}
    >
      <Collapsible
        className="w-full"
        defaultOpen={true}
      >
        <CardHeader className="flex w-full items-center justify-between rounded-md border bg-card p-1 px-2 text-start [.border-b]:py-1">
          <CollapsibleTrigger
            asChild={true}
            className="w-fit"
          >
            <Button
              className="group"
              size="sm"
              variant="link"
            >
              <ChevronRightIcon className="mr-2 text-muted-foreground transition-transform group-data-[state='open']:rotate-90" />
              <CardTitle>{team.name}</CardTitle>
            </Button>
          </CollapsibleTrigger>

          <TeamsGroupsHeader team={team} />
        </CardHeader>
        <CollapsibleContent>
          <CardContent className="rounded-md border bg-card p-0">
            <TeamsGroupsTable
              data={data?.members}
              table={table}
            />
          </CardContent>
        </CollapsibleContent>

        <TeamsGroupsFooter
          data={data}
          table={table}
        />
      </Collapsible>
    </Card>
  ));
}

interface TeamsGroupsHeaderProps extends ComponentPropsWithRef<"div"> {
  team: UseTeamsGroupsDataReturn["teams"][number];
}
function TeamsGroupsHeader({
  className,
  team,
  ...props
}: TeamsGroupsHeaderProps) {
  return (
    <div
      className={cn(
        "flex h-full flex-row items-center justify-end gap-2",
        className,
      )}
      {...props}
    >
      <Button
        onClick={() =>
          teamsUpdateDialog$.set({
            isOpen: true,
            meta: {
              teamId: team.id,
            },
          })
        }
        size="icon"
        variant="ghost"
      >
        <Edit3Icon className="text-muted-foreground" />
        <span className="sr-only">Edit Teams</span>
      </Button>

      <Button
        size="icon"
        variant="ghost"
      >
        <EyeIcon className="text-muted-foreground" />
        <span className="sr-only">View Details</span>
      </Button>

      <Separator
        className="data-[orientation=vertical]:h-4"
        orientation="vertical"
      />

      <TeamsActionsDropdownMenu>
        <TeamsActionsTrigger />
        <TeamsActionsContent
          organizationId={team.organizationId}
          teamId={team.id}
        />
      </TeamsActionsDropdownMenu>
    </div>
  );
}

interface TeamsGroupsFooterProps extends ComponentPropsWithRef<"div"> {
  table: Table<TeamsGroupDataMember>;
  data: UseTeamsGroupsDataReturn;
}
function TeamsGroupsFooter({
  data,
  table,
  className,
  ...props
}: TeamsGroupsFooterProps) {
  return (
    <CardFooter
      className={cn(
        "flex w-full flex-row items-center justify-between gap-4 p-0",
        className,
      )}
      {...props}
    >
      <div className="flex flex-row items-center justify-end gap-6 px-2">
        <TeamGroupMeta
          asChild={true}
          label="Owner"
        >
          <UserAvatar
            className="size-5 border border-b-2"
            user={data.members.filter((user) => user.role === "owner")[0].user}
          />
        </TeamGroupMeta>

        <TeamGroupMeta label="Admins">
          {data.members.filter((user) => user.role === "admin").length}
        </TeamGroupMeta>

        <TeamGroupMeta label="Members">
          {data.members.filter((user) => user.role === "member").length}
        </TeamGroupMeta>

        <TeamGroupMeta label="All">{data.members.length}</TeamGroupMeta>
      </div>

      <Button
        className="text-muted-foreground"
        variant="ghost"
      >
        <PlusIcon />
        <span>Add Members</span>
      </Button>
    </CardFooter>
  );
}

interface TeamGroupMetaProps extends ComponentPropsWithRef<"span"> {
  label: ReactNode | undefined;

  asChild?: boolean;
}

function TeamGroupMeta({
  label,
  className,
  asChild,
  children,
  ...props
}: TeamGroupMetaProps) {
  return (
    <span
      className={cn("inline-flex items-center gap-2", className)}
      {...props}
    >
      {asChild ? (
        children
      ) : (
        <Badge
          className="border-b-2 bg-card text-xxs"
          variant="outline"
        >
          {children}
        </Badge>
      )}
      <If isTrue={Boolean(label)}>
        <Muted className="text-xs uppercase tracking-widest">{label}</Muted>
      </If>
    </span>
  );
}
