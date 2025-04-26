import { Particles } from "@/components/magic/particles";
import { observer, useObservable } from "@legendapp/state/react";
import type { PropsWithChildren } from "react";

export const RootLayout = observer(({ children }: PropsWithChildren) => {
  const color$ = useObservable("#000000");

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
