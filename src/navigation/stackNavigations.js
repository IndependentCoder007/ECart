import { createNativeStackNavigator } from '@react-navigation/native-stack';
import MainScreenTabs  from './tabNavigation';
import ProductDetails from '../screens/productDetails';
import Cart from '../screens/cart';
import CartReview from '../screens/cart/cartReview';
import Confirmation from '../screens/confirmation';
import Search from '../screens/search';
import { width } from '../utility/common';
import { View } from 'react-native';

const Stack = createNativeStackNavigator();

export default function MainStack() {
  return (
    <Stack.Navigator screenOptions={{headerShown:false}}>
      <Stack.Screen name="Main" component={MainScreenTabs} />
      <Stack.Screen name="Search" component={Search} />
      <Stack.Screen name="Product Details" component={ProductDetails} />
      <Stack.Screen name="Cart Review" component={CartReview} />
      <Stack.Screen name="Cart" component={Cart} />
      <Stack.Screen name="Confirmation" component={Confirmation} />
    </Stack.Navigator>
  );
}
