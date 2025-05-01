import { Particles } from "@/components/magic/particles";
import { Providers } from "@/components/providers";
import { cn } from "@/lib/cn";
import { resolvedTheme$ } from "@/stores/theme-store";
import { observable } from "@legendapp/state";
import { observer, useObserveEffect } from "@legendapp/state/react";
import type { ComponentPropsWithRef } from "react";

const color$ = observable("#000000");

export const AuthLayout = observer(
  ({ children, className, ...props }: ComponentPropsWithRef<"main">) => {
    useObserveEffect(
      () => {
        if (resolvedTheme$.get() === "dark") {
          color$.set("#ffffff");
        } else {
          color$.set("#000000");
        }
      },
      {
        deps: [],
      },
    );

    return (
      <Providers>
        <main
          className={cn(
            "relative flex size-full flex-col items-center justify-center overflow-hidden rounded-sm border bg-background",
            className,
          )}
          {...props}
        >
          {children}
          <Particles
            className="absolute inset-0"
            color={color$.get()}
            ease={80}
            quantity={100}
            refresh={true}
          />
        </main>
      </Providers>
    );
  },
);
