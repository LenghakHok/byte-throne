import { observable } from "@legendapp/state";

interface TeamsDeleteDialogVariables {
  isOpen: boolean;
  meta: {
    organizationId: string | undefined;
    teamId: string | undefined;
  };
}

interface TeamsUpdateDialogVariables {
  isOpen: boolean;
  meta: {
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

export const teamsUpdateDialog$ = observable<TeamsUpdateDialogVariables>({
  isOpen: false,
  meta: {
    teamId: undefined,
  },
});
