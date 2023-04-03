import { QueryClient } from '@tanstack/react-query';

export function generateQueryClient(): QueryClient {
  return new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 300000,
        cacheTime: 900000,
        refetchOnMount: false,
        refetchOnWindowFocus: false,
      },
    },
  });
}

export const queryClient = generateQueryClient();
