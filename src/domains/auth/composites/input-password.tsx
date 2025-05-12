import { cn } from "@/core/lib/cn";
import { Button } from "@/core/ui/button";
import { Input } from "@/core/ui/input";
import { EyeClosedIcon, EyeIcon, KeyIcon } from "lucide-react";
import {
  useCallback,
  useId,
  useState,
  type ComponentPropsWithRef,
} from "react";

export function InputPassword({
  className,
  ...props
}: ComponentPropsWithRef<typeof Input>) {
  const id = useId();
  const [isVisible, setVisibility] = useState(false);

  const toggleVisibility = useCallback(
    () => setVisibility((prev) => !prev),
    [],
  );

  return (
    <div className="relative">
      <Input
        className={cn("peer px-9", className)}
        id={id}
        type={isVisible ? "text" : "password"}
        {...props}
      />
      <div className="pointer-events-none absolute inset-y-0 start-0 z-10 flex items-center justify-center ps-3 text-muted-foreground/80 peer-disabled:opacity-50">
        <KeyIcon
          aria-hidden="true"
          className="size-4"
        />
      </div>

      <Button
        aria-controls="password"
        aria-label={isVisible ? "Hide password" : "Show password"}
        className="absolute inset-y-0 end-0 flex h-full w-9 items-center justify-center rounded-e-md rounded-l-none border-0 text-muted-foreground/80 outline-none transition-[color,box-shadow] hover:bg-transparent! hover:text-foreground focus:z-10 focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50 disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50"
        onClick={toggleVisibility}
        type="button"
        variant="ghost"
      >
        {isVisible ? (
          <EyeIcon
            aria-hidden="true"
            className="size-4"
          />
        ) : (
          <EyeClosedIcon
            aria-hidden="true"
            className="size-4"
          />
        )}
      </Button>
    </div>
  );
}
