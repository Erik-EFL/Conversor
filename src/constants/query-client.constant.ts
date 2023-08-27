import { QueryClientConfig as TQueryClientConfig } from 'react-query';

const QueryClientConfig: TQueryClientConfig = {
  defaultOptions: {
    queries: {
      keepPreviousData: true,
      staleTime: 5000,
    },
  },
};

export default QueryClientConfig;
