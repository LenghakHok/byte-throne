import type { LucideIcon } from "lucide-react";
import type { ComponentPropsWithRef } from "react";

import { cn } from "@/core/lib/cn";
import { Input } from "@/core/ui/input";

type Props = ComponentPropsWithRef<typeof Input> & {
  icon: LucideIcon;
};

export function InputIcon({ className, icon: Icon, ...props }: Props) {
  return (
    <div className="relative">
      <Input
        className={cn("peer ps-9 placeholder:text-sm", className)}
        {...props}
      />
      <div className="pointer-events-none absolute inset-y-0 start-0 flex items-center justify-center ps-3 text-muted-foreground/80 peer-disabled:opacity-50">
        <Icon
          aria-hidden="true"
          className="size-4"
        />
      </div>
    </div>
  );
}
