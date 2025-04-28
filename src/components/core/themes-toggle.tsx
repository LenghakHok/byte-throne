import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useThemes } from "@/hooks/use-themes";
import { observer } from "@legendapp/state/react";
import { MonitorIcon, MoonIcon, SunIcon } from "lucide-react";
import type { ComponentPropsWithRef } from "react";

export const ThemesToggle = observer(
  (props: ComponentPropsWithRef<typeof Button>) => {
    const { theme$ } = useThemes();
    return (
      <DropdownMenu>
        <DropdownMenuTrigger asChild={true}>
          <Button
            size="icon"
            variant="outline"
            {...props}
          >
            <SunIcon className="dark:-rotate-90 rotate-0 scale-100 transition-all dark:scale-0" />
            <MoonIcon className="absolute rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
            <span className="sr-only">Toggle theme</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem onClick={() => theme$.set("theme-light")}>
            <SunIcon />
            <span>Light</span>
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => theme$.set("dark")}>
            <MoonIcon />
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
