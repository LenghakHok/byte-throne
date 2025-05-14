import { cn } from "@/core/lib/cn";
import { Button } from "@/core/ui/button";
import { ListFilterIcon, SearchIcon } from "lucide-react";
import type { ComponentPropsWithRef } from "react";
import DateRangePicker from "../composites/date-range-picker";

interface Props extends ComponentPropsWithRef<"div"> {}

export const TeamsControl = ({ className, ...props }: Props) => {
  return (
    <div
      className={cn("flex flex-row items-center justify-end gap-4", className)}
      {...props}
    >
      <Button
        size="icon"
        variant="outline"
      >
        <span className="sr-only">Search</span>
        <SearchIcon />
      </Button>

      <DateRangePicker className="w-fit" />

      <Button variant="outline">
        <ListFilterIcon />
        <span>Filters</span>
      </Button>
    </div>
  );
};
