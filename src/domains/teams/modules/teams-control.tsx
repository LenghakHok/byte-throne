import { cn } from "@/core/lib/cn";
import { Button } from "@/core/ui/button";
import { DropdownMenu, DropdownMenuTrigger } from "@/core/ui/dropdown-menu";
import { Input } from "@/core/ui/input";
import {
  ArrowUpDownIcon,
  ColumnsSettingsIcon,
  LayoutListIcon,
  ListFilterIcon,
  SearchIcon,
} from "lucide-react";
import type { ComponentPropsWithRef } from "react";

interface Props extends ComponentPropsWithRef<"div"> {}

export const TeamsControl = ({ className, ...props }: Props) => {
  return (
    <div
      className={cn(
        "flex flex-row items-center justify-between gap-4",
        className,
      )}
      {...props}
    >
      <div className="flex w-full max-w-fit flex-row items-center gap-4">
        <div className="relative">
          <Input
            className="peer ps-9"
            placeholder="Search"
            type="text"
          />
          <div className="pointer-events-none absolute inset-y-0 start-0 flex items-center justify-center ps-3 text-muted-foreground/80 peer-disabled:opacity-50">
            <SearchIcon
              aria-hidden="true"
              size={16}
            />
          </div>
        </div>

        <DropdownMenu>
          <DropdownMenuTrigger asChild={true}>
            <Button
              className="[&_svg]:text-muted-foreground"
              variant="outline"
            >
              <LayoutListIcon />
              <span>Group</span>
            </Button>
          </DropdownMenuTrigger>
        </DropdownMenu>
      </div>

      <div className="flex w-full max-w-fit flex-row items-center gap-4">
        <Button
          className="[&_svg]:text-muted-foreground"
          variant="outline"
        >
          <ListFilterIcon />
          <span>Filters</span>
        </Button>

        <Button
          className="[&_svg]:text-muted-foreground"
          variant="outline"
        >
          <ArrowUpDownIcon />
          <span>Sort</span>
        </Button>

        <Button
          className="[&_svg]:text-muted-foreground"
          variant="outline"
        >
          <ColumnsSettingsIcon />
          <span>Columns</span>
        </Button>
      </div>
    </div>
  );
};
