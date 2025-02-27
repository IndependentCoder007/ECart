import { View, Text } from 'react-native'
import React from 'react'
import PressableIcon from './pressableIcon'
import DefaultText from './defaultText'
import { colors, fontSizes } from '../theme'
import { useDispatch } from 'react-redux'
import { addToCart, removeFromCart } from '../store/cartSlice'

export default function CartItemCounter({cartObject}) {
    const dispatch=useDispatch()
  const onPressAddToCart=()=>{
    dispatch(addToCart(cartObject))
  }
  const onPressRemoveFromCart=()=>{
    dispatch(removeFromCart(cartObject))
  }
  return (
    <View style={{flexDirection:"row",height:25,alignItems:"center",borderWidth:1,borderColor:colors.primary,borderRadius:12.5}}>
    <PressableIcon name="add" style={{marginHorizontal:10}} size={18}  onPress={onPressAddToCart}  />
    <DefaultText color={colors.text} fontSize={fontSizes.sm} fontWeight={"900"} text={cartObject?.quantity}/>
    <PressableIcon name="remove-outline" style={{marginHorizontal:10}} size={18} onPress={onPressRemoveFromCart}  />
    </View>
  )
}