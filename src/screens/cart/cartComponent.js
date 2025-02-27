import { View, Text, ScrollView } from 'react-native'
import React from 'react'
import Header from '../../common/header'
import { colors, fontSizes } from '../../theme'
import { width } from '../../utility/common'
import { Item } from 'react-native-paper/lib/typescript/components/Drawer/Drawer'
import DefaultText from '../../common/defaultText'
import CartListItem from './cartListItem'
import ButtonComponent from '../../common/button'
import Icon from "react-native-vector-icons/Entypo"

export default function CartComponent({cartItems=[],onPressAddToCart,onPressRemoveFromCart,onPressConfimItems}) {
  return (
    <View style={{flex:1}}>
        <Header title='Cart' showRightIcon={false} headerStyle={{marginLeft:10,color:colors.text}}/>
            {cartItems.length>0?<>
        <ScrollView style={{flex:1,backgroundColor:colors.white,paddingHorizontal:0.05*width}}>
            <DefaultText text={`Items (${cartItems.length})`} fontSize={fontSizes.md} color={colors.primary} style={{marginBottom:10}} />
            {cartItems.map((item,index)=>{
                return <CartListItem key={item?.title} index={index} item={item} areItemsConfirmed={false} onPressAddToCart={()=>onPressAddToCart(item,index)}  onPressRemoveFromCart={()=>onPressRemoveFromCart(item,index)} />
            })}     
        </ScrollView>     
        <View style={{paddingHorizontal:0.05*width,backgroundColor:colors.white}}>
        <ButtonComponent style={{backgroundColor:colors.secondary,marginBottom:10}} title='Confirm Items' onPress={onPressConfimItems} />
        </View>
        </>:<View style={{flex:1,backgroundColor:colors.white,justifyContent:"center",alignItems:"center"}}>
        <Icon name="shopping-cart"  color={colors.diabled} size={84}/>
            <DefaultText fontSize={fontSizes.xl} color={colors.diabled} text={"Cart is Empty"} />
        </View>}
    </View>
  )
}