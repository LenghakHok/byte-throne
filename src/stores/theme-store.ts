import { computed, observable } from "@legendapp/state";

export const theme$ = observable<"light" | "dark" | "system">("light");
export const resolvedTheme$ = computed<"dark" | "light">(() =>
  theme$.get() === "dark" ||
  (theme$.get() === "system" &&
    window.matchMedia("(prefers-color-scheme: dark)").matches)
    ? "dark"
    : "light",
);
