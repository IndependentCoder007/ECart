import { View, Text } from 'react-native'
import React from 'react'
import AvatarComponent from './avatar'

export default function CategoryIcon({uri,size,title}) {
  return (
    <View style={{flexDirection:"column",alignItems:"center",width:55}}>
    <AvatarComponent size={size} data={uri} />
    {title && <Text style={{fontSize:10,marginTop:3,letterSpacing:1}}>
        {title}
    </Text>}
    </View>
  )
}