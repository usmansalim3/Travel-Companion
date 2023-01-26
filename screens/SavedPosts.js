import { FlatList, RefreshControl, StyleSheet, Text, View } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import NewsCard from '../components/NewsCard'
import { authContext } from '../authContext/AuthContextProvider'
import SavedPostCard from '../components/SavedPostCard'
import {firebase} from '../auth/Firebase-config'
import { Button } from 'react-native-paper'
import COLORS from '../constants/colors'
import { LinearGradient } from 'expo-linear-gradient'
import LocationCardSkeleton from '../components/LocationCardSkeleton'


const NoPostsCard = () => {
    return(
        <View>
            <Text>NO SAVED POSTS</Text>
        </View>
    )
}
const SavedPosts = () => {
    const context=useContext(authContext);
    const[refresh,setRefresh]=useState(false);
    //const savedPosts=useSelector((state)=>state)
    const[del,setDel]=useState(false);
    const firestore=firebase.firestore().collection('UserSavedPosts')
    const [posts,setPosts]=useState([]);
    const[show,setShow]=useState(false);
    useEffect(()=>{
        setTimeout(()=>{
            setShow(!show);
        },3000)
    },[]);
    useEffect(()=>{
        async function posts(){
           const post=[];
           await firestore.where('userID','==',context.user.uid).get().then((snap)=>{
            snap.forEach((query)=>{
                const postWithID={...query.data(),postID:query.id}
                post.push(postWithID);
            })
           })
           setPosts(post);
        }
        posts();
    },[del])
    async function refreshHandler(){
        const post=[];
        setRefresh(true);
           await firestore.get().then((snap)=>{
            snap.forEach((query)=>{
                const postWithID={...query.data(),postID:query.id}
                post.push(postWithID);
            })
           })
           setPosts(post);
           setRefresh(false);
    }
    
    return(
        <LinearGradient colors={['#c7a4ff','#001064']} style={{flex:1}}>
            {posts.length?<FlatList
                refreshControl={
                    <RefreshControl
                    refreshing={refresh}
                    onRefresh={refreshHandler}
                    />
                }
            data={posts} renderItem={({item,index})=><SavedPostCard item={item} touch={""} del={del} setDel={setDel} save={context.save} setSave={context.setSave} urlToImage={item.urlToImage} title={item.title} description={item.description} sourceName={item.sourceName} publishedAt={item.publishedAt} author={item.author} postRef={item.postID}
            />}
            />:<View>
                <LocationCardSkeleton color="#001064"/>
                <LocationCardSkeleton color="#001064"/>
                </View>}
            
        </LinearGradient>
    )
}

export default SavedPosts

const styles = StyleSheet.create({})