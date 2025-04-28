import { resolvedTheme$, theme$ } from "@/stores/theme-store";
import { observer, useObserve, useObserveEffect } from "@legendapp/state/react";
import type { PropsWithChildren } from "react";

export const ThemeProvider = observer(({ children }: PropsWithChildren) => {
  useObserve(
    () => {
      const isDarkMode = document.documentElement.classList.contains("dark");
      theme$.set(isDarkMode ? "dark" : "light");
    },
    { deps: [document.documentElement.classList.contains("dark")] },
  );

  useObserveEffect(() => {
    document.documentElement.classList[
      resolvedTheme$.get() === "dark" ? "add" : "remove"
    ]("dark");
  });

  return children;
});
