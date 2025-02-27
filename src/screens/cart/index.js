import { View, Text } from 'react-native'
import React from 'react'
import Header from '../../common/header'
import CartComponent from './cartComponent'
import { useDispatch, useSelector } from 'react-redux'
import { addToCart, removeFromCart, updateOrderItemsConfirmed } from '../../store/cartSlice'
import { useNavigation } from '@react-navigation/native'

export default function Cart() {
  const cartItems=useSelector(store=>store.cartSlice.cartItems)
  const navigation=useNavigation()
  const dispatch=useDispatch()
  const onPressConfimItems=()=>{
    dispatch(updateOrderItemsConfirmed(true))
    navigation.navigate({name:"Cart Review"})
  }
  return (
    <CartComponent cartItems={cartItems} onPressConfimItems={onPressConfimItems} />
  )
}