import { Flex, Box } from "@chakra-ui/react";
import { Header, Footer, Navigation, CardList } from "../organisms";

const App = () => {
  return (
    <Flex
      flexDirection="column"
      justifyContent="center"
      width="100%"
      alignItems="center"
    >
      <Box width="80%">
        <Header />
        <Navigation />
        <CardList />
        <Footer />
      </Box>
    </Flex>
  );
};

export default App;
