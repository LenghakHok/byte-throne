import { cn } from "@/core/lib/cn";
import { theme$ } from "@/core/stores/theme-store";
import { Button } from "@/core/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/core/ui/dropdown-menu";
import { observer } from "@legendapp/state/react";
import { MonitorIcon, MoonStarIcon, SunIcon } from "lucide-react";
import type { ComponentPropsWithRef } from "react";

export const ThemesToggle = observer(
  ({ className, ...props }: ComponentPropsWithRef<typeof Button>) => {
    const theme = theme$.get();

    return (
      <DropdownMenu>
        <DropdownMenuTrigger asChild={true}>
          <Button
            className={cn("relative", className)}
            size="icon"
            variant="outline"
            {...props}
          >
            <SunIcon
              className={cn(
                "dark:-rotate-90 rotate-0 scale-100 transition-all dark:scale-0",
                theme === "system" ? "-rotate-90 scale-0" : "",
              )}
              suppressHydrationWarning={true}
            />
            <MoonStarIcon
              className={cn(
                "absolute rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100",
                theme === "system" ? "dark:-rotate-90 dark:scale-0" : "",
              )}
              suppressHydrationWarning={true}
            />

            <MonitorIcon
              className={cn(
                "absolute rotate-90 scale-0 transition-all",
                theme === "system" ? "rotate-0 scale-100" : "",
              )}
              suppressHydrationWarning={true}
            />

            <span className="sr-only">Toggle theme</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem onClick={() => theme$.set("light")}>
            <SunIcon />
            <span>Light</span>
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => theme$.set("dark")}>
            <MoonStarIcon />
            <span>Dark</span>
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => theme$.set("system")}>
            <MonitorIcon />
            <span>System</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    );
  },
);
