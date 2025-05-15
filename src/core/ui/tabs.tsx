import { Tabs as TabsPrimitive } from "@base-ui-components/react/tabs";
import React from "react";

import { cn } from "@/core/lib/cn";

interface TabsProps extends React.ComponentProps<typeof TabsPrimitive.Root> {
  variant?: "underline" | "default";
}

function Tabs({ className, variant = "default", ...props }: TabsProps) {
  return (
    <TabsPrimitive.Root
      className={cn(
        "group flex flex-col gap-1.5 data-[orientation=vertical]:flex-row",
        className,
      )}
      data-slot="tabs"
      data-variant={variant}
      {...props}
    />
  );
}

function TabsList({
  className,
  children,
  ...props
}: React.ComponentProps<typeof TabsPrimitive.List>) {
  return (
    <TabsPrimitive.List
      className={cn(
        "relative z-0 flex items-center text-muted-foreground data-[orientation=horizontal]:h-9 data-[orientation=vertical]:h-fit data-[orientation=vertical]:flex-col data-[orientation=vertical]:justify-start data-[orientation=horizontal]:justify-center",
        "group-data-[variant=default]:rounded-lg group-data-[variant=default]:bg-muted group-data-[variant=underline]:bg-transparent group-data-[variant=default]:p-[3px] group-data-[variant=underline]:data-[orientation=vertical]:border-r group-data-[variant=underline]:data-[orientation=horizontal]:border-b group-data-[variant=underline]:data-[orientation=vertical]:px-1.5 group-data-[variant=underline]:data-[orientation=horizontal]:py-5",
        className,
      )}
      data-slot="tabs-list"
      {...props}
    >
      {children}
      <TabsIndicator />
    </TabsPrimitive.List>
  );
}

function TabsTrigger({
  className,
  ...props
}: React.ComponentProps<typeof TabsPrimitive.Tab>) {
  return (
    <TabsPrimitive.Tab
      className={cn(
        "flex w-full items-center justify-center gap-1.5 whitespace-nowrap rounded-md border border-transparent font-medium text-muted-foreground text-sm ring-offset-background transition-colors hover:text-foreground focus-visible:border-ring focus-visible:outline-1 focus-visible:outline-ring focus-visible:ring-[3px] focus-visible:ring-ring/50 data-[disabled]:pointer-events-none data-[orientation=horizontal]:px-2 data-[orientation=vertical]:px-1.5 data-[orientation=horizontal]:py-1 data-[orientation=vertical]:py-2 data-[selected]:text-foreground data-[disabled]:opacity-50 [&_svg:not([class*='size-'])]:size-4 [&_svg]:pointer-events-none [&_svg]:shrink-0",
        "group-data-[variant=underline]:hover:border group-data-[variant=underline]:hover:border-border group-data-[variant=underline]:hover:bg-muted group-data-[variant=underline]:dark:hover:border-input",
        className,
      )}
      data-slot="tabs-trigger"
      {...props}
    />
  );
}

function TabsIndicator({
  className,
  ...props
}: React.ComponentProps<typeof TabsPrimitive.Indicator>) {
  return (
    <TabsPrimitive.Indicator
      className={cn(
        "data-[orientation=horizontal]:-translate-y-1/2 data-[orientation=vertical]:-translate-x-1/2 absolute z-[-1] h-[calc(var(--active-tab-height))] w-[var(--active-tab-width)] flex-1 rounded-md transition-all duration-300 ease-out focus-visible:outline-1 focus-visible:ring-[3px] data-[orientation=horizontal]:top-1/2 data-[orientation=vertical]:top-0 data-[orientation=horizontal]:left-0 data-[orientation=vertical]:left-1/2 data-[orientation=horizontal]:translate-x-[var(--active-tab-left)] data-[orientation=vertical]:translate-y-[var(--active-tab-top)]",
        "group-data-[variant=underline]:data-[orientation=horizontal]:after:-bottom-1.5 group-data-[variant=underline]:data-[orientation=vertical]:after:-right-[7px] group-data-[variant=default]:border group-data-[variant=default]:bg-background group-data-[variant=underline]:bg-transparent group-data-[variant=default]:shadow-sm group-data-[variant=underline]:after:absolute group-data-[variant=underline]:after:bg-foreground group-data-[variant=underline]:after:content-[''] group-data-[variant=underline]:data-[orientation=horizontal]:after:h-[2px] group-data-[variant=underline]:data-[orientation=vertical]:after:h-full group-data-[variant=underline]:data-[orientation=horizontal]:after:w-full group-data-[variant=underline]:data-[orientation=vertical]:after:w-[2px] group-data-[variant=default]:dark:border-input",
        className,
      )}
      data-slot="tabs-indicator"
      renderBeforeHydration={true}
      {...props}
    />
  );
}

function TabsContent({
  className,
  ...props
}: React.ComponentProps<typeof TabsPrimitive.Panel>) {
  return (
    <TabsPrimitive.Panel
      className={cn("outline-none", className)}
      data-slot="tabs-content"
      {...props}
    />
  );
}

export { Tabs, TabsContent, TabsIndicator, TabsList, TabsTrigger };
