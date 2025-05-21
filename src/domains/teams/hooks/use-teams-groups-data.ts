import type { GetFullOrganizationResponse } from "@/core/services/orgs/pipes";
import { useMemo } from "react";

export type TeamsGroupDataMember =
  GetFullOrganizationResponse["members"][number] & {
    team?: GetFullOrganizationResponse["teams"][number] | undefined | null;
  };

export interface UseTeamsGroupsDataReturn extends GetFullOrganizationResponse {
  members: TeamsGroupDataMember[];
}

export function useTeamsGroupsData(
  data: GetFullOrganizationResponse | null | undefined,
): UseTeamsGroupsDataReturn | undefined {
  return useMemo(() => {
    if (data?.members) {
      const members: TeamsGroupDataMember[] = data?.members;

      for (const member of members) {
        member.team = data.teams.filter(({ id }) => id === member.teamId)[0];
      }

      data.members = members;

      return data as UseTeamsGroupsDataReturn;
    }
  }, [data]);
}
