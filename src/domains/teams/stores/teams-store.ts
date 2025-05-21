import { observable } from "@legendapp/state";

interface TeamsDeleteDialogVariables {
  isOpen: boolean;
  meta: {
    organizationId: string | undefined;
    teamId: string | undefined;
  };
}

export const teamsDeleteDialog$ = observable<TeamsDeleteDialogVariables>({
  isOpen: false,
  meta: {
    organizationId: undefined,
    teamId: undefined,
  },
});

export const teamsUpdateDialog$ = observable({
  isOpen: false,
  meta: {
    teamId: undefined,
  },
});
