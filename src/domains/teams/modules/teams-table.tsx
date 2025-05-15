import {
  HydrationBoundary,
  type HydrationBoundaryProps,
} from "@/core/lib/query-client";
import { useSuspenseListTeams } from "@/core/services/teams/hooks";

interface Props extends HydrationBoundaryProps {
  organizationId?: string;
}

export function TeamsTable({ organizationId, ...props }: Props) {
  return (
    <HydrationBoundary {...props}>
      <TeamsTableContent />
    </HydrationBoundary>
  );
}

function TeamsTableContent({ organizationId }: Pick<Props, "organizationId">) {
  const { data } = useSuspenseListTeams(undefined, {
    query: {
      organizationId,
    },
  });
  return <pre>{JSON.stringify(data, null, 2)}</pre>;
}
