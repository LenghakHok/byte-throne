import { cn } from "@/core/lib/cn";
import { Alert, AlertDescription } from "@/core/ui/alert";
import { AlertCircleIcon } from "lucide-react";
import type { ComponentPropsWithRef, ReactNode } from "react";

interface Props extends ComponentPropsWithRef<typeof Alert> {
  message: ReactNode;
}

export function FormAlert({ className, message, ...props }: Props) {
  return message ? (
    <Alert
      className={cn(
        "rounded-l-none border-0 border-l-2 border-l-current bg-current/5",
        className,
      )}
      variant="destructive"
      {...props}
    >
      <AlertCircleIcon />
      <AlertDescription>{message}</AlertDescription>
    </Alert>
  ) : null;
}
