import {
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  Form as FormProvider,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/cn";
import { useCreateOrg } from "@/services/org/hooks";
import type { ComponentPropsWithRef } from "react";
import { useForm } from "react-hook-form";

interface CreateOrgDialogContentProps
  extends ComponentPropsWithRef<typeof DialogContent> {}

export function CreateOrgDialogContent({
  className,
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

      <CreateOrganizationForm />
    </DialogContent>
  );
}

interface CreateOrganizationFormProps extends ComponentPropsWithRef<"form"> {}

export function CreateOrganizationForm({
  className,
  ...props
}: CreateOrganizationFormProps) {
  const form = useForm();

  const onValid = useCreateOrg();

  return (
    <FormProvider {...form}>
      <form
        className={cn("flex w-full flex-col gap-4", className)}
        onSubmit={form.handleSubmit(onValid)}
        {...props}
      >
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
                  placeholder="Acme ltd."
                  {...field}
                />
              </FormControl>
              <FormDescription>
                This will be your identifier of your company in the url.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Invitations */}
      </form>
    </FormProvider>
  );
}
