import React, { useRef } from 'react';
import { FlatList, View, StyleSheet, Dimensions, TouchableOpacity, Image } from 'react-native';
import { width } from '../utility/common';
import { colors } from '../theme';



const Carousel = ({ data, autoScroll = true, interval = 3000,widthValue=width }) => {
  const flatListRef = useRef(null);
  let currentIndex = 0;
  const scrollToNext = () => {
    if (flatListRef.current) {
      currentIndex = (currentIndex + 1) % data.length;
      flatListRef.current.scrollToIndex({ animated: true, index: currentIndex });
    }
  };
  React.useEffect(() => {
    if (autoScroll) {
      const timer = setInterval(scrollToNext, interval);
      return () => clearInterval(timer);
    }
  }, [autoScroll, interval]);

  
  return (
    <FlatList
      ref={flatListRef}
      data={data}
      renderItem={({ item }) => (
        <View style={[styles.itemContainer,{width:widthValue}]}>
          <Image resizeMethod="resize" resizeMode='contain' source={item.path?item.path:item} style={styles.image} />
        </View>
      )}
      keyExtractor={(item, index) => item.id??item}
      horizontal
      pagingEnabled
      showsHorizontalScrollIndicator={false}
    />
  );
};

const styles = StyleSheet.create({
  itemContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor:colors.white,
    aspectRatio:16/9
  },
  image: {
    flex:1
  },
});

export default Carousel;
