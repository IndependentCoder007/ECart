import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import { fontFamily, fontSizes } from '../theme'

export default function DefaultText({text,fontSize,fontWeight,color,...props}) {
  return (
      <Text style={[style.text,{fontSize,fontWeight,color,...props.style}]} >{text}</Text>
  )
}

const style=StyleSheet.create({
    text:{
        fontSize:fontSizes.sm,
        fontFamily:fontFamily['OpenSans-Medium']
    }
})