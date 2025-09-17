declare module "@tanstack/react-query" {
  export class QueryClient {
    constructor(config?: any);
    defaultOptions: any;
    setQueryData: (...args: any[]) => void;
    getQueryData: (...args: any[]) => any;
    invalidateQueries: (...args: any[]) => Promise<void> | void;
  }
  export const QueryClientProvider: React.FC<{ client: QueryClient; children: React.ReactNode }>;
  export const useQuery: <TData = unknown, TError = unknown>(options: any) => {
    data: TData;
    error: TError;
    isFetching: boolean;
    isPending: boolean;
  };
  export const useMutation: <TData = unknown, TError = unknown, TVariables = void>(options: any) => {
    mutate: (...args: any[]) => void;
    mutateAsync: (...args: any[]) => Promise<TData>;
    isPending: boolean;
  };
  export const useQueryClient: () => QueryClient;
}
