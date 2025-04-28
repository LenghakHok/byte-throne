import { Particles } from "@/components/magic/particles";
import { Providers } from "@/components/providers";
import { resolvedTheme$ } from "@/stores/theme-store";
import { observable } from "@legendapp/state";
import { observer, useObserveEffect } from "@legendapp/state/react";
import type { PropsWithChildren } from "react";

const color$ = observable("#000000");

export const RootLayout = observer(({ children }: PropsWithChildren) => {
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
      {children}
      <Particles
        className="-z-1 absolute inset-0"
        color={color$.get()}
        ease={80}
        quantity={100}
        refresh={true}
      />
    </Providers>
  );
});
