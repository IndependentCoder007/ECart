import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Home from '../screens/home';
import Cart from '../screens/cart';
import Icon from 'react-native-vector-icons/Entypo';
import {colors} from '../theme';
import {Text, View} from 'react-native';
import {Badge} from 'react-native-paper';
import {useSelector} from 'react-redux';

const Tab = createBottomTabNavigator();

function MainScreenTabs() {
  const cartItems = useSelector(store => store.cartSlice.cartItems);
  return (
    <Tab.Navigator
      screenOptions={{headerShown: false, tabBarStyle: {height: 60}}}
      initialRouteName="Home">
      <Tab.Screen
        name="Home"
        options={{
          tabBarIcon: ({focused}) => (
            <Icon
              name="home"
              color={focused ? colors.secondary : 'lightgrey'}
              size={20}
            />
          ),
          tabBarActiveTintColor: colors.secondary,
          tabBarInactiveTintColor: 'lightgrey',
        }}
        component={Home}
      />
      <Tab.Screen
        name="Cart"
        options={{
          tabBarIcon: ({focused}) => (
          <>
              {cartItems.length && (
                <Badge
                  style={{
                    color: 'white',
                    backgroundColor: colors.primary,
                    position: 'absolute',
                    top: -3,
                    zIndex: 1,
                    left: 16,
                    opacity: 0.9,
                  }}>
                  {+cartItems.length}
                </Badge>
              )}
              <Icon
                name="shopping-cart"
                color={focused ? colors.secondary : 'lightgrey'}
                size={20}
              />
          </>
          ),
          tabBarActiveTintColor: colors.secondary,
          tabBarInactiveTintColor: 'lightgrey',
        }}
        component={Cart}
      />
    </Tab.Navigator>
  );
}
export default MainScreenTabs;
