import { MaterialCommunityIcons } from "@expo/vector-icons";
import { router, useLocalSearchParams } from 'expo-router';
import React from 'react';
import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function index() {
  const Params = useLocalSearchParams()
  const Article = Params.Content
  const Title = Params.Title
  const index = Params.idx
  const imageURL = Params.imageUrl
  const byLine = Params.byLine
  const username = Params.username
  const sources = Params.sources;
  const [saved, setSaved] = React.useState(false);

  const back = () => {
    router.back();
  }

  const saveArticle = async() => {
    console.log("yes")
    const url = "http://192.168.0.15:8080/api/beta/Savearticles/saveArticle";
    const response = await fetch(url, {method: 'POST',
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify({title: Title, content: Article, imageURL: imageURL, username: username, byLine: byLine,
        sources: sources})
       })
    
    if (response.ok){
      const result = await response.json()
      setSaved(true)
      console.log("yes")
    }
    }
  
  return (
    <SafeAreaView style={styles.Container}>
      <View style={{flexDirection:'row', alignItems: 'center'}}>
      <TouchableOpacity onPress={back}>
      <MaterialCommunityIcons
          name= "arrow-left"
          size={40}
          color="white"
          style={{marginLeft: 30, marginBottom: 10}}
          />
      </TouchableOpacity>
      <TouchableOpacity onPress={saveArticle}>
        <MaterialCommunityIcons
          name= "bookmark"
          size={40}
          color= {saved ? "#FFFFFF":"#1e1e1e"}
          style={{marginLeft: 240, marginBottom: 10}}
          />
      </TouchableOpacity>
      </View>
      <ScrollView>
      <Image source={{uri: String(imageURL)}}
        style={{flex: 1, width: '100%', height: 300, resizeMode:"cover", marginBottom: 10}}
        progressiveRenderingEnabled={true}/>
      <Text style={[styles.feedtitleH, {fontSize: 20, marginTop: 4, marginBottom: 10}]} numberOfLines={3} ellipsizeMode="tail">{Title}</Text> 
      <Text style={[styles.feedtitleH, {fontSize: 15, fontWeight: "light", marginBottom: 20}]}>{byLine}</Text>
      <Text style={[styles.feedtext]}>{Article}</Text>
      </ScrollView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  Container : {flex: 1, backgroundColor: '#000000'},
  feedtitleH : {
        fontSize: 15,
        color: '#FFFFFF',
        fontFamily : 'inter',
        fontWeight: 'bold',
    },
  feedtext : {
     fontSize: 15,
        color: '#B8B8B8',
        marginBottom: 10,
        fontFamily : 'inter',
        fontWeight: 'bold',
  } 
})
