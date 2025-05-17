import {
  HydrationBoundary,
  type HydrationBoundaryProps,
} from "@/core/lib/query-client";
import { useGetFullOrganization } from "@/core/services/orgs/hooks";
import { Button } from "@/core/ui/button";
import { Card, CardHeader, CardTitle } from "@/core/ui/card";
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
import {
  ChevronRightIcon,
  Edit3Icon,
  EyeIcon,
  UserPlusIcon,
} from "lucide-react";

interface Props extends HydrationBoundaryProps {
  organizationId?: string;
}

export function TeamsTable({ organizationId, ...props }: Props) {
  return (
    <HydrationBoundary {...props}>
      <TeamsTableContent organizationId={organizationId} />
    </HydrationBoundary>
  );
}

function TeamsTableContent({ organizationId }: Pick<Props, "organizationId">) {
  const { data: response } = useGetFullOrganization({
    query: {
      organizationId: organizationId,
    },
  });
  return response?.data?.teams.map((team) => (
    <Card
      className="w-full rounded-md py-2"
      key={team.id}
    >
      <Collapsible
        className="w-full"
        defaultOpen={true}
      >
        <CardHeader className="grid w-full grid-cols-3 grid-rows-1 items-center px-2 text-start">
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

          <Separator />

          <div className="flex h-full flex-row items-center justify-end gap-2">
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
        </CardHeader>
        <CollapsibleContent>{/*  */}</CollapsibleContent>
      </Collapsible>
    </Card>
  ));
}
