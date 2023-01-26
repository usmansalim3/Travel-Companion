import { KeyboardAvoidingView, Platform, Pressable, StyleSheet, Text, TouchableOpacity, View} from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import COLORS from '../constants/colors'
import { Button, Divider, List, Surface, TouchableRipple } from 'react-native-paper'
import GenderInput from '../components/GenderInput'
import Input from '../components/Input'
import * as Yup from "yup"
import "yup-phone";
import { useFormik } from 'formik'
import {firebase} from '../auth/Firebase-config'
import { authContext } from '../authContext/AuthContextProvider'
import { useNavigation } from '@react-navigation/native'
import { LinearGradient } from 'expo-linear-gradient'
import RBSheet from 'react-native-raw-bottom-sheet'
import { useRef } from 'react'
import { FontAwesome5 } from '@expo/vector-icons'

const UpdateInfo = () => {
  const {user}=useContext(authContext);
  const firestore=firebase.firestore().collection('UserCred')
  const[info,setInfo]=useState({})
  const[docRef,setDocRef]=useState('');
  async function getInfo(){
    await firestore.where('UserID','==',user.uid).get().then((query)=>{
      query.forEach((q)=>{
        setInfo(q.data());
        setDocRef(q.id)
      })
    })
  }
  useEffect(()=>{
    getInfo();
  },[])
  const[gender,setGender]=useState(info.Gender);
  const formik=useFormik({
    enableReinitialize:true,
    initialValues:{
      Username:info.Username,
      Name:info.Name,
      Phone:info.Phone,
      Gender:info.Gender,
    },
    validationSchema:Yup.object().shape({
      Username:Yup.string().min(3,"Too short").max(15,"Too long").required("Field is required!"),
      Name:Yup.string().min(3,"Too short").max(15,"Too long").required("Field is required!"),
      Phone:Yup.string().phone('IN', true, 'invalid').required()
    }),
    onSubmit: () => {
      SubmitHandler();
    }
  })
  async function SubmitHandler(){
    await firestore.doc(docRef).update({
      Username:formik.values.Username,
      Name:formik.values.Name,
      Gender:gender?gender:info.Gender,
      Phone:formik.values.Phone
    })
  }
  const navigation=useNavigation();
  const RBref=useRef();
  return (
    <LinearGradient style={{height:'100%',width:'100%',flex:1}} colors={['#D0D0E8','#002171']}>
      <KeyboardAvoidingView behavior='position' style={Platform.OS==='ios'?{height:'85%'}:{height:'91%'}}>
      <Surface style={Platform.OS==='ios'?styles.IosSurface:styles.AndroidSurface}>
        <View>
            <Text style={styles.loginHeader}>Update <Text style={{color:COLORS.blue}}>Here</Text></Text>
            <Text style={styles.loginSubHeading}>Fill in down below</Text>
        </View>
        <Input label="Username" iconName="person" placeholder={"Enter your Username"} value={formik.values.Username} formik={formik} error={formik.errors} touched={formik.handleBlur} handleChange={formik.handleChange}/>
        <Input label="Name" iconName="person" placeholder={"Enter your Name"} value={formik.values.Name} formik={formik} error={formik.errors} touched={formik.handleBlur} handleChange={formik.handleChange}/>
        <Input label="Phone" iconName="call" type='numeric' placeholder={"Enter your Phone"} value={formik.values.Phone} formik={formik} error={formik.errors} touched={formik.handleBlur} handleChange={formik.handleChange}/>
        <Pressable onPress={()=>RBref.current.open()}>
            <GenderInput label="Gender" placeholder={gender?gender:formik.values.Gender} />
        </Pressable>
        <RBSheet ref={RBref} closeOnDragDown={true} height={150} customStyles={{
            container:{
              backgroundColor:COLORS.light,
              borderTopRightRadius:10,
              borderTopLeftRadius:10
            }
          }}>
            <View>
              <TouchableRipple onPress={()=>{
                setGender('Male');
                RBref.current.close();
                }}>
                <List.Item title="Male" style={{width:'100%',marginBottom:3}} left={()=>
                  <FontAwesome5 name="male" size={24} color={COLORS.blue} style={{margin:5}} />
                }/>
              </TouchableRipple>
              <Divider/>
              <TouchableRipple onPress={()=>{
                setGender('Female');
                RBref.current.close();
                }}>
                <List.Item title="Female" style={{width:'100%'}} left={()=>
                <FontAwesome5 name="female" size={24} color={COLORS.blue} style={{margin:5}} />
                }/>
              </TouchableRipple>
            </View>
        </RBSheet>
        <View style={{marginTop:10,width:'90%',alignSelf:'center'}}>
          <Button onPress={()=>{
            formik.handleSubmit();
            navigation.goBack();
            }} mode='text' >
            <Text>Submit</Text>
          </Button>
        </View>
      </Surface>
      </KeyboardAvoidingView>
    </LinearGradient>
  )
}

export default UpdateInfo

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      paddingTop:100,
      paddingHorizontal:20,
    },
    loginHeader:{
      fontSize:40,
      fontWeight:'bold'
    },
    loginSubHeading:{
      fontSize:16,
      color:COLORS.grey,
      marginLeft:1
    },
    AndroidSurface:{width:'95%',alignSelf:'center',marginTop:'30%',padding:10,borderRadius:5,backgroundColor:COLORS.light,borderColor:COLORS.blue,borderWidth:0.4},
  
    IosSurface:{padding:10,borderRadius:5,backgroundColor:COLORS.light,borderColor:COLORS.blue,borderWidth:0.4,width:'95%',marginTop:'40%',marginLeft:'2.5%'}
  })