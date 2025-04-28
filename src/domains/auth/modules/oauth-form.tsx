import { DiscordIcon } from "@/components/icons/discord";
import { FacebookIcon } from "@/components/icons/facebook";
import { GithubIcon } from "@/components/icons/github";
import { GoogleIcon } from "@/components/icons/google";
import { Button } from "@/components/ui/button";
import { Form as FormProvider } from "@/components/ui/form";
import { authClient } from "@/lib/auth-client";
import { cn } from "@/lib/cn";
import { typiaResolver } from "@/lib/typia-resolver";
import { For } from "@/utils/for";
import { AtSignIcon } from "lucide-react";
import { useCallback, type ComponentPropsWithRef } from "react";
import { useForm } from "react-hook-form";

import {
  validateOAuthRequest,
  type OAuthRequest,
} from "@/domains/auth/pipes/oauth.pipe";

interface Props extends ComponentPropsWithRef<"form"> {
  callbackURL?: string;
  requestSignUp?: boolean;
  errorCallbackURL?: string;
  newUserCallbackURL?: string;
}

const oauthProviders = [
  {
    name: "google" as const,
    icon: GoogleIcon,
  },
  {
    name: "facebook" as const,
    icon: FacebookIcon,
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
          "flex w-full flex-wrap gap-4",
          "[&_button_svg]:-translate-y-1/2 [&_button]:relative [&_button_svg]:absolute [&_button_svg]:top-1/2 [&_button_svg]:left-4",
          className,
        )}
        onSubmit={form.handleSubmit(onSubmit)}
        {...props}
      >
        <For
          each={oauthProviders}
          render={(provider) => (
            <Button
              className="w-full rounded-full transition-none"
              key={provider.name}
              onClick={() => form.setValue("provider", provider.name)}
              variant="outline"
            >
              <provider.icon />
              <span>
                Continue with
                <span className="capitalize"> {provider.name}</span>
              </span>
            </Button>
          )}
        />

        <Button
          className="w-full rounded-full transition-none"
          type="button"
          variant="outline"
        >
          <AtSignIcon />
          <span>Continue with Email</span>
        </Button>
      </form>
    </FormProvider>
  );
}
