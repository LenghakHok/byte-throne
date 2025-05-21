import { cn } from "@/core/lib/cn";
import { useUpdateTeam } from "@/core/services/teams/hooks";
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
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  Form as FormProvider,
} from "@/core/ui/form";
import { Input } from "@/core/ui/input";
import { valibotResolver } from "@hookform/resolvers/valibot";
import { observer } from "@legendapp/state/react";
import { LoaderCircleIcon } from "lucide-react";
import type { ComponentPropsWithoutRef, ComponentPropsWithRef } from "react";
import { useForm } from "react-hook-form";

export const TeamsEdit = observer(
  ({ ...props }: ComponentPropsWithoutRef<typeof DialogContent>) => {
    return (
      <Dialog>
        <DialogContent {...props}>
          <DialogHeader>
            <DialogTitle>Update the Team</DialogTitle>
            <DialogDescription>
              Change the field below to update the data.
            </DialogDescription>
          </DialogHeader>

          <TeamsEditForm teamId={undefined} />
        </DialogContent>
      </Dialog>
    );
  },
);

interface TeamsEditFormProps extends ComponentPropsWithRef<"form"> {
  teamId: string | undefined;
}

export function TeamsEditForm({ ...props }: TeamsEditFormProps) {
  const { mutate: updateTeam, isPending } = useUpdateTeam();

  const form = useForm<UpdateTeamRequest["data"]>({
    resolver: valibotResolver<
      UpdateTeamRequest["data"],
      undefined,
      UpdateTeamRequest["data"]
    >(updateTeamRequest.entries.data),
    defaultValues: {
      name: "",
    },
  });

  return (
    <FormProvider {...form}>
      <form
        onSubmit={form.handleSubmit((v) => updateTeam({ data: v, teamId: "" }))}
        {...props}
      >
        <FormField
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Team Name</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
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
}
