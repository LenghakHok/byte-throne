import { computed, observable } from "@legendapp/state";

export const themes = {
  light: "light",
  dark: "dark",
  system: "system",
} as const;

export const theme$ = observable<"light" | "dark" | "system">(
  themes[
    typeof localStorage !== "undefined"
      ? (localStorage.getItem("theme") as keyof typeof themes)
      : "system"
  ] ?? "system",
);

// Computed value that resolves the actual theme considering system preference
export const resolvedTheme$ = computed<"dark" | "light">(() =>
  theme$.get() === "dark" ||
  (theme$.get() === "system" &&
    window.matchMedia("(prefers-color-scheme: dark)").matches)
    ? "dark"
    : "light",
);
