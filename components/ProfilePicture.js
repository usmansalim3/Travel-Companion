import { StyleSheet, Text, View,Image } from 'react-native'
import React from 'react'
import COLORS from '../constants/colors'

const ProfilePicture = ({uri}) => {
  return (
        <View style={{justifyContent:'center',alignItems:'center',margin:25}}>
            <Image
            style={{height:100,width:100,borderRadius:50,borderWidth:3,borderColor:COLORS.light}}
            source={{uri:uri}}
            />
        </View>
  )
}

export default ProfilePicture