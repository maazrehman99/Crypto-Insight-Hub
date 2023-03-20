import { Container, Heading, HStack, Image, VStack, Text } from '@chakra-ui/react'
import React from "react"
import { Link } from 'react-router-dom'

const CoinCard = ({id, name, price, img, symbol, currencySymbol="PKR" }) => {
    return(
      <Link to={`/coin/${id}`} >
        <VStack w={'52'} shadow={'lg'} p={'8'} borderRadius={"lg"} m={'4'} transition={"all 0.3s"} 
        css={{
          '&:hover':{
               transform:"scale(1.1)",
          }
        }} >
          <Image src={img}
            h={'10'}
            w={'10'}
            objectFit={'contain'}
    
          />
          <Heading size={'md'} noOfLines={'1'} >{symbol}</Heading>
          <Text noOfLines={1} >{name}</Text>
          <Text noOfLines={1} >{price?`${currencySymbol} ${price}`: "NA"}</Text>
        </VStack>
      </Link>
    )
    }
    
    export default CoinCard