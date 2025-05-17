import { cn } from "@/core/lib/cn";
import {
  HydrationBoundary,
  type HydrationBoundaryProps,
} from "@/core/lib/query-client";
import { useGetFullOrganization } from "@/core/services/orgs/hooks";
import { Button } from "@/core/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/core/ui/card";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/core/ui/collapsible";
import { Separator } from "@/core/ui/separator";
import {
  TeamsActionsContent,
  TeamsActionsDropdownMenu,
  TeamsActionsTrigger,
} from "@/domains/teams/composites/teams-actions";
import { TeamsGroupsTable } from "@/domains/teams/composites/teams-groups-table";
import {
  useTeamsGroupsData,
  type UseTeamsGroupsDataReturn,
} from "@/domains/teams/hooks/use-teams-groups-data";
import {
  ChevronRightIcon,
  Edit3Icon,
  EyeIcon,
  UserPlusIcon,
} from "lucide-react";
import type { ComponentPropsWithRef } from "react";

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
  const { data: response } = useGetFullOrganization({
    query: {
      organizationId: organizationId,
    },
  });

  const data = useTeamsGroupsData(response?.data);

  return data?.teams.map((team) => (
    <Card
      className="w-full rounded-md p-0"
      key={team.id}
    >
      <Collapsible
        className="w-full"
        defaultOpen={true}
      >
        <CardHeader className="flex w-full items-center justify-between p-2 px-2 text-start">
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
          <CardContent className="p-0">
            <TeamsGroupsTable
              className="p-4 pt-0"
              data={data?.members}
            />
          </CardContent>
        </CollapsibleContent>
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
        size="sm"
        variant="ghost"
      >
        <UserPlusIcon className="text-muted-foreground" />
        <span className="sr-only">Add Members</span>
      </Button>

      <Button
        size="sm"
        variant="ghost"
      >
        <Edit3Icon className="text-muted-foreground" />
        <span className="sr-only">Edit Teams</span>
      </Button>

      <Button
        size="sm"
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
