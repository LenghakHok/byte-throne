import { DiscordIcon } from "@/components/icons/discord";
import { GithubIcon } from "@/components/icons/github";
import { GoogleIcon } from "@/components/icons/google";
import { Button } from "@/components/ui/button";
import { Form as FormProvider } from "@/components/ui/form";
import { authClient } from "@/lib/auth-client";
import { cn } from "@/lib/cn";
import { typiaResolver } from "@/lib/typia-resolver";
import { For } from "@/utils/for";
import { useCallback, type ComponentPropsWithRef } from "react";
import { useForm } from "react-hook-form";

import {
  validateOAuthRequest,
  type OAuthRequest,
} from "@/domains/auth/pipes/oauth.pipe";
import { If } from "@/utils/if";

interface Props extends ComponentPropsWithRef<"form"> {
  callbackURL?: string;
  requestSignUp?: boolean;
  errorCallbackURL?: string;
  newUserCallbackURL?: string;
  standalone?: boolean;
}

const oauthProviders = [
  {
    name: "google" as const,
    icon: GoogleIcon,
  },
  {
    name: "discord" as const,
    icon: DiscordIcon,
  },
  {
    name: "github" as const,
    icon: GithubIcon,
  },
];

export function OAuthForm({
  className,
  callbackURL,
  requestSignUp,
  errorCallbackURL,
  newUserCallbackURL,
  standalone = true,
  ...props
}: Props) {
  const form = useForm({
    resolver: typiaResolver<OAuthRequest>(validateOAuthRequest),
    defaultValues: {
      provider: "google" as const,
    },
  });

  const onSubmit = useCallback(
    (v: OAuthRequest) => {
      return authClient.signIn.social({
        provider: v.provider,
        callbackURL,
        requestSignUp,
        errorCallbackURL,
        newUserCallbackURL,
      });
    },
    [callbackURL, requestSignUp, errorCallbackURL, newUserCallbackURL],
  );

  return (
    <FormProvider {...form}>
      <form
        className={cn(
          !standalone &&
            "grid grid-cols-2 gap-4 sm:grid-cols-4 [&_button]:relative",
          standalone &&
            "[&_button_svg]:-translate-y-1/2 flex w-full flex-wrap gap-4 [&_button]:relative [&_button_svg]:absolute [&_button_svg]:top-1/2 [&_button_svg]:left-4",
          className,
        )}
        onSubmit={form.handleSubmit(onSubmit)}
        {...props}
      >
        <If isTrue={!standalone}>
          <For
            each={oauthProviders}
            render={(provider) => (
              <Button
                className="transition-none"
                key={provider.name}
                onClick={() => form.setValue("provider", provider.name)}
                variant="outline"
              >
                <provider.icon className="size-4.5!" />
                <span className="sr-only">
                  Continue with
                  <span className="capitalize"> {provider.name}</span>
                </span>
              </Button>
            )}
          />
        </If>
        <If isTrue={standalone}>
          <For
            each={oauthProviders}
            render={(provider) => (
              <Button
                className="w-full transition-none"
                key={provider.name}
                onClick={() => form.setValue("provider", provider.name)}
                variant="outline"
              >
                <provider.icon className="size-4.5!" />
                <span>
                  Continue with
                  <span className="capitalize"> {provider.name}</span>
                </span>
              </Button>
            )}
          />
        </If>
      </form>
    </FormProvider>
  );
}
