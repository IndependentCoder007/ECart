import * as React from 'react';
import { Button } from 'react-native-paper';

const ButtonComponent = ({title="",onPress=()=>{},mode="contained",style,icon="cart"}) => (
  <Button icon={icon} style={style} mode={mode} onPress={onPress}>
    {title}
  </Button>
);

export default ButtonComponent;

