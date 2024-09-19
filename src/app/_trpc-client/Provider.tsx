"use client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { httpBatchLink } from "@trpc/client";
import React, { useState } from "react";
import { createTRPCReact } from "@trpc/react-query";
import { type AppRouter } from "@/server";

const trpc = createTRPCReact<AppRouter>();

//create a context provider with both queryclient and trpc client
export default function Provider({ children }: { children: React.ReactNode }) {
  //client for communicationg with the covid api
  const [queryClientInstance] = useState(() => new QueryClient({})); //using a function to create a queryClient on comp. mount, not on every rerender
  
  //client for communicating with my own backend
  const [trpcClientInstance] = useState(() =>
     trpc.createClient({
      links: [
        httpBatchLink({
          url: "http://localhost:3000/api/trpc", //where the server lives
        }),
      ],
    })
  );

  return (
    <trpc.Provider client={trpcClientInstance} queryClient={queryClientInstance}>
      <QueryClientProvider client={queryClientInstance}>
        {children}
      </QueryClientProvider>
    </trpc.Provider>
  );
}