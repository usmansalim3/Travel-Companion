import { Pressable, StyleSheet, Text, TextInput, View } from 'react-native'
import React, { useState } from 'react'
import COLORS from '../constants/colors'
import { MaterialCommunityIcons} from '@expo/vector-icons'; 


const GenderInput = ({label,placeholder}) => {
    return (
    <View style={styles.container}>
        <Text style={{color:COLORS.grey,fontSize:12,marginVertical:0}}>{label}</Text>
        <View style={styles.Inputcontainer}>
            <View style={{margin:3}}>
            <MaterialCommunityIcons name="gender-male-female" size={22} color={COLORS.blue}/>
            </View>
            <TextInput style={styles.input}
            placeholder={placeholder}
            editable={false}
            />
        </View>
    </View>
  )
}

export default GenderInput

const styles = StyleSheet.create({
    container:{
        width:"100%",
        marginTop:10,
    },
    Inputcontainer:{
        backgroundColor:COLORS.light,
        height:40,
        flexDirection:'row',
        justifyContent:'center',
        alignItems:'center',
        borderColor:COLORS.darkBlue,
        borderWidth:1,
        padding:3
    },
    input:{flex:1,height:"100%",fontSize:14}

})