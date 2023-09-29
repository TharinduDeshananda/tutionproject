"use client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import React from "react";
import { ToastContainer } from "react-toastify";
import ToastContainerWrapper from "./ToastContainerWrapper";
const queryClient = new QueryClient({
  defaultOptions: { queries: { refetchOnWindowFocus: false } },
});

function QueryWrapper({ children }: { children: React.ReactNode }) {
  return (
    <QueryClientProvider client={queryClient}>
      <ToastContainerWrapper>
        <div className="w-screen relative min-h-screen">{children}</div>
      </ToastContainerWrapper>
    </QueryClientProvider>
  );
}

export default QueryWrapper;
