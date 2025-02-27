import {View, Text, ScrollView} from 'react-native';
import React, {useCallback, useEffect, useMemo, useState} from 'react';
import Header from '../../../common/header';
import {colors, fontSizes} from '../../../theme';
import {width} from '../../../utility/common';
import DefaultText from '../../../common/defaultText';
import CartListItem from '../cartListItem';
import ButtonComponent from '../../../common/button';
import config from '../../../config';
import {
  ActivityIndicator,
  Modal,
  Portal,
  RadioButton,
} from 'react-native-paper';
import Icon from 'react-native-vector-icons/Ionicons';
import {useDispatch, useSelector} from 'react-redux';
import {resetCart} from '../../../store/cartSlice';
import {useNavigation} from '@react-navigation/native';
import Dialog from '../../../common/dialog';
export default function CartReviewComponent({
  cartItems = [],
  totalwithoutTax = '98',
  totalWithTax = 0,
  selectedPaymentMethod,
  customeBackFunction,
  onPlaceORderPress,
}) {
  return (
    <View style={{flex: 1}}>
      <Header
        showRightIcon={false}
        headerStyle={{marginLeft: 10, color: colors.text}}
      />
      <ScrollView
        style={{
          flex: 1,
          paddingHorizontal: 0.05 * width,
          backgroundColor: 'white',
        }}>
        <View
          style={{
            width: '100%',
            minHeight: 150,
            backgroundColor: colors.border,
            borderRadius: 20,
            paddingHorizontal: 20,
            paddingVertical: 10,
            marginBottom: 20,
          }}>
          <DefaultText
            text={'Select Payment Option'}
            fontSize={fontSizes.md}
            fontWeight={700}
            color={colors.background}
          />
          <RadioButton.Group
            onValueChange={() => {}}
            value={selectedPaymentMethod}>
            {config.country.paymentMethodsAccepted.map(value => {
              return (
                <View
                  key={value}
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    paddingHorizontal: 20,
                    marginVertical: 20,
                  }}>
                  <DefaultText
                    text={value}
                    fontWeight={900}
                    style={{letterSpacing: 1}}
                    color={colors.background}
                  />
                  <RadioButton color={colors.background} value={value} />
                </View>
              );
            })}
          </RadioButton.Group>
        </View>
        <DefaultText
          text={`Order Summary (${cartItems.length})`}
          fontSize={fontSizes.md}
          color={colors.primary}
          style={{marginVertical: 10}}
        />
        {cartItems.map((item, index) => {
          return (
            <CartListItem
              key={item?.title}
              index={index}
              areItemsConfirmed={true}
              item={item}
              onPressAddToCart={() => onPressAddToCart(item, index)}
              onPressRemoveFromCart={() => onPressRemoveFromCart(item, index)}
            />
          );
        })}
        <View style={{width: 0.9 * width, borderWidth: 0.5}} />
        <View>
          <TitleAndAmountComponent
            title={'Total - without tax'}
            amount={config.country.currency.symbol + ' ' + totalwithoutTax}
          />
          <TitleAndAmountComponent
            title={'Tax rate (%)'}
            amount={config.country.taxRate}
          />
        </View>
        <View style={{width: 0.9 * width, borderWidth: 0.5}} />
        <TitleAndAmountComponent
          title={'Total Amount'}
          amount={
            config.country.currency.symbol + ' ' + Math.round(totalWithTax)
          }
        />
      </ScrollView>
      <View style={{paddingHorizontal: 0.05 * width,backgroundColor:colors.white}}>
        <ButtonComponent
          icon={''}
          style={{backgroundColor: colors.secondary, marginBottom: 10}}
          title="Place Order"
          onPress={onPlaceORderPress}
        />
      </View>
      <PaymentModal />
    </View>
  );
}

const TitleAndAmountComponent = ({title, amount}) => (
  <View
    style={{
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginVertical: 5,
    }}>
    <DefaultText text={title} />
    <DefaultText text={amount} />
  </View>
);

const PaymentModal = () => {
  const {paymentInProcess, status, isError} = useSelector(
    store => store.cartSlice.payment,
  );
  const dispatch = useDispatch();
  const [seconds, setSeconds] = useState(5);
  const naviagtion = useNavigation();
  useEffect(() => {
    if (status === 'success') {
      if (seconds === 0) {
        dispatch(resetCart());
        naviagtion.popTo('Main',{
          screen:"Home"
        });
        return;
      } 
      const timer = setInterval(() => {
        setSeconds(prev => prev - 1);
      }, 1000);

      return () => clearInterval(timer);
    }
  }, [status, seconds]);

  const statusData = useMemo(()=>getStatusData(status),[status])


  return (
    <Portal>
      <Modal
        visible={paymentInProcess}
        onDismiss={() => {}}
        contentContainerStyle={{
          backgroundColor: 'white',
          borderRadius: 20,
          width: 0.7 * width,
          height: 0.9 * width,
          alignSelf: 'center',
          alignContent: 'center',
        }}>
        {
          <>
            {status == 'pending' ? (
              <ActivityIndicator animating color={colors.border} size={60} />
            ) : (
              <Icon
                name={statusData.icon}
                style={{color: statusData.color,alignSelf: 'center'}}
                size={70}
              />
            )}
            <DefaultText
              style={{textAlign: 'center', marginTop: 25, color:statusData.color}}
              fontWeight={600}
              fontSize={fontSizes.md}
              text={
                statusData.message
              }
            />
            {status == 'success' && (
              <DefaultText
                style={{textAlign: 'center', marginTop: 25}}
                fontWeight={600}
                fontSize={fontSizes.sm}
                text={`going back to main screen in \n ${seconds}`}
              />
            )}
          </>
        }
      </Modal>
    </Portal>
  );
};

const getStatusData=(status)=>{
  switch(status){
    case "pending": return {
      message:'Payment Processing',
      icon:"",
      color:colors.text
    }

    case "success": return {
      message:'Payment Confirm \n Order Successful',
      icon:"checkmark-circle",
      color:colors.success
    }

    case "failed": return {
      message:"Payment Failed",
      icon:"close-circle-outline",
      color:colors.error
    }

    default : return {
      message:'Payment Processing',
      icon:"",
      color:colors.text
    }
  }
}