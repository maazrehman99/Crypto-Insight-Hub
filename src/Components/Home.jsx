import { Box, Image, Text } from "@chakra-ui/react";
import React from "react";
import btcSrc from "../assets/btc.png";

const Home = () => {
  return (
    <Box w={"full"} h={"85vh"} bgColor={"blackAlpha.900"}>
      <Image
        w={"full"}
        h={"full"}
        objectFit={"contain"}
        src={btcSrc}
        filter="grayscale(1)"
      />
      <Text
        fontSize={"6xl"}
        textAlign={"center"}
        fontWeight={"thin"}
        color={"whiteAlpha.700"}
        mt={"-20"}
      >
        Crpto-Craze
      </Text>
    </Box>
  );
};

export default Home;
