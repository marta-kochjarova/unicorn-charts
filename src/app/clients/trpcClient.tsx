import { AppRouter } from "@/server";
import { createTRPCReact, httpBatchLink } from "@trpc/react-query";
import { useState } from "react";

export const trpc = createTRPCReact<AppRouter>();

const useTrpcClientInstance = () => {
  const [trpcClientInstance] = useState(() =>
    trpc.createClient({
      links: [
        httpBatchLink({
          // url: "http://localhost:3000/api/trpc",
          url: "https://unicorn-charts.vercel.app/api/trpc",
        }),
      ],
    })
  );

  return trpcClientInstance;
};

export default useTrpcClientInstance;
