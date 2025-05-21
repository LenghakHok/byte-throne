import { cn } from "@/core/lib/cn";
import {
  useSuspenseDetailTeam,
  useUpdateTeam,
} from "@/core/services/teams/hooks";
import {
  updateTeamRequest,
  type UpdateTeamRequest,
} from "@/core/services/teams/pipes";
import { Button } from "@/core/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/core/ui/dialog";
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  Form as FormProvider,
} from "@/core/ui/form";
import { Input } from "@/core/ui/input";
import { If } from "@/core/utils/if";
import { FormAlert } from "@/domains/dashboard/composites/form-alert";
import { teamsUpdateDialog$ } from "@/domains/teams/stores/teams-store";
import { valibotResolver } from "@hookform/resolvers/valibot";
import { observer, useObservable } from "@legendapp/state/react";
import { LoaderCircleIcon } from "lucide-react";
import {
  useEffect,
  type ComponentPropsWithoutRef,
  type ComponentPropsWithRef,
} from "react";
import { useForm } from "react-hook-form";

export const TeamsEditDialog = observer(
  ({ ...props }: ComponentPropsWithoutRef<typeof DialogContent>) => {
    const dialog = useObservable(teamsUpdateDialog$);

    return (
      <Dialog
        onOpenChange={(v) => dialog.isOpen.set(v)}
        open={dialog.isOpen.get()}
      >
        <DialogContent {...props}>
          <DialogHeader>
            <DialogTitle>Update the Team</DialogTitle>
            <DialogDescription>
              Change the field below to update the data.
            </DialogDescription>
          </DialogHeader>

          <If isTrue={Boolean(dialog.meta.teamId.get())}>
            <TeamsEditForm teamId={dialog.meta.teamId.get()} />
          </If>
        </DialogContent>
      </Dialog>
    );
  },
);

interface TeamsEditFormProps extends ComponentPropsWithRef<"form"> {
  teamId: string | undefined;
}

export const TeamsEditForm = observer(
  ({ teamId, ...props }: TeamsEditFormProps) => {
    const { data: team } = useSuspenseDetailTeam({ id: teamId ?? "" });

    const { mutate: updateTeam, isPending, isSuccess } = useUpdateTeam();

    const form = useForm<UpdateTeamRequest["data"]>({
      resolver: valibotResolver<
        UpdateTeamRequest["data"],
        undefined,
        UpdateTeamRequest["data"]
      >(updateTeamRequest.entries.data),
      defaultValues: {
        name: team?.data?.name ?? "",
      },
    });

    useEffect(() => {
      if (isSuccess) {
        teamsUpdateDialog$.delete();
      }
    }, [isSuccess]);

    return (
      <FormProvider {...form}>
        <form
          className="flex flex-col gap-4"
          onSubmit={form.handleSubmit((v) =>
            updateTeam({ data: v, teamId: teamId ?? "" }),
          )}
          {...props}
        >
          <FormAlert message={team?.error?.message} />
          <FormAlert message={form.formState.errors.root?.message} />

          <FormField
            name="name"
            render={({ field }) => (
              <FormItem className="grid grid-cols-4">
                <FormLabel>Team Name</FormLabel>
                <FormControl>
                  <Input
                    className="col-start-2 col-end-5"
                    placeholder="e.g. Bishop"
                    {...field}
                  />
                </FormControl>
                <FormDescription className="col-start-2 col-end-5">
                  The name can be duplicatable
                </FormDescription>
                <FormMessage className="col-start-2 col-end-5" />
              </FormItem>
            )}
          />

          <Button
            className={cn(isPending ? "" : "gap-0")}
            disabled={isPending}
            type="submit"
          >
            <LoaderCircleIcon
              className={cn(
                "animate-spin transition-all",
                isPending ? "size-4" : "size-0",
              )}
            />
            <span>Save Changes</span>
          </Button>
        </form>
      </FormProvider>
    );
  },
);
