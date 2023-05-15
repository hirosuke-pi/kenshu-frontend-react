import { ChakraProvider } from "@chakra-ui/react";
import MainSence from "./components/pages/MainSence";

export const App = () => {
  return (
    <ChakraProvider>
      <MainSence />
    </ChakraProvider>
  );
};
