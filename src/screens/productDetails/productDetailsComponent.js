import { View, Text, Pressable } from 'react-native'
import React from 'react'
import { width } from '../../utility/common'
import DefaultText from '../../common/defaultText'
import { colors, fontFamily, fontSizes } from '../../theme'
import ButtonComponent from '../../common/button'
import Carousel from '../../common/carousel'
import config from '../../config'
import Header from '../../common/header'
import IconButtonComponent from '../../common/iconComponent'
import PressableIcon from '../../common/pressableIcon'
import CartItemCounter from '../../common/cartItemCounter'

export default function ProductDetailsComponent({product={},onPressAddToCart,cartObject}) {
  return (
    <View style={{flex: 1, backgroundColor: 'white'}}>
      <Header />
      <View style={{width: width, height: (9 / 16) * width}}>
        <Carousel data={product?.images ?? []} autoScroll={false} />
      </View>
      <View
        style={{
          padding: 20,
          marginTop: 20,
          backgroundColor: colors.background,
          width: 0.9 * width,
          alignSelf: 'center',
          height: 'auto',
        }}>
            
        <View
          style={{
            marginBottom: 10,
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignContent: 'center',
          }}>
          <View style={{marginBottom: 15}}>
            <DefaultText
              fontSize={fontSizes.sm}
              color={colors.text}
              text={product?.title}
            />
            <DefaultText
              fontWeight={'700'}
              style={{verticalAlign: 'center'}}
              fontSize={fontSizes.sm}
              text={product?.brand}
            />
          </View>
          <Text style={{textAlign: 'right'}}>
            {config.country.currency.symbol} {product.price}
            {'\n'}
            <Text style={{fontSize: 10}}>
              (excl. of tax)
            </Text>
          </Text>
        </View>
        <View
        style={{
          alignSelf: 'flex-end',
          marginBottom:10
        }}>
        {cartObject ? (
          <CartItemCounter cartObject={cartObject} />
        ) : (
          <ButtonComponent
            title="Add to cart"
            style={{backgroundColor: colors.secondary, color: colors.secondary}}
            onPress={onPressAddToCart}
          />
        )}
      </View>
        <View style={{marginBottom: 15}} a>
          <DefaultText
            style={{marginBottom: 10}}
            color={colors.primary}
            fontSize={fontSizes.md}
            text={'Description'}
          />
          <DefaultText fontSize={fontSizes.sm} text={product?.description} />
        </View>
      </View>
    </View>
  );
}