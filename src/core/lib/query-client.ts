import { QueryClient, type QueryClientConfig } from "@tanstack/react-query";

export class Client extends QueryClient {
  static _instance: QueryClient | undefined = undefined;

  static getInstance(config?: QueryClientConfig) {
    if (import.meta.env.SSR) {
      return new QueryClient(config);
    }

    if (!Client._instance) {
      Client._instance = new QueryClient(config);
    }

    return Client._instance;
  }
}

export const queryClient = Client.getInstance();
