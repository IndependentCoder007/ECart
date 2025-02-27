import { View, Text, Pressable, StyleSheet } from 'react-native'
import React from 'react'
import Icon from "react-native-vector-icons/Ionicons"
import { colors } from '../theme'
import { useNavigation } from '@react-navigation/native'
const radius=10
export default function BackButton({onPress}) {
  const navigation=useNavigation()
  const goBack=()=>{
    navigation.goBack()
  }
  return (
    <Pressable onPress={onPress?onPress:goBack}>
        <Icon name="arrow-back" color={colors.secondary} size={30} />
    </Pressable>
  )
}
