import "reflect-metadata";
import "./di.container.ts";
import React from "react";
import ReactDOM from "react-dom/client";
import { QueryClient, QueryClientProvider } from "react-query";
import { RouterProvider } from "react-router-dom";

import { router } from "./AppRouter";
import "./index.scss";


const queryClient = new QueryClient();

// container.register("IProjectService", { useClass: ProjectService });


ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  </React.StrictMode>,
)
