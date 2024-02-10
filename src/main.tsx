import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './App.scss';
import { ContextProvider } from './context/Context';
import { QueryClientProvider } from '@tanstack/react-query';
import { queryClient } from './reactQuery/queryClient';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <ContextProvider>
        <App />
        <ReactQueryDevtools initialIsOpen={false} />
      </ContextProvider>
    </QueryClientProvider>
  </React.StrictMode>
);
