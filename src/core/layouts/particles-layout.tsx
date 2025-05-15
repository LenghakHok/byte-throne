import { resolvedTheme$ } from "@/core/stores/theme-store";
import { Particles } from "@/core/ui/particles";
import { observable } from "@legendapp/state";
import { observer, useObserveEffect } from "@legendapp/state/react";
import type { PropsWithChildren } from "react";

const color$ = observable("#000000");

export const ParticlesLayout = observer(({ children }: PropsWithChildren) => {
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
    <>
      {children}
      <Particles
        className="absolute inset-0"
        color={color$.get()}
        ease={80}
        quantity={100}
        refresh={true}
      />
    </>
  );
});
