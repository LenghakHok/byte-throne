import { authClient } from "@/core/lib/auth-client";
import { cn } from "@/core/lib/cn";
import { useCreateTeam } from "@/core/services/teams/hooks";
import { Alert, AlertDescription } from "@/core/ui/alert";
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
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/core/ui/form";
import { Input } from "@/core/ui/input";
import { Separator } from "@/core/ui/separator";
import { Small } from "@/core/ui/typography";
import { If } from "@/core/utils/if";
import { valibotResolver } from "@hookform/resolvers/valibot";
import { AlertCircleIcon, LoaderCircleIcon, PlusIcon } from "lucide-react";
import { useEffect, useRef, type ComponentPropsWithRef } from "react";
import { useForm } from "react-hook-form";
import { createTeamRequest } from "../pipes/create-team-pipe";

interface Props extends ComponentPropsWithRef<typeof Dialog> {}

export function CreateTeamDialog({ ...props }: Props) {
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

        <CreateTeamForm />
      </DialogContent>
    </Dialog>
  );
}

export function CreateTeamForm({
  className,
  ...props
}: ComponentPropsWithRef<"form">) {
  const { data: org } = authClient.useActiveOrganization();

  const { mutate: createTeam, isSuccess, isPending } = useCreateTeam();

  const form = useForm({
    resolver: valibotResolver(createTeamRequest),
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
        onSubmit={form.handleSubmit((v) => createTeam(v))}
        {...props}
      >
        <If isTrue={Boolean(form.formState.errors.root?.message)}>
          <Alert
            className="rounded-l-none border-0 border-l-2 border-l-current bg-current/5"
            variant="destructive"
          >
            <AlertCircleIcon />
            <AlertDescription>
              {form.formState.errors.root?.message}
            </AlertDescription>
          </Alert>
        </If>

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

        <FormField
          name="name"
          render={({ field }) => (
            <FormItem className="grid grid-cols-4">
              <FormLabel className="whitespace-nowrap">Team Name</FormLabel>
              <FormControl>
                <Input
                  className="col-span-3"
                  placeholder="e.g. Bishop"
                  {...field}
                />
              </FormControl>
              <FormMessage className="col-start-2 col-end-4" />
            </FormItem>
          )}
        />

        <Separator className="border border-dashed bg-transparent" />

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
