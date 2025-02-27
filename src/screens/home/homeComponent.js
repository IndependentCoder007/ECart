import {
  View,
  Text,
  StyleSheet,
  TouchableWithoutFeedback,
  Pressable,
  ScrollView,
  Dimensions,
  Image,
  FlatList,
  Platform,
} from 'react-native';
import React from 'react';
import Carousel from '../../common/carousel';
import {banner} from '../../../db/banners';
import Searchbar from '../../common/searchbar';
import CategoryIcon from '../../common/categoryIcon';
import Avatar from '../../common/avatar';
import {categories} from '../../../db/categories';
import AvatarComponent from '../../common/avatar';
import products from '../../../db/products';
import config from '../../config';
import {ActivityIndicator, Button} from 'react-native-paper';
import {colors, fontFamily} from '../../theme';
import {useNavigation} from '@react-navigation/native';
import {useDispatch} from 'react-redux';
import {setSelectedProduct} from '../../store/productSlice';

const {width, height} = Dimensions.get('window');
export default function HomeComponent({
  onChangeText,
  onTapSearch,
  productsLoading,
  products,
  productsError,
  ...props
}) {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  return (
    <View style={style.body}>
      <View
        style={{
          flexDirection: 'row',
          width: 0.9 * width,
          alignItems: 'center',
          alignSelf: 'center',
        }}>
        <AvatarComponent data={require("../../../assets/images/trolley.png")} style={{backgroundColor: "transparent"}} size={35} />
        <View style={{marginHorizontal: 10, marginVertical: 10, flex: 1}}>
         {Platform.OS === "ios" ?<Searchbar onPress={onTapSearch} editable={false} />: <Pressable onPress={onTapSearch}>
            <Searchbar onPress={onTapSearch} editable={false} />
          </Pressable>}
        </View>
      </View>
      <View
        style={{
          height: 200,
          marginVertical: 5,
          borderRadius: 15,
          borderWidth: 0,
          overflow: 'hidden',
        }}>
        <Carousel data={banner} widthValue={0.9*width} />
      </View>
      <View
        style={{
          width: 0.9 * width,
          height: 40,
          marginVertical: 20,
          alignSelf: 'center',
          justifyContent: 'center',
          backgroundColor: colors.card,
          borderRadius: 15,
        
        }}>
        <Text
          style={{
            fontWeight: '700',
            textAlign: 'center',
            fontSize: 14,
            letterSpacing: 1,
            color:colors.white,
            fontFamily:fontFamily['OpenSans-Medium']
          }}>
          Products
        </Text>
      </View>
      <View style={{flex:1,justifyContent:"center"}}>
      <View
        style={{height: 0.70 * width, width: 'auto', justifyContent: 'center'}}>
        {productsLoading && <ActivityIndicator size={40} />}
        {!productsLoading && (
          <FlatList
            scrollEventThrottle={14}
            showsHorizontalScrollIndicator={false}
            style={{width: 0.9 * width, height: 0.6 * width, paddingBottom: 0}}
            data={products}
            keyExtractor={(item,index)=>{return item.title+index}}
            horizontal
            renderItem={({item}) => {
              return (
                <Pressable
                  onPress={() => {
                    dispatch(setSelectedProduct(item));
                    navigation.navigate({
                      name: 'Product Details',
                    });
                  }}
                  style={{
                    width: 0.45 * width,
                    height: 0.65 * width,
                    marginHorizontal: 10,
                    overflow: 'hidden',
                    backgroundColor: 'white',
                    borderRadius: 10,
                    borderWidth:3,
                    borderColor:colors.card,
                    // shadowOffset:{width:10,height:100},
                    // shadowColor:colors.background,
                    // shadowRadius:100
                  }}>
                  <View style={{width: '100%', height: '60%'}}>
                    <Image
                      style={{flex: 1}}
                      source={{uri: item.category.image}}
                    />
                  </View>
                  <View style={{flex: 1, padding: 10}}>
                    <View
                      style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                      }}>
                      <Text style={{fontWeight:"700",fontFamily:fontFamily['OpenSans-Medium']}}>
                        {item.brand}
                      </Text>
                      <Text style={{textAlign: 'right',fontWeight:"700",fontFamily:fontFamily['OpenSans-Medium']}}>
                        {config.country.currency.symbol} {item.price}
                        {'\n'}
                        <Text style={{fontSize: 10}}>
                          excl. of tax
                        </Text>
                      </Text>
                    </View>
                    {item.offer && (
                      <View
                        style={{
                          maxWidth: '54%',
                          borderRadius: 10,
                          paddingVertical: 4,
                          paddingHorizontal: 10,
                          marginTop:5,
                          backgroundColor: colors.offers,
                          // flexWrap:'wrap'
                        }}>
                        <Text
                          style={{
                            fontSize: 10,
                            maxHeight:40,
                            color: 'white',
                          }} ellipsizeMode='tail'>
                         {item.offer}
                        </Text>
                      </View>
                    )}
                  </View>
                </Pressable>
              );
            }}
          />
        )}
      </View>
      </View>
    </View>
  );
}

const style = StyleSheet.create({
  body: {
    flex: 1,
    backgroundColor: 'white',
    paddingTop: 10,
    paddingHorizontal: 0.05 * width,
  },
});
