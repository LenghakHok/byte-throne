import { Button, buttonVariants } from "@/core/ui/button";
import { Checkbox } from "@/core/ui/checkbox";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/core/ui/form";
import { InputIcon } from "@/domains/auth/composites/input-icon";
import { InputPassword } from "@/domains/auth/composites/input-password";

import { authClient } from "@/core/lib/auth-client";
import { cn } from "@/core/lib/cn";
import {
  signInRequestSchema,
  type SignInRequest,
} from "@/domains/auth/pipes/sign-in.pipe";
import { valibotResolver } from "@hookform/resolvers/valibot";
import { AtSignIcon } from "lucide-react";
import { useCallback } from "react";
import { useForm } from "react-hook-form";

export function SignInForm() {
  const form = useForm({
    resolver: valibotResolver<SignInRequest, unknown, SignInRequest>(
      signInRequestSchema,
    ),
    defaultValues: {
      email: "",
      password: "",
      rememberMe: true,
    },
  });

  const onSubmit = useCallback(
    (v: SignInRequest) =>
      authClient.signIn.email({
        email: v.email,
        password: v.password,
        callbackURL: "/auth/sign-in",
        rememberMe: v.rememberMe,
      }),
    [],
  );

  return (
    <Form {...form}>
      <form
        className="space-y-4"
        onSubmit={form.handleSubmit(onSubmit)}
      >
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <InputIcon
                  icon={AtSignIcon}
                  placeholder="someone@example.com"
                  type="email"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <InputPassword
                  className="placeholder:text-sm"
                  placeholder="Password"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="items-center-safe grid w-full grid-cols-2 grid-rows-1 justify-between gap-4">
          <FormField
            control={form.control}
            name="rememberMe"
            render={({ field }) => (
              <FormItem className="flex flex-row items-center space-y-0">
                <FormControl>
                  <Checkbox
                    checked={field.value !== undefined ? field.value : false}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
                <FormLabel className="text-muted-foreground">
                  Remember me
                </FormLabel>
              </FormItem>
            )}
          />
          <a
            className={cn(
              buttonVariants({ variant: "link", size: "sm" }),
              "p-0",
            )}
            href="/auth/forgot-password"
          >
            Forgot password?
          </a>
        </div>

        <Button
          className="w-full font-bold"
          type="submit"
        >
          Sign In
        </Button>
      </form>
    </Form>
  );
}
