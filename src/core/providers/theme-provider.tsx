import { resolvedTheme$, theme$ } from "@/core/stores/theme-store";
import { observer, useObserveEffect } from "@legendapp/state/react";
import type { PropsWithChildren } from "react";

export const ThemeProvider = observer(({ children }: PropsWithChildren) => {
  useObserveEffect(() => {
    document.documentElement.classList[
      resolvedTheme$.get() === "dark" ? "add" : "remove"
    ]("dark");
  });

  useObserveEffect(() => {
    localStorage.setItem("theme", theme$.get());
  });

  return children;
});
