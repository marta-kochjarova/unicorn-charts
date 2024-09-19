import { initTRPC } from "@trpc/server";

//create a trpc server, initialize router and public procedure
const trpcServer = initTRPC.create();
export const router = trpcServer.router;
export const procedure = trpcServer.procedure;

//create appRouter with all endpoints
export const appRouter = router({
     test: procedure.query(async () => {
       return 'returned data'
     })
   });
 
//create trpc API type
export type AppRouter = typeof appRouter;