import { observable } from "@legendapp/state";
import {
  useComputed,
  useObserve,
  useObserveEffect,
} from "@legendapp/state/react";

const theme$ = observable<"theme-light" | "dark" | "system">("theme-light");

export function useThemes() {
  const resolvedTheme$ = useComputed<"dark" | "theme-light">(() =>
    theme$.get() === "dark" ||
    (theme$.get() === "system" &&
      window.matchMedia("(prefers-color-scheme: dark)").matches)
      ? "dark"
      : "theme-light",
  );

  useObserve(
    () => {
      const isDarkMode = document.documentElement.classList.contains("dark");
      theme$.set(isDarkMode ? "dark" : "theme-light");
    },
    { deps: [document] },
  );

  useObserveEffect(() => {
    document.documentElement.classList[
      resolvedTheme$.get() === "dark" ? "add" : "remove"
    ]("dark");
  });

  return { resolvedTheme$, theme$ };
}
