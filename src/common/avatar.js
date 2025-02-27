import { View, Text, Image } from 'react-native'
import React from 'react'
import { Avatar } from 'react-native-paper'

const AvatarComponent = ({data,size,style}) => {
    return <Avatar.Image size={size} source={data.uri?data.uri:({size})=><Image style={{width:size,height:size,marginBottom:10}} source={data} />} style={style}/>
}

export default AvatarComponent