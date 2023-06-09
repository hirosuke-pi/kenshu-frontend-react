import { ChakraProvider } from "@chakra-ui/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import MainSence from "./components/pages/MainSence";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      suspense: true,
    },
  },
});

export const App = () => {
  return (
    <ChakraProvider>
      <QueryClientProvider client={queryClient}>
        <MainSence />
      </QueryClientProvider>
    </ChakraProvider>
  );
};
