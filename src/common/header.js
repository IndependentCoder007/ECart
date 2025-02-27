import { View, Text, Pressable } from 'react-native'
import React from 'react'
import { width } from '../utility/common'
import BackButton from './backButton'
import Icon from "react-native-vector-icons/Entypo"
import { colors, fontSizes } from '../theme'
import DefaultText from './defaultText'
import { useNavigation } from '@react-navigation/native'
import { Badge } from 'react-native-paper'
import { useSelector } from 'react-redux'
export default function Header({showBackButton=true,showRightIcon=true,rightIconComponent,title="",headerStyle={},customeBackFunction}) {
    const navigation=useNavigation()
    const cartItems=useSelector(store=>store.cartSlice.cartItems)
    const onPressBack=()=>{
        navigation.goBack()
    }
    const onPressCart=()=>{
        navigation.navigate({name:"Cart"})
    }
  return (
    <View style={{width:width,height:0.19*width,flexDirection:'row',backgroundColor:colors.white,alignItems:"center",justifyContent:'space-between',paddingHorizontal:0.05*width}}>
        <View style={{flexDirection:"row",alignItems:"center"}}>
        {showBackButton && <BackButton onPress={customeBackFunction??onPressBack} />}
        {title && <DefaultText fontSize={fontSizes.lg} text={title} style={headerStyle} />}
        </View>
        {showRightIcon ? (rightIconComponent ? rightIconComponent :
        <Pressable onPress={onPressCart}>
         {cartItems.length && <Badge style={{color:colors.white,backgroundColor:colors.primary,position:"absolute",top:-8,zIndex:1,left:14,opacity:0.9}}><Text>{cartItems.length}</Text></Badge>}
        <Icon name="shopping-cart"  color={colors.secondary} size={25}/>
        </Pressable>
      ) : null}
    </View>
  )
}