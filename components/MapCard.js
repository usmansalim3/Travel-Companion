import { Alert, Image, Platform, StyleSheet, Text, View } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import MapView, { Marker } from 'react-native-maps'
import { Divider, IconButton, List, Paragraph, Surface, Title } from 'react-native-paper'
import axios from 'axios'
import { AntDesign } from '@expo/vector-icons'; 
import COLORS from '../constants/colors'
import {firebase} from '../auth/Firebase-config'
import { authContext } from '../authContext/AuthContextProvider'
import moment from 'moment'
import PM25 from '../assets/svgs/PM25'
import PM255 from '../assets/svgs/PM255'

const MapCard = (props) => {
    const firestore=firebase.firestore().collection('UserLocation');
    const[geo,setGeo]=useState([])
    const{user,setLimit}=useContext(authContext);
    
    useEffect(()=>{
        async function reverseGeoLocation(){
            try{
                const res=await axios.get("https://eu1.locationiq.com/v1/reverse?key=pk.3a6925e7a6b5ddf0d5c3e919eb320516&format=json",{
                    params:{
                        lat:props.data.latitude,
                        lon:props.data.longitude
                    }
                });
                setGeo(res.data);
            }
            catch(e){
            }
        }
        reverseGeoLocation();
      },[])
      async function deleteHandler(){
        await firestore.doc(props.data.docuID).delete();
        props.setDel((prev)=>!prev);
        setLimit((prev)=>prev-1);
      }
      function AQILevel(level){
        switch (level) {
            case 1:
                return "Good";
            case 2:
                return "Fair";
            case 3:
                return "Moderate";
            case 4:
                return "Poor";
            case 5:
                return "Very Poor"
            default:
                return "Not Available";
        }
      }
    return (
                <Surface style={Platform.OS==='ios'?styles.iosSurface:styles.androidSurface}>
                    <View style={{height:200}}>
                        <MapView 
                        region={{latitude:props.data.latitude,longitude:props.data.longitude,latitudeDelta:0.002,longitudeDelta:0.002}}
                        style={{flex:1}}>
                            <Marker coordinate={{latitude:props.data.latitude,longitude:props.data.longitude,latitudeDelta:0.002,longitudeDelta:0.002}}/>
                        </MapView>
                    </View>
                    <View style={{flex:1}}>
                        <List.Accordion title='Coordinates' style={{flex:1,backgroundColor:COLORS.light}} titleStyle={{fontSize:18}} left={()=><List.Icon icon='map-marker' />}>
                            <List.Item title={props.data.longitude} description="longitude" left={()=><List.Icon icon='crosshairs-gps' />}/>
                            <Divider/>
                            <List.Item title={props.data.latitude}  description="latitude"  left={()=><List.Icon icon='crosshairs-gps' />}/>
                            <Divider/>
                            <List.Item title={props.data?.date?moment(props.data.date.toDate()).format("MMMM Do YYYY, h:mm:ss a"):'N/A'}
                            description="Time" left={()=><List.Icon icon="clock"/>}
                            />
                        </List.Accordion>
                        <Divider/>
                        <List.Accordion style={{flex:1,backgroundColor:COLORS.light}} title='Location' titleStyle={{fontSize:18}} left={()=><List.Icon icon="map-legend"/>}>
                            <List.Item title={geo.address?.county?geo.address.county:'N/A'} description="Locality" 
                            left={()=><List.Icon icon="home-group"/>}/>
                            <Divider/>
                            <List.Item title={geo.address?.state?geo.address.state:'N/A'} description="State" 
                            left={()=><List.Icon icon="city-variant"/>}/>
                            <Divider/>
                            <List.Item title={geo.address?.suburb?geo.address.suburb:'N/A'} description="Suburb"
                            left={()=><List.Icon icon="home-city" />}/>
                            <Divider/>
                            <List.Item title={geo.address?.postcode?geo.address.postcode:'N/A'} description="Postcode"
                            left={()=><List.Icon icon="postage-stamp"/>}/>
                        </List.Accordion>
                        <List.Accordion style={{flex:1,backgroundColor:COLORS.light}} title='Air Quality' titleStyle={{fontSize:18}} left={()=><List.Icon icon="face-mask"/>}>
                            <List.Item title={props.data.aqi?AQILevel(props.data.aqi):'N/A'} description='AQI' left={()=>{
                                return(
                                    <View style={{alignSelf:'center',marginLeft:17,marginRight:10}}>
                                        <PM25/>
                                    </View>
                                )
                            }}/>
                            <List.Item title={props.data.pm2_5?props.data.pm2_5+' μg/m3':'N/A'} description='Particulate Matter 2.5' left={()=>{
                                return(
                                    <View style={{alignSelf:'center',marginLeft:14,marginRight:12}}>
                                        <PM255/>
                                    </View>
                                )
                            }} />
                        </List.Accordion>
                    </View>
                    <IconButton icon="delete" onPress={deleteHandler} iconColor={COLORS.blue} style={{position:'absolute',top:5,right:5}}/>
                </Surface>
  )
}

export default MapCard

const styles = StyleSheet.create({
    androidSurface:{borderRadius:5,padding:2,backgroundColor:COLORS.light,marginVertical:5,width:'95%',alignSelf:'center'},
    iosSurface:{borderRadius:5,padding:2,backgroundColor:COLORS.light,marginVertical:5,width:'95%',marginLeft:'2.5%'}
})