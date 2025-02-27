import { View, Text, Pressable } from 'react-native'
import React, { Children } from 'react'
import Icon from "react-native-vector-icons/Ionicons"
import { colors } from '../theme'
export default function PressableIcon({onPress,style,children,name="add",size=30,...props}) {
  return (
    <Pressable style={style} onPress={onPress}>
        {children?children:<Icon name={name} color={colors.secondary} size={size} />}
    </Pressable>
  )
}