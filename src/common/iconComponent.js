import React from 'react'
import { Icon, IconButton, MD3Colors } from 'react-native-paper';

const IconButtonComponent = ({onPress,size,color,source}) => (
    <IconButton
    source={source}
      color={color}
      size={size}
      onPress={onPress}
    mode='contained'
    />
  );
  
export default IconButtonComponent;