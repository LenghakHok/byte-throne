import type { authClient } from "./lib/auth-client";

declare global {
  namespace App {
    interface Locals {
      session: typeof authClient.$Infer.Session | null;
    }
  }
}
