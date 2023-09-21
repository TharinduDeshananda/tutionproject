"use client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import React from "react";

const queryClient = new QueryClient();

function QueryWrapper({ children }: { children: React.ReactNode }) {
  return (
    <QueryClientProvider client={queryClient}>
      <div className="w-screen relative min-h-screen">{children}</div>
    </QueryClientProvider>
  );
}

export default QueryWrapper;
