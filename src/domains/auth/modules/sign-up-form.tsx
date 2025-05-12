import { authClient } from "@/core/lib/auth-client";
import { Button } from "@/core/ui/button";
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
import {
  signUpRequestSchema,
  type SignUpRequest,
} from "@/domains/auth/pipes/sign-up.pipe";
import { valibotResolver } from "@hookform/resolvers/valibot";
import { AtSignIcon, UserIcon } from "lucide-react";
import { useCallback } from "react";
import { useForm } from "react-hook-form";

export function SignUpForm() {
  const form = useForm<SignUpRequest>({
    resolver: valibotResolver<SignUpRequest, unknown, SignUpRequest>(
      signUpRequestSchema,
    ),
    defaultValues: {
      givenName: "",
      familyName: "",
      email: "",
      password: "",
    },
  });

  const onSubmit = useCallback(
    (v: SignUpRequest) =>
      authClient.signUp.email({
        email: v.email,
        name: `${v.givenName} ${v.familyName}`,
        password: v.password,
        callbackURL: "/auth/sign-up",
      }),
    [],
  );

  return (
    <Form {...form}>
      <form
        className="space-y-4"
        onSubmit={form.handleSubmit(onSubmit)}
      >
        <div className="grid w-full grid-cols-2 grid-rows-1 items-start justify-between gap-4">
          <FormField
            control={form.control}
            name="givenName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Given Name</FormLabel>
                <FormControl>
                  <InputIcon
                    icon={UserIcon}
                    placeholder="John"
                    type="text"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="familyName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Family Name</FormLabel>
                <FormControl>
                  <InputIcon
                    icon={UserIcon}
                    placeholder="Doe"
                    type="text"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

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

        <FormField
          control={form.control}
          name="accept"
          render={({ field }) => (
            <FormItem className="flex flex-row items-center space-y-0 py-2">
              <FormControl>
                <Checkbox
                  checked={field.value !== undefined ? field.value : false}
                  onCheckedChange={field.onChange}
                />
              </FormControl>
              <FormLabel className="text-muted-foreground">
                Accept terms and conditions
              </FormLabel>
            </FormItem>
          )}
        />

        <Button
          className="w-full font-bold"
          type="submit"
        >
          Sign Up
        </Button>
      </form>
    </Form>
  );
}
