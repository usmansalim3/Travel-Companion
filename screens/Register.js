import { StyleSheet, Text, View, Pressable, KeyboardAvoidingView} from 'react-native'
import React, { useContext, useEffect,useState} from 'react'
import COLORS from '../constants/colors'
import Input from '../components/Input'
import { useNavigation } from '@react-navigation/native'
import { Formik, useFormik, yupToFormErrors } from 'formik'
import * as Yup from "yup"
import { authContext } from '../authContext/AuthContextProvider'
import { ActivityIndicator, Surface } from 'react-native-paper'
import { LinearGradient } from 'expo-linear-gradient'

const Register = () => {
  const context=useContext(authContext);
  const navigation=useNavigation();
  function ErrorCard(){
    return(
    <View>
      <Text>
        {context.error}
      </Text>
    </View>
    )
  }
  const[touched,setTouched]=useState(false);
  const formik=useFormik({
    initialValues:{
      Email:'',
      Password:''
    },
    validationSchema:Yup.object().shape({
      Email:Yup.string().min(3,"Too short!").max(20,"Name length limited reached!").required("Field is required!"),
      Password:Yup.string().max(20,"Name length limited reached!").required("Field is required!")
    }),
      onSubmit:async (values)=>{
          context.setError('');
          setTouched(true);
          await context.register(values.Email,values.Password);
      }

  })
  useEffect(()=>{
    if(context.user&&context.reg){
      setTouched(false);
      navigation.navigate('Add Details');
    }
  },[context.user])
  return (
    <LinearGradient style={{height:'100%',width:'100%',flex:1}} colors={['#B9B9DC','#3C3EF1']}>
        <KeyboardAvoidingView behavior='position' style={{height:'95%'}}>
        <Surface elevation={1} style={Platform.OS==='ios'?styles.IosSurface:styles.AndroidSurface}>
          <Text  allowFontScaling={false} style={styles.registerHeader}>Register <Text style={{color:COLORS.blue}}>Here</Text></Text>
          <Text allowFontScaling={false} style={styles.registerSubHeading}>Enter your details down below</Text>
          <View style={{marginVertical:10}}>
            <Input label="Email" iconName="email" placeholder={"Enter your Email"} value={formik.values.email} formik={formik} error={formik.errors} touched={formik.handleBlur} handleChange={formik.handleChange}/>
            <Input label="Password" iconName="vpn-key" hide={true} placeholder={"Enter your password"} error={formik.errors}formik={formik}  touched={formik.handleBlur} value={formik.values.password} handleChange={formik.handleChange}/>
          </View>
          <View style={{width:'90%',marginTop:10,alignSelf:'center',borderRadius:4,backgroundColor:COLORS.blue,overflow:"hidden"}}>
                <Pressable onPress={formik.handleSubmit} android_ripple={{color:"#4527a0"}} style={{justifyContent:'center',alignItems:'center',height:40}}>
                {touched&&(!context.error)?<ActivityIndicator animating={true} color={COLORS.white}/>:<Text style={{color:COLORS.light}}>
                  Register
                </Text>}
                </Pressable>
          </View>
          <View style={{marginTop:10,marginLeft:20,flexDirection:'row'}}>
            <Text>
              Already a member?
            </Text>
            <Pressable onPress={()=>navigation.navigate('Login')} style={{marginLeft:3}}>
              <Text style={{fontWeight:'bold',color:COLORS.blue}}>Sign in</Text>
            </Pressable>
          </View>
          {context.error?<ErrorCard/>:null}
        </Surface>
    </KeyboardAvoidingView>
      </LinearGradient>
  )
}

export default Register

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        paddingTop:100,
        paddingHorizontal:20
      },
      registerHeader:{
        fontSize:40,
        fontWeight:'bold'
      },
      registerSubHeading:{
        fontSize:16,
        color:COLORS.grey,
        marginLeft:1
      },
      AndroidSurface:{width:'95%',alignSelf:'center',marginTop:'40%',padding:10,borderRadius:5,backgroundColor:COLORS.light,borderColor:COLORS.blue,borderWidth:0.4},

      IosSurface:{padding:10,borderRadius:5,backgroundColor:COLORS.light,borderColor:COLORS.blue,borderWidth:0.4,width:'95%',marginTop:'50%',marginLeft:'2.5%'}
})