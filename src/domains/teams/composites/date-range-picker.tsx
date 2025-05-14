import { cn } from "@/core/lib/cn";
import { Button } from "@/core/ui/button";
import { Calendar } from "@/core/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/core/ui/popover";
import { addDays, format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import React, { type ComponentPropsWithRef } from "react";
import type { DateRange } from "react-day-picker";

export default function DateRangePicker({
  className,
  ...props
}: ComponentPropsWithRef<"div">) {
  const [date, setDate] = React.useState<DateRange | undefined>({
    from: addDays(new Date(), -30),
    to: new Date(),
  });

  return (
    <div
      className={cn("grid gap-2", className)}
      {...props}
    >
      <Popover>
        <PopoverTrigger asChild={true}>
          <Button
            className={cn(
              "w-fit justify-start text-left font-normal",
              !date && "text-muted-foreground",
            )}
            id="date"
            variant="outline"
          >
            <CalendarIcon className="mr-2 h-4 w-4" />
            {date?.from ? (
              date.to ? (
                <>
                  {format(date.from, "LLL dd, y")} -&nbsp;
                  {format(date.to, "LLL dd, y")}
                </>
              ) : (
                format(date.from, "LLL dd, y")
              )
            ) : (
              <span>Pick a date</span>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent
          align="start"
          className="w-auto p-0"
        >
          <Calendar
            autoFocus={true}
            defaultMonth={date?.from}
            mode="range"
            numberOfMonths={2}
            onSelect={setDate}
            selected={date}
          />
        </PopoverContent>
      </Popover>
    </div>
  );
}
