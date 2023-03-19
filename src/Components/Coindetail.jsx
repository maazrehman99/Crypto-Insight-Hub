import { Box } from '@chakra-ui/react'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { Server } from '../index'
import Loader from './Loader'


const Coindetail = () => {
  const [Coin, setCoin] = useState({})
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)
  const [page, setPage] = useState(1)
  const [currency, setCurrency] = useState("pkr")
  const params= useParams()
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
  return (
  loading?<Loader/>:<>
  <Box>
    thsii
  </Box>
  
  </>
  )
}

export default Coindetail