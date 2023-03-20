import { Box, HStack, Image, Radio, RadioGroup, Stat, StatLabel, Text, VStack } from '@chakra-ui/react'
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
    loading ? <Loader /> : <>
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
          
        </Stat>
      </VStack>

    </>
  )
}
export default Coindetail