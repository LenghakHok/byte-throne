import type { authClient } from "@/core/lib/auth-client";
import { cn } from "@/core/lib/cn";
import { useCreateOrg } from "@/core/services/orgs/hooks";
import {
  createOrgRequest,
  type CreateOrgRequest,
} from "@/core/services/orgs/pipes";
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
import { Separator } from "@/core/ui/separator";
import { FormAlert } from "@/domains/dashboard/composites/form-alert";
import { createOrgDialog$ } from "@/domains/org/stores/org-store";
import { valibotResolver } from "@hookform/resolvers/valibot";
import { observer, useObservable } from "@legendapp/state/react";
import { useCallback, useEffect, type ComponentPropsWithRef } from "react";
import { useForm } from "react-hook-form";
import slugify from "slugify";

interface Props extends ComponentPropsWithRef<typeof Dialog> {
  user: typeof authClient.$Infer.Session.user;
}

export const CreateOrgDialog = observer(({ user, ...props }: Props) => {
  const dialog$ = useObservable(createOrgDialog$.isOpen);

  return (
    <Dialog
      onOpenChange={(v) => dialog$.set(v)}
      open={dialog$.get()}
      {...props}
    >
      <CreateOrgDialogContent user={user} />
    </Dialog>
  );
});

interface CreateOrgDialogContentProps
  extends ComponentPropsWithRef<typeof DialogContent> {
  user: typeof authClient.$Infer.Session.user;
}

export function CreateOrgDialogContent({
  className,
  user,
  ...props
}: CreateOrgDialogContentProps) {
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

      <Separator className="border border-dashed bg-transparent" />

      <CreateOrganizationForm user={user} />
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
    resolver: valibotResolver<CreateOrgRequest, null, CreateOrgRequest>(
      createOrgRequest,
    ),
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
        <FormAlert message={form.formState.errors.root?.message} />

        {/* Name */}
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Organization Name</FormLabel>
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
              <FormLabel>Organization Slug</FormLabel>
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

        <Separator className="border border-dashed bg-transparent" />

        <Button type="submit">Create Organization</Button>
      </form>
    </FormProvider>
  );
}
