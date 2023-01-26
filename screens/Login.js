import { StyleSheet, Text, View,Pressable, KeyboardAvoidingView, Keyboard, Platform} from 'react-native'
import React, { useContext,useEffect,useState } from 'react'
import COLORS from '../constants/colors'
import Input from '../components/Input'
import { Field, useFormik } from 'formik'
import * as Yup from "yup"
import { authContext } from '../authContext/AuthContextProvider'
import { useNavigation } from '@react-navigation/native'
import { ActivityIndicator, Surface } from 'react-native-paper'
import { LinearGradient } from 'expo-linear-gradient'

const LoginCard = () => {
  const context=useContext(authContext);
  return(
    <View style={{alignSelf:'center',borderWidth:1,borderColor:COLORS.blue,padding:5}}>
      <Text style={{color:COLORS.darkBlue,fontWeight:'bold'}}>
        {context.user?.email}
      </Text>
    </View> 
  );
}
const Login = () => {
  function ErrorCard(){
    return(
    <View>
      <Text>
        {context.signError}
      </Text>
    </View>
    )
  }
  const navigation=useNavigation();
  const context=useContext(authContext);
  const[touched,setTouched]=useState(false);
  const formik=useFormik({
    initialValues:{
      Email:"",
      Password:""
    },
    enableReinitialize:true,
    validationSchema:Yup.object().shape({
      Email:Yup.string().required("Field is required!"),
      Password:Yup.string().required("Field is required!")
    }),
    onSubmit:(values)=>{
      setTouched(true);
      context.setSignError('');
      context.signIn(values.Email,values.Password);
      Keyboard.dismiss();
    }
  });
  navigation.addListener('focus',()=>{
    context.setReg(false);
  })
  useEffect(()=>{
    if(context.user && !context.reg){
      setTouched(false);
      navigation.navigate('Home');
    }
  },[context.user])
  return (
        <LinearGradient style={{height:'100%',width:'100%'}} colors={['#B9B9DC','#320b86']}>
          <KeyboardAvoidingView behavior='position' style={{height:'90%'}}>
            <Surface style={Platform.OS==='ios'?styles.IosSurface:styles.AndroidSurface}>
              <View>
                <Text allowFontScaling={false} style={styles.loginHeader}>Login <Text style={{color:COLORS.blue}}>Here</Text></Text>
                <Text allowFontScaling={false} style={styles.loginSubHeading}>Sign in down below</Text>
              </View>
              <View>
              <Input label="Email" iconName="email" placeholder={"Enter your Email"} value={formik.values.email} formik={formik} error={formik.errors} touched={formik.handleBlur} handleChange={formik.handleChange}/>
              <Input label="Password" iconName="vpn-key" hide={true} placeholder={"Enter your password"} error={formik.errors}formik={formik}  touched={formik.handleBlur} value={formik.values.password} handleChange={formik.handleChange}/>
              </View>
              <View style={{width:'90%',alignSelf:'center',marginTop:20,marginBottom:15,borderRadius:4,backgroundColor:COLORS.blue,overflow:"hidden"}}>
                <Pressable onPress={formik.handleSubmit} android_ripple={{color:"#4527a0"}} style={{justifyContent:'center',alignItems:'center',height:40}}>
                {touched&&(!context.signError)?<ActivityIndicator animating={true} color={COLORS.white}/>:<Text style={{color:COLORS.light}}>
                  Login
                </Text>}
                </Pressable>
              </View>
              {context.signError?<ErrorCard/>:null}
              
            </Surface>
          </KeyboardAvoidingView>
        </LinearGradient>
      
  )
}

export default Login

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    //paddingTop:100,
    //paddingHorizontal:20,
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
  AndroidSurface:{width:'95%',alignSelf:'center',marginTop:'40%',padding:10,borderRadius:5,backgroundColor:COLORS.light,borderColor:COLORS.blue,borderWidth:0.4},

  IosSurface:{padding:10,borderRadius:5,backgroundColor:COLORS.light,borderColor:COLORS.blue,borderWidth:0.4,width:'95%',marginTop:'50%',marginLeft:'2.5%'}
})