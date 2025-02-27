import { View, Text, StyleSheet } from 'react-native'
import React, { useEffect } from 'react'
import Axios from '../../api'
import HomeComponent from './homeComponent'
import { useNavigation } from '@react-navigation/native'
import { useDispatch, useSelector } from 'react-redux'
import { fetchProducts } from '../../store/productSlice'

export default function Home() {
  const dispatch=useDispatch()
  const products = useSelector((store)=>store.productsSlice.products)
  useEffect(()=>{
    dispatch(fetchProducts())
  },[])
  const navigation=useNavigation()
  const onTapSearch=()=>{
    navigation.navigate({
      name:"Search"
    })
  }
  return (
    <HomeComponent
      onTapSearch={onTapSearch}
      productsLoading={products.isLoading}
      products={products.data}
      productsError={products.isError}
    />
  );

}

