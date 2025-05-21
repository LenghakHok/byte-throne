import { cn } from "@/core/lib/cn";
import { useDeleteTeam } from "@/core/services/teams/hooks";
import {
  removeTeamRequest,
  type RemoveTeamRequest,
} from "@/core/services/teams/pipes";
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/core/ui/alert-dialog";
import { Button } from "@/core/ui/button";
import { Form } from "@/core/ui/form";
import { FormAlert } from "@/domains/dashboard/composites/form-alert";
import { teamsDeleteDialog$ } from "@/domains/teams/stores/teams-store";
import { valibotResolver } from "@hookform/resolvers/valibot";
import { observer, useObservable } from "@legendapp/state/react";
import { LoaderCircleIcon } from "lucide-react";
import type { ComponentPropsWithRef } from "react";
import { useForm } from "react-hook-form";

export const TeamsDeleteAlertDialog = observer(
  (props: ComponentPropsWithRef<typeof AlertDialog>) => {
    const dialog = useObservable(teamsDeleteDialog$);
    return (
      <AlertDialog
        onOpenChange={(v) => dialog.isOpen.set(v)}
        open={dialog.isOpen.get()}
        {...props}
      >
        <TeamsDeleteAlertContent />
      </AlertDialog>
    );
  },
);

export function TeamsDeleteAlertContent(
  props: ComponentPropsWithRef<typeof AlertDialogContent>,
) {
  return (
    <AlertDialogContent {...props}>
      <AlertDialogHeader>
        <AlertDialogTitle>
          Are you sure you wanted to delete the team?
        </AlertDialogTitle>
        <AlertDialogDescription>
          This action <strong>cannot be undone</strong>. Once proceed, the data
          will be deleted forever.
        </AlertDialogDescription>
      </AlertDialogHeader>
      <TeamsDeleteForm />
    </AlertDialogContent>
  );
}

export const TeamsDeleteForm = observer(
  ({ className, ...props }: ComponentPropsWithRef<"form">) => {
    const state = useObservable(teamsDeleteDialog$);

    const form = useForm({
      resolver: valibotResolver<RemoveTeamRequest, null, RemoveTeamRequest>(
        removeTeamRequest,
      ),
      defaultValues: {
        organizationId: "",
        teamId: "",
      },
    });

    const { mutate: deleteTeam, isPending } = useDeleteTeam(form);

    return (
      <Form {...form}>
        <form
          className={cn("w-full", className)}
          onSubmit={form.handleSubmit((v) =>
            deleteTeam(v, {
              onSuccess: () => {
                state.delete();
              },
            }),
          )}
          {...props}
        >
          <FormAlert
            className="mb-4"
            message={form.formState.errors.root?.message}
          />

          <AlertDialogFooter>
            <AlertDialogCancel
              onClick={() =>
                state.meta.set({ organizationId: undefined, teamId: undefined })
              }
            >
              No, Keep it.
            </AlertDialogCancel>
            <Button
              className="relative"
              disabled={isPending}
              onClick={() => {
                form.setValue(
                  "organizationId",
                  state.meta.organizationId.get(),
                );
                form.setValue("teamId", state.meta.teamId.get() ?? "");
              }}
              type="submit"
              variant="destructive"
            >
              <LoaderCircleIcon
                className={cn(
                  "animate-spin transition-all",
                  isPending ? "size-4" : "absolute size-0",
                )}
              />
              <span>Yes, Delete.</span>
            </Button>
          </AlertDialogFooter>
        </form>
      </Form>
    );
  },
);
