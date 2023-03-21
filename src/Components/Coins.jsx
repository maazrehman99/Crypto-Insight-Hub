import axios from "axios";
import { useEffect, useState } from "react";
import React from "react";
import { Server } from "../index";
import { Container, HStack, Button, RadioGroup, Radio } from "@chakra-ui/react";
import Loader from "./Loader";
import Errorcomponent from "./Errorcomponent";
import CoinCard from "./CoinCard";

const Coins = () => {
  const [Coins, setCoins] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [page, setPage] = useState(1);
  const [currency, setCurrency] = useState("pkr");
  const currencySymbol =
    currency === "pkr" ? "PKR" : currency === "eur" ? "€" : "$";

  const btns = new Array(132).fill(1);

  const changePage = (page) => {
    setPage(page);
    setLoading(true);
  };
  useEffect(() => {
    const fetchCoins = async () => {
      try {
        const { data } = await axios.get(
          `${Server}/coins/markets?vs_currency=${currency}&page=${page}`
        );

        setCoins(data);
        setLoading(false);
        console.log(data);
      } catch (error) {
        setLoading(false);
        setError(true);
      }
    };
    fetchCoins();
  }, [currency, page]);

  if (error) return <Errorcomponent message={"Error While Recieving Data"} />;

  return (
    <Container maxW={"container.xl"}>
      {loading ? (
        <Loader />
      ) : (
        <>
          <RadioGroup value={currency} onChange={setCurrency} p={"8"}>
            <HStack spacing={"4"}>
              <Radio value="pkr">PKR</Radio>
              <Radio value="usd">USD</Radio>
              <Radio value="eur">EUR</Radio>
            </HStack>
          </RadioGroup>
          <HStack wrap={"wrap"} justifyContent={"space-evenly"}>
            {Coins.map((i) => (
              <CoinCard
                id={i.id}
                key={i.id}
                name={i.name}
                symbol={i.symbol}
                img={i.image}
                price={i.current_price}
                currencySymbol={currencySymbol}
              />
            ))}
          </HStack>

          <HStack width={"full"} overflowX={"auto"} p={"8"}>
            {btns.map((item, index) => (
              <Button
                key={index}
                color={"white"}
                bgColor={"blackAlpha.900"}
                onClick={() => changePage(index + 1)}
              >
                {" "}
                {index + 1}{" "}
              </Button>
            ))}
          </HStack>
        </>
      )}
    </Container>
  );
};

export default Coins;
