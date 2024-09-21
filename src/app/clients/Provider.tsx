"use client";
import { QueryClientProvider } from "@tanstack/react-query";
import React from "react";
import useQueryClientInstance from "./reactQueryClient";
import { trpc } from "./trpcClient";
import useTrpcClientInstance from "./trpcClient";

//create a context provider with both queryclient and trpc client
export default function Provider({ children }: { children: React.ReactNode }) {

  const queryClientInstance = useQueryClientInstance();
  const trpcClientInstance = useTrpcClientInstance();

  return (
    <trpc.Provider client={trpcClientInstance} queryClient={queryClientInstance}>
      <QueryClientProvider client={queryClientInstance}>
        {children}
      </QueryClientProvider>
    </trpc.Provider>
  );
}