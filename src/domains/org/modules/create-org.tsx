import {
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Form as FormProvider } from "@/components/ui/form";
import { cn } from "@/lib/cn";
import { useCallback, type ComponentPropsWithRef } from "react";
import { useForm } from "react-hook-form";

interface Props extends ComponentPropsWithRef<typeof DialogContent> {}

export function CreateOrgDialogContent({ className, ...props }: Props) {
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
    </DialogContent>
  );
}

export function CreateOrganizationForm() {
  const form = useForm();

  const onValid = useCallback(() => {}, []);

  return (
    <FormProvider {...form}>
      <form onSubmit={form.handleSubmit(onValid)}>
        {/* Name */}
        {/* Slug */}

        {/* Invitations */}
      </form>
    </FormProvider>
  );
}
