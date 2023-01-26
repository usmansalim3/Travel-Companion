import { StyleSheet, Text, View,Image } from 'react-native'
import React from 'react'
import COLORS from '../constants/colors'

const ProfilePic = ({uri}) => {
  return (
        <View style={{justifyContent:'center',alignItems:'center',margin:25}}>
            <Image
            style={{height:100,width:100,borderRadius:50,borderWidth:3,borderColor:COLORS.blue}}
            source={{uri:uri?'data:image/jpeg;base64,'+uri:'https://reactnative.dev/img/tiny_logo.png'}}
            />
        </View>
  )
}

export default ProfilePic

const styles = StyleSheet.create({})