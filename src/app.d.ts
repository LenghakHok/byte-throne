import type { authClient } from "./core/lib/auth-client";

declare global {
  namespace App {
    interface Locals {
      session: typeof authClient.$Infer.Session | null;
    }
  }
}
