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
  } from 'react-native';
  import React from 'react';
  import Carousel from '../../common/carousel';
  import {banner} from '../../../db/banners';
  import Searchbar from '../../common/searchbar';
  import config from '../../config';
  import {ActivityIndicator, Button} from 'react-native-paper';
  import {colors, fontFamily, fontSizes} from '../../theme';
  import {useNavigation} from '@react-navigation/native';
  import {useDispatch} from 'react-redux';
  import {setSelectedProduct} from '../../store/productSlice';
import BackButton from '../../common/backButton';
  
  const {width, height} = Dimensions.get('window');
  export default function SearchComponent({
    onChangeText=()=>{},
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
          <BackButton />
          <View style={{marginHorizontal: 10, marginVertical: 10, flex: 1}}>
              <Searchbar onChangeText={onChangeText}  />
          </View>
        </View>
        <View style={{flex:1,justifyContent:"center"}}>
        <View
          style={{flex:1, justifyContent: 'center'}}>
          {productsLoading && <ActivityIndicator size={40} />}
          {!productsLoading && (
            <FlatList
              scrollEventThrottle={14}
              showsHorizontalScrollIndicator={false}
              showsVerticalScrollIndicator={false}
              style={{width: 0.9 * width, height: 0.6 * width, paddingBottom: 0}}
              contentContainerStyle={{gap:10,paddingHorizontal:0.05*width,paddingVertical:20}}
              data={products}
              keyExtractor={(item,index)=>{return item.title+index}}
              numColumns={2}
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
                      width: 0.35 * width,
                      height: 0.45 * width,
                      marginHorizontal: 10,
                      overflow: 'hidden',
                      backgroundColor: 'white',
                      borderRadius: 10,
                      borderWidth:2,
                      borderColor:colors.secondary,
                      shadowOffset:{width:300,height:200},
                      shadowColor:colors.primary,
                      shadowRadius:100,
                    }}>
                    <View style={{width: '100%', height: '60%'}}>
                      <Image
                        style={{flex: 1}}
                        source={{uri: item.category.image}}
                      />
                    </View>
                    <View style={{flex: 1, padding: 5}}>
                      <View
                        style={{
                          flexDirection: 'column',
                          justifyContent: 'space-between',
                        }}>
                        <Text style={{fontWeight:"400",fontSize:fontSizes.xs}}>
                          {item.title}
                        </Text>
                        <Text style={{fontWeight:"700",fontSize:fontSizes.xs}}>
                          {item.brand}
                        </Text>
                      </View>
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
  