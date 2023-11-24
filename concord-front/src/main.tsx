import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css" ;
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import 'mdb-react-ui-kit/dist/css/mdb.min.css';
import "@fortawesome/fontawesome-free/css/all.min.css";
import  "./styles/all.css";
import router from "./routes/router";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";



const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 3, // 1 + 3
      staleTime: 10_000, // default zero
      refetchOnWindowFocus: false,
    },
  },
});
ReactDOM.createRoot(document.getElementById("app") as HTMLElement).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
      <ReactQueryDevtools />
    </QueryClientProvider>
  </React.StrictMode>
);
