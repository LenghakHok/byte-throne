import { authClient } from "@/core/lib/auth-client";
import { cn } from "@/core/lib/cn";
import { useCreateTeam } from "@/core/services/teams/hooks";
import {
  createTeamRequest,
  type CreateTeamRequest,
} from "@/core/services/teams/pipes";
import { Avatar, AvatarFallback } from "@/core/ui/avatar";
import { Button } from "@/core/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/core/ui/dialog";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/core/ui/form";
import { Input } from "@/core/ui/input";
import { Separator } from "@/core/ui/separator";
import { Small } from "@/core/ui/typography";
import { FormAlert } from "@/domains/dashboard/composites/form-alert";
import { valibotResolver } from "@hookform/resolvers/valibot";
import { LoaderCircleIcon, PlusIcon } from "lucide-react";
import { useEffect, useRef, type ComponentPropsWithRef } from "react";
import { useForm } from "react-hook-form";

interface Props extends ComponentPropsWithRef<typeof Dialog> {}

export function TeamsCreateDialog({ ...props }: Props) {
  return (
    <Dialog {...props}>
      <DialogTrigger asChild={true}>
        <Button>
          <PlusIcon />
          <span>Create new team</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="max-h-dvh">
        <DialogHeader>
          <DialogTitle>Create new team</DialogTitle>
          <DialogDescription>
            Fill in the fields below to create a new team
          </DialogDescription>
        </DialogHeader>

        <Separator className="border border-dashed bg-transparent" />

        <TeamsCreateForm />
      </DialogContent>
    </Dialog>
  );
}

export function TeamsCreateForm({
  className,
  ...props
}: ComponentPropsWithRef<"form">) {
  const { data: org } = authClient.useActiveOrganization();

  const { mutate: createTeam, isSuccess, isPending } = useCreateTeam();

  const form = useForm({
    resolver: valibotResolver<CreateTeamRequest, null, CreateTeamRequest>(
      createTeamRequest,
    ),
    defaultValues: {
      name: "",
    },
  });

  const closeRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (isSuccess) {
      closeRef.current?.click();
    }
  }, [isSuccess]);

  return (
    <Form {...form}>
      <form
        className={cn("flex w-full flex-col gap-4", className)}
        onSubmit={form.handleSubmit((v: CreateTeamRequest) => createTeam(v))}
        {...props}
      >
        <FormAlert message={form.formState.errors.root?.message} />
        <FormItem className="grid grid-cols-4 grid-rows-1">
          <FormLabel className="col-span-1 whitespace-nowrap">
            Organization
          </FormLabel>

          <div className="col-span-3 flex w-full flex-row items-center gap-2 rounded-md p-1">
            <Avatar className="size-8">
              <AvatarFallback className="text-sm uppercase">
                {org?.name.slice(0, 2)}
              </AvatarFallback>
            </Avatar>

            <Small>{org?.name}</Small>
          </div>
        </FormItem>

        <Separator className="border border-dashed bg-transparent" />

        <FormField
          name="name"
          render={({ field }) => (
            <FormItem className="grid grid-cols-4">
              <FormLabel className="whitespace-nowrap">Team Name</FormLabel>
              <FormControl>
                <Input
                  className="col-start-2 col-end-5"
                  placeholder="e.g. Bishop"
                  {...field}
                />
              </FormControl>
              <FormDescription className="col-start-2 col-end-5">
                This is the display team name. (Duplicatable)
              </FormDescription>
              <FormMessage className="col-span-full col-start-2 text-start" />
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
          <span>Create new Team</span>
        </Button>

        <DialogClose
          className="-z-10 invisible absolute size-0"
          ref={closeRef}
        />
      </form>
    </Form>
  );
}
