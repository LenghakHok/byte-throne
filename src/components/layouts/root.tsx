import { Particles } from "@/components/magic/particles";
import { useThemes } from "@/hooks/use-themes";
import { observable } from "@legendapp/state";
import { observer, useObserveEffect } from "@legendapp/state/react";
import type { PropsWithChildren } from "react";

const color$ = observable("#000000");

export const RootLayout = observer(({ children }: PropsWithChildren) => {
  const { resolvedTheme$ } = useThemes();

  useObserveEffect(() => {
    console.log(resolvedTheme$.get());
    if (resolvedTheme$.get() === "dark") {
      color$.set("#ffffff");
    } else {
      color$.set("#000000");
    }
  });

  return (
    <div className="relative flex h-dvh w-full flex-col items-center justify-center overflow-hidden">
      {children}
      <Particles
        className="-z-1 absolute inset-0"
        color={color$.get()}
        ease={80}
        quantity={100}
        refresh={true}
      />
    </div>
  );
});
