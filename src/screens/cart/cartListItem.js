import {View, Text} from 'react-native';
import React from 'react';
import DefaultText from '../../common/defaultText';
import CartItemCounter from '../../common/cartItemCounter';
import {width} from '../../utility/common';
import {colors, fontSizes} from '../../theme';
import config from '../../config';

export default function CartListItem({item, index, areItemsConfirmed = true}) {
  return (
    <View
      style={{
        width: '100%',
        height: 'auto',
        justifyContent: 'space-between',
        flexDirection: 'row',
        marginVertical: 15,
      }}>
      <View style={{maxWidth: 0.68 * width}}>
        <DefaultText
          text={`${item.title}${
            areItemsConfirmed ? ' x ' + item.quantity : ''
          }`}
        />
      </View>
      {areItemsConfirmed ? (
        <DefaultText
          color={colors.text}
          fontSize={fontSizes.sm}
          text={`${config.country.currency.symbol} ${
            item?.quantity * item?.price
          }`}
        />
      ) : (
        <CartItemCounter cartObject={item} itemIndex={index} />
      )}
    </View>
  );
}
