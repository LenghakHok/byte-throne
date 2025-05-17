import { theme$ } from "@/core/stores/theme-store";
import { observer } from "@legendapp/state/react";
import type React from "react";
import { Toaster as Sonner, type ToasterProps } from "sonner";

export const Toaster = observer(({ ...props }: ToasterProps) => {
  return (
    <Sonner
      className="toaster group"
      style={
        {
          "--normal-bg": "var(--popover)",
          "--normal-text": "var(--popover-foreground)",
          "--normal-border": "var(--border)",
        } as React.CSSProperties
      }
      theme={theme$.get() as ToasterProps["theme"]}
      {...props}
    />
  );
});
