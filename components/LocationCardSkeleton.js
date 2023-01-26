import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Skeleton } from '@rneui/themed'

const LocationCardSkeleton = (props) => {
  const color=props.color?props.color:'#004c40'
  return (
    <View style={{marginVertical:5}}>
        <View style={{width:'90%',alignSelf:'center'}}>
          <Skeleton height={200} style={{marginBottom:16}} skeletonStyle={{backgroundColor:color}}/>
          <View>
            <View style={{flexDirection:'row',marginBottom:10}}>
              <Skeleton  height={25} width={75} style={{marginRight:5}} skeletonStyle={{backgroundColor:color}}/>
              <Skeleton  height={25} width={250} skeletonStyle={{backgroundColor:color}}/>
            </View>
            <View style={{flexDirection:'row',marginBottom:10}}>
              <Skeleton height={25} width={75} style={{marginRight:5}} skeletonStyle={{backgroundColor:color}}/>
              <Skeleton  height={25} width={250} skeletonStyle={{backgroundColor:color}}/>
            </View>
            <View style={{flexDirection:'row',marginBottom:10}}>
              <Skeleton  height={25} width={75} style={{marginRight:5}} skeletonStyle={{backgroundColor:color}}/>
              <Skeleton  height={25} width={250} skeletonStyle={{backgroundColor:color}}/>
            </View>
            <View style={{flexDirection:'row',marginBottom:10}}>
              <Skeleton  height={25} width={75} style={{marginRight:5}} skeletonStyle={{backgroundColor:color}}/>
              <Skeleton height={25} width={250} skeletonStyle={{backgroundColor:color}}/>
            </View>
          </View>
        </View>
      </View>
        
  )
}

export default LocationCardSkeleton

const styles = StyleSheet.create({})