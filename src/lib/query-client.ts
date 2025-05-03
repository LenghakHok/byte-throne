import { QueryClient } from "@tanstack/react-query";

export class Client {
  static instance: QueryClient | undefined = undefined;

  constructor() {
    if (import.meta.env.SSR) {
      new Client();
    }

    if (!Client.instance) {
      Client.instance = new QueryClient();
    }
  }
}

export const queryClient = new Client();
