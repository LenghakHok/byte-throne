import { cn } from "@/core/lib/cn";
import { Button } from "@/core/ui/button";
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/core/ui/command";
import { command$ } from "@/domains/dashboard/stores/command-store";
import { observer, useObservable } from "@legendapp/state/react";
import { SearchIcon } from "lucide-react";
import type { ComponentPropsWithRef } from "react";
import React from "react";

export function Topbar({
  className,
  children,
  ...props
}: ComponentPropsWithRef<"header">) {
  return (
    <header
      className={cn(
        "flex h-12 w-full items-center justify-between py-2",
        className,
      )}
      {...props}
    >
      {children}
    </header>
  );
}

export const TobarSearch = observer(
  (props: ComponentPropsWithRef<typeof Button>) => {
    const open$ = useObservable(command$);

    React.useEffect(() => {
      const down = (e: KeyboardEvent) => {
        if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
          e.preventDefault();
          open$.set((open) => !open);
        }
      };

      document.addEventListener("keydown", down);
      return () => document.removeEventListener("keydown", down);
    }, [open$]);

    return (
      <>
        <Button
          className="cursor-pointer rounded-full"
          onClick={() => open$.set(true)}
          size="icon"
          variant="ghost"
          {...props}
        >
          <span className="sr-only">Search</span>
          <SearchIcon />
        </Button>
        <CommandDialog
          onOpenChange={(v) => open$.set(v)}
          open={open$.get()}
        >
          <CommandInput placeholder="Type a command or search..." />
          <CommandList>
            <CommandEmpty>No results found.</CommandEmpty>
            <CommandGroup heading="Suggestions">
              <CommandItem>Calendar</CommandItem>
              <CommandItem>Search Emoji</CommandItem>
              <CommandItem>Calculator</CommandItem>
            </CommandGroup>
          </CommandList>
        </CommandDialog>
      </>
    );
  },
);
