import { Badge, Box, Container, HStack, Image, Progress, Radio, RadioGroup, Stat, StatArrow, StatHelpText, StatLabel, StatNumber, Text, VStack } from '@chakra-ui/react'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { Server } from '../index'
import Coins from './Coins'
import Errorcomponent from './Errorcomponent'
import Loader from './Loader'

const Coindetail = () => {
  const [Coin, setCoin] = useState({})
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)
  const [page, setPage] = useState(1)
  const [currency, setCurrency] = useState("pkr")
  const params = useParams()
  const currencySymbol = currency === "pkr" ? "PKR" : currency === "eur" ? "€" : "$"

  useEffect(() => {
    const fetchCoin = async () => {
      try {
        const { data } = await axios.get(`${Server}/coins/${params.id}`);
        setCoin(data)
        setLoading(false)
        console.log(data)
      } catch (error) {
        setLoading(false)
        setError(true)
      }
    }
    fetchCoin()
  }, [params.id])
  if (error) return <Errorcomponent message={"Error While Recieving Data"} />
  console.log(params.id)
  return (
    <Container maxW={'container.xl'} >
      {loading ? (<Loader />) : (<>
        <Box>
          this
        </Box>
        {/* button */}
        <RadioGroup value={currency} onChange={setCurrency} p={'8'} >
          <HStack spacing={'4'} >
            <Radio value="pkr" >PKR</Radio>
            <Radio value="usd" >USD</Radio>
            <Radio value="eur" >EUR</Radio>
          </HStack>
        </RadioGroup>
        <VStack spacing={4} p={'16'} alignItems={'flex-start'} >
          <Text alignSelf={"center"} fontSize={"small"} opacity={"0.7"} >
            Last Updated on {Date(Coin.market_data.last_updated).split("G")[0]}
          </Text>
          <Image h={'16'} w={'16'} objectFit={"contain"} src={Coin.image.large}>
          </Image>
          <Stat>
            <StatLabel>{Coin.name}</StatLabel>
            <StatNumber>{currencySymbol} {Coin.market_data.current_price[currency]}</StatNumber>
            <StatHelpText>
              <StatArrow type={Coin.market_data.price_change_percentage_24h > 0
                ? "increase"
                : "decrease"}>
              </StatArrow>
              {Coin.market_data.price_change_percentage_24h} %
            </StatHelpText>
            <Badge fontSize={'2xl'} bgColor={'blackAlpha.900'} color={'white'}>
              {` #${Coin.market_data.market_cap_rank}`}
            </Badge>
          </Stat>
          <CustomBar high={`${currencySymbol} ${Coin.market_data.high_24h[currency]} `}
            low={`${currencySymbol} ${Coin.market_data.low_24h[currency]} `} />

           <Box w={'full'} p={'4'} >
            <Item title={"Max Supply"} value={Coin.market_data.max_supply} />
            <Item title={"Circulatig Supply"} value={Coin.market_data.circulating_supply} />
            <Item title={"Market Capital"} value={Coin.market_data.market_cap[currency]} />
            <Item title={"All Time High"} value={`${currencySymbol} ${Coin.market_data.ath[currency]}`} />
            <Item title={"All Time Low"} value={`${currencySymbol} ${Coin.market_data.atl[currency]}`} />
           </Box>
        </VStack>

      </>
      )}

    </Container>
  )
}
const CustomBar = ({ high, low }) => (
  <VStack w={'full'} >
    <Progress value={50} colorScheme={'teal'} w={'full'} />
    <HStack justifyContent={"space-between"} w={'full'} >
      <Badge children={low} colorScheme={'red'} />
      <Text fontSize={'sm'} >24 Hours Range</Text>
      <Badge children={high} colorScheme={'green'} />
    </HStack>
  </VStack>
)

const Item=({title,value})=>(
<HStack justifyContent={'space-between'} w={"full"} my={"4"} >
  <Text fontSize={'sm'}  letterSpacing={'widest'} >{title}</Text>
  <Text fontSize={'sm'} >{value}</Text>
</HStack>
)


export default Coindetail