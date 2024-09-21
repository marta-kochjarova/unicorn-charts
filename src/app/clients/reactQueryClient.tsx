import { QueryClient } from "@tanstack/react-query";
import { useState } from "react";

//client for communicationg with the covid api
const useQueryClientInstance = () => {
     const [queryClientInstance] = useState(() => new QueryClient({}));
     return queryClientInstance;
   };
   
export default useQueryClientInstance;