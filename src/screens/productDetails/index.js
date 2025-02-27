import { View, Text } from 'react-native'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import ProductDetailsComponent from './productDetailsComponent'
import { addToCart } from '../../store/cartSlice'

export default function ProductDetails() {
  const selectedProduct=useSelector(store=>store.productsSlice.selectedProduct)
  const cartObject=useSelector(store=>store.cartSlice.cartItems.find(item=>item.id==selectedProduct.id))
  const dispatch=useDispatch()
  let onPressAddToCart=()=>{
    dispatch(addToCart(selectedProduct))
  }

  return (
    <ProductDetailsComponent product={selectedProduct} cartObject={cartObject} onPressAddToCart={onPressAddToCart} />
  )
}