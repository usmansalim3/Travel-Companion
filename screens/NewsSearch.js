import { StyleSheet, Text, TextInput, View, FlatList, ScrollView, TouchableOpacity } from 'react-native'
import React,{useEffect, useState} from 'react'
import axios from 'axios'
import NewsCard from '../components/NewsCard'
import COLORS from '../constants/colors'
import { Entypo } from '@expo/vector-icons';



function NotFound(){
    return(
      <View style={{justifyContent:'center',alignItems:'center',backgroundColor:'white',elevation:5
      ,padding:10,borderRadius:10
      }}>
        <Text style={{fontWeight:'bold'}}>
          No articles found please make sure you have selected the right category of news
        </Text>
      </View>
    )
}
function SearchBar({placeholder,value,setValue,setCategory}){
  return(
    <TextInput 
    value={value}
    onChangeText={(text)=>{
      setValue(text)
    }}
    style={styles.textInput}
    placeholder={placeholder}
    />
    )
  }
  const NewsSearch = () => {
  const categories=[
    {category:'entertainment',icon:"tv"},
    {category:'sports',icon:"sports-club"},
    {category:'general',icon:"newsletter"},
    {category:'health',icon:"plus"},
    {category:'technology',icon:"laptop"},
    {category:'science',icon:"lab-flask"},
    {category:'business',icon:"suitcase"}
  ]
  const[pressed,setPressed]=useState(false);
  const[value,setValue]=useState('');
  const[articles,setArticles]=useState([]);
  const[category,setCategory]=useState('general');
  const[visible,setVisible]=useState(false);
  const[options,setOptions]=useState(false);
  function pressHandler({category}){
    setCategory(category);
    setPressed(true);
  }
  useEffect(()=>{
    async function news(){
      try{
        const response=await axios.get('https://newsapi.org/v2/top-headlines?apiKey=dd493ba6d06f44339e02f18279179ac2',{
          params:{
            category,
            country:'in',
            q:value
          }
        });
        setArticles(response.data.articles);
      }catch(e){
        console.log(e);
      }
    }
      news();
  },[value,category])
  useEffect(()=>{
    setInterval(()=>{
      if(articles.length===0){
        setVisible(true);
      }
    },3000)
  },[])
  return (
    <View style={{backgroundColor:COLORS.light,flex:1}}>
      <View style={{flexDirection:'row',justifyContent:'center',alignItems:'center',marginHorizontal:20,alignSelf:'center',padding:5,elevation:5,backgroundColor:'white',borderRadius:5,zIndex:1,position:'absolute',top:12}}>
        <Entypo name="magnifying-glass" size={24} color="black" />
        <SearchBar placeholder={"Search in "+category+" news"} value={value} setValue={setValue} setCategory={setCategory}/>
        {options?<Entypo name="cross" size={24} color="black" onPress={()=>setOptions(false)}/>
        :<Entypo name="list" size={24} color="black" onPress={()=>setOptions((true))}/>}
      </View>
      <View style={{backgroundColor:'#212529',flex:1}}>
        <FlatList data={articles} renderItem={({item})=><NewsCard  item={item} touch={false} urlToImage={item.urlToImage} title={item.title} description={item.description} sourceName={item.source.name} publishedAt={item.publishedAt} author={item.author}
         />}
         />
      </View>
      {options?<View style={{position:'absolute',bottom:10,zIndex:999,padding:5,elevation:5,backgroundColor:'white',borderRadius:5,marginTop:10,marginHorizontal:20}}>
        <FlatList
          horizontal
          data={categories}
          renderItem={({item})=>
          <TouchableOpacity style={[styles.button,category===item.category?{backgroundColor:COLORS.blue}:null]} onPress={()=>{
            setCategory(item.category)
            setPressed(true);

          }}>
            <View>
              <Entypo name={item.icon} size={22} color="black" />
            </View>
          </TouchableOpacity>}
          showsHorizontalScrollIndicator={false}
          />
      </View>:null}
      {articles.length===0&&visible?<NotFound/>:null}
    </View>
  )
}

export default NewsSearch

const styles = StyleSheet.create({
    searchBarContainer:{
        width:'80%',
        
    },
    textInput:{
        height:35,
        padding:5,
        fontSize:15,
        width:'80%',
        alignContent:'center',
        alignItems:'center'
    },
    button:{
      margin:10,
      backgroundColor:'white',
      elevation:5,
      padding:7,
      borderRadius:10
    }
})