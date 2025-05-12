import { authClient } from "@/core/lib/auth-client";
import { cn } from "@/core/lib/cn";
import { useCreateOrg } from "@/core/services/org/hooks";
import { Alert, AlertDescription } from "@/core/ui/alert";
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
import { createOrgRequestSchema } from "@/domains/org/pipes/create-org.pipe";
import { createOrgDialog$ } from "@/domains/org/stores/org-store";
import { valibotResolver } from "@hookform/resolvers/valibot";
import { observer, useObservable } from "@legendapp/state/react";
import { AlertCircleIcon } from "lucide-react";
import { useCallback, useEffect, type ComponentPropsWithRef } from "react";
import { useForm } from "react-hook-form";
import slugify from "slugify";

export const CreateOrgDialog = observer(
  (props: ComponentPropsWithRef<typeof Dialog>) => {
    const dialog$ = useObservable(createOrgDialog$.isOpen);

    return (
      <Dialog
        onOpenChange={(v) => dialog$.set(v)}
        open={dialog$.get()}
        {...props}
      >
        <CreateOrgDialogContent />
      </Dialog>
    );
  },
);

interface CreateOrgDialogContentProps
  extends ComponentPropsWithRef<typeof DialogContent> {}

export function CreateOrgDialogContent({
  className,
  ...props
}: CreateOrgDialogContentProps) {
  const { data: session } = authClient.useSession();

  return (
    <DialogContent
      className={cn(className)}
      {...props}
    >
      <DialogHeader>
        <DialogTitle>Create new Organization</DialogTitle>
        <DialogDescription>
          Fill in the fields below to create new organization
        </DialogDescription>
      </DialogHeader>

      <CreateOrganizationForm user={session?.user} />
    </DialogContent>
  );
}

interface CreateOrganizationFormProps extends ComponentPropsWithRef<"form"> {
  user?: typeof authClient.$Infer.Session.user;
}

export function CreateOrganizationForm({
  user,
  className,
  ...props
}: CreateOrganizationFormProps) {
  const form = useForm({
    resolver: valibotResolver(createOrgRequestSchema),
    defaultValues: {
      name: "",
      slug: "",
      userId: user?.id ?? "",
    },
  });

  const { mutate: createOrg, isSuccess } = useCreateOrg(form);

  const handleSlugify = useCallback((value: string) => {
    return slugify(value, {
      trim: false,
    });
  }, []);

  useEffect(() => {
    if (isSuccess) {
      createOrgDialog$.isOpen.set(false);
    }
  }, [isSuccess]);

  return (
    <FormProvider {...form}>
      <form
        className={cn("flex w-full flex-col gap-4", className)}
        onSubmit={form.handleSubmit((v) => createOrg(v))}
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

        {/* Name */}
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input
                  placeholder="Acme ltd."
                  {...field}
                  onChange={(e) => {
                    if (!form.formState.dirtyFields.slug) {
                      form.setValue(
                        "slug",
                        handleSlugify(e.currentTarget.value),
                      );
                    }
                    field.onChange(e);
                  }}
                />
              </FormControl>
              <FormDescription>
                This is your public display organization name.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Slug */}
        <FormField
          control={form.control}
          name="slug"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Slug</FormLabel>
              <FormControl>
                <Input
                  placeholder="acme-ltd"
                  {...field}
                  onChange={(e) =>
                    field.onChange(handleSlugify(e.currentTarget.value))
                  }
                />
              </FormControl>
              <FormDescription>
                This will be your identifier of your company in the url.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit">Create Organization</Button>
      </form>
    </FormProvider>
  );
}
