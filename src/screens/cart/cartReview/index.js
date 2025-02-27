import { View, Text } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native'
import { useDispatch, useSelector } from 'react-redux'
import CartReviewComponent from './cartReviewComponent'
import { makePayment } from '../../../store/cartSlice'
import Dialog from '../../../common/dialog'

export default function CartReview() {
  const {cartItems, totalPrice, totalWithoutTax, selectedPaymentMethod} =
    useSelector(store => store.cartSlice);
  const dispatch = useDispatch();
  const onPressPayment = () => {
    dispatch(makePayment());
  };
  return (
    <>
      <CartReviewComponent
        onPlaceORderPress={onPressPayment}
        cartItems={cartItems}
        totalWithTax={totalPrice}
        totalwithoutTax={totalWithoutTax}
        selectedPaymentMethod={selectedPaymentMethod}
      />
    </>
  );
}