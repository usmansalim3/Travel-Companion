import { StyleSheet, Text, View,Pressable,Button, TextInput } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import ProfilePic from '../components/ProfilePic'
import DataField from '../components/DataField'
import {firebase} from '../auth/Firebase-config'
import { authContext } from '../authContext/AuthContextProvider';
import { useContext } from 'react'
import ProfilePicture from '../components/ProfilePicture'
import COLORS from '../constants/colors'
import { useNavigation } from '@react-navigation/native'
import { Entypo } from '@expo/vector-icons'; 
import RBSheet from "react-native-raw-bottom-sheet";
import { Drawer, Surface } from 'react-native-paper'
import { LinearGradient } from 'expo-linear-gradient'


const Weather = () => {
  const navigation=useNavigation();
  const[fields,setFields]=useState({});
  const {user}=useContext(authContext)
  const firestore=firebase.firestore().collection('UserCred')
  async function getFields(){
    try{
      await firestore.where('UserID','==',user.uid).get().then((query)=>{
        query.forEach((doc)=>{
          setFields(doc.data());
        })
      })
    }catch(e){
      console.log(e);
    }
  }
  useEffect(()=>{
    getFields();
  },[])
  useEffect(()=>{
    const sub=navigation.addListener('focus',()=>{
      getFields();
    })
    return sub;
  },[navigation])
  return (
    <LinearGradient style={{height:'100%',width:'100%'}} colors={['#D0D0E8','#030F18']}>
      <ProfilePicture uri={fields.ProfilePic}/>
      <Surface style={Platform.OS==='ios'?styles.IosSurface:styles.AndroidSurface}>
        <View style={{width:'90%',alignSelf:'center'}}>
          <DataField icon="person" label="Username" text={fields.Username} />
          <DataField icon="person-outline" label="Name" text={fields.Name}/>
          <DataField icon="call-outline" label="Phone" text={fields.Phone} />
          <DataField icon="male-female" label="Gender" text={fields.Gender} />
          <View style={{marginBottom:12}}>
            <DataField icon="calendar-outline" label="DOB" text={fields.Dob} />
          </View>
        </View>
      </Surface>
    </LinearGradient>
  )
}

export default Weather

const styles = StyleSheet.create({
  AndroidSurface:{width:'95%',alignSelf:'center',marginTop:'10%',padding:10,borderRadius:5,backgroundColor:COLORS.light,borderColor:COLORS.blue,borderWidth:0.4},
  
  IosSurface:{padding:10,paddingBottom:25,borderRadius:5,backgroundColor:COLORS.light,borderColor:COLORS.blue,borderWidth:0.4,width:'95%',marginTop:'10%',marginLeft:'2.5%'}
})