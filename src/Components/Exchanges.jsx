import axios from "axios";
import { useEffect, useState } from "react";
import React from "react";
import { Server } from "../index";
import {
  Container,
  Heading,
  HStack,
  Image,
  VStack,
  Text,
} from "@chakra-ui/react";
import Loader from "./Loader";
import Errorcomponent from "./Errorcomponent";

const Exchanges = () => {
  const [exchanges, setExchanges] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchExchanges = async () => {
      try {
        const { data } = await axios.get(`${Server}/exchanges`);

        setExchanges(data);
        setLoading(false);
      } catch (error) {
        setLoading(false);
        setError(true);
      }
    };
    fetchExchanges();
  }, []);

  if (error) return <Errorcomponent message={"Error While Recieving Data"} />;

  return (
    <Container maxW={"container.xl"}>
      {loading ? (
        <Loader />
      ) : (
        <>
          <HStack wrap={"wrap"} justifyContent={'center'}>
            {exchanges.map((i) => (
              <ExchangeCard
                key={i.id}
                name={i.name}
                rank={i.trust_score_rank}
                img={i.image}
                url={i.url}
              />
            ))}
          </HStack>
        </>
      )}
    </Container>
  );
};

const ExchangeCard = ({ name, rank, img, url }) => {
  return (
    <a href={url} target="blank">
      <VStack
        w={"52"}
        shadow={"lg"}
        p={"8"}
        borderRadius={"lg"}
        m={"4"}
        transition={"all 0.3s"}
        css={{
          "&:hover": {
            transform: "scale(1.1)",
          },
        }}
      >
        <Image src={img} h={"10"} w={"10"} objectFit={"contain"} />
        <Heading size={"md"} noOfLines={"1"}>
          {rank}
        </Heading>
        <Text noOfLines={'1'} >{name}</Text>
      </VStack>
    </a>
  );
};

export default Exchanges;
