import { MaterialCommunityIcons } from "@expo/vector-icons";
import { router, useLocalSearchParams } from 'expo-router';
import React, { useEffect } from 'react';
import { Image, Modal, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function index() {
  const Params = useLocalSearchParams()
  const Article = Params.Content
  const Title = Params.Title
  const index = Params.idx
  const byLine = Params.byLine
  const username = Params.username
  const sources = Params.sources;
  const bigImURL = Params.bigImg;
  const [SavedTitle, setTitle] = React.useState<string[]>([])
  const [saved, setSaved] = React.useState(false);
  const [boxState, setBoxState] = React.useState(false);
  const [content1, setContent] = React.useState()
  

  const back = () => {
    router.back();
  }

      useEffect(() => {
          getSavedArticles();
      }, []);

      useEffect(() => {alreadySaved();});
  
      const getSavedArticles = async() => {
          console.log("yes")
          const url = `http://192.168.0.15:8080/api/beta/Savearticles/getArty?username=${username}`;
          const response = await fetch(url, {method: 'POST',
              headers: {"Content-type": "application/json"},
          });
          if (response.ok) {
              console.log("nice")
              const articles = await response.json()
              setTitle(articles.map((article: any) => article.title))
              console.log(Title)
             
          }
          else{
              console.log("oh no")
          }
      };
    const alreadySaved = () => {
      if (SavedTitle.includes(Title as string)) {
        setSaved(true)
      }
    }

  const saveArticle = async() => {
    if (saved) {
      const url = "http://192.168.0.15:8080/api/beta/Savearticles/deleteArty";
      const response = await fetch(url, {method: 'DELETE',
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify({title: Title, content: Article, imageURL: bigImURL, username: username, byLine: byLine,
        sources: sources})
       })
    
    if (response.ok){
      const result = await response.json()
      setSaved(false)
      console.log("yes")
      getSavedArticles()
    }
    }
    else {
    console.log("yes")
    const url = "http://192.168.0.15:8080/api/beta/Savearticles/saveArticle";
    const response = await fetch(url, {method: 'POST',
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify({title: Title, content: Article, imageURL: bigImURL, username: username, byLine: byLine,
        sources: sources})
       })
    
    if (response.ok){
      const result = await response.json()
      setSaved(true)
      console.log("yes")
    }
    }
  }

    const bringSummary = async() => {
    const url = "https://api.groq.com/openai/v1/chat/completions";
    
    
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Authorization': 'Bearer ***',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        "messages": [
          {
            "role": "user",
            "content": `List potentially affected securities given article , first state the security name and sector clearly, then provide a short paragraph explaining the impact. Use this exact format:

            Security Name (Sector): Brief paragraph explaining the effect.

            Do not use asterisks, bullet points, or markdown: ${Article}`
          }
        ],
        "model": "llama-3.1-8b-instant",
      })
    });

  
    const rawText = await response.text();

    const resp = JSON.parse(rawText);
    setContent(resp.choices[0].message.content);
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
      <Modal animationType='slide' transparent={true} visible={boxState} >
            <View style={styles.modalOverlay}>
            <View style= {styles.CenterPopUp}>
            <Text style={[styles.feedtitleH, {position: "absolute", top: 20, right: 120}]}>Market Intelligence</Text>
            <TouchableOpacity style={styles.close} onPress={() => setBoxState(false)}>
              <MaterialCommunityIcons
                name= "close"
                size={40}
                color="#FFFF"
                style={{alignSelf: "center"}}
                />
            </TouchableOpacity>
            <ScrollView style={[{flex: 1}, {marginTop: 70}]}>
            <Text style={[styles.feedtitleH, {padding: 5, textAlign: "center"}]}> {content1} </Text>
            </ScrollView>
            </View>
            </View>
      </Modal>
      <ScrollView>
      <Image source={{uri: String(bigImURL)}}
        style={{flex: 1, width: '100%', height: 300, resizeMode:"cover", marginBottom: 10}}
        progressiveRenderingEnabled={true}/>
      <Text style={[styles.feedtitleH, {fontSize: 20, marginTop: 4, marginBottom: 10}]} numberOfLines={3} ellipsizeMode="tail">{Title}</Text> 
      <Text style={[styles.feedtitleH, {fontSize: 15, fontWeight: "light", marginBottom: 20}]}>{byLine}</Text>
      <Text style={[styles.feedtext]}>{Article}</Text>
      </ScrollView>
      <View style= {[{position: 'absolute'}, {marginLeft: 290}, {marginTop: 780}]}>
      <TouchableOpacity style={styles.AIcon} onPress={() => {bringSummary(); setBoxState(true);}}>
      <MaterialCommunityIcons
        name= "brain"
        size={40}
        color="#FFFF"
        style={{alignSelf: "center"}}
      />
      </TouchableOpacity>
      </View>
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
  },
  AIcon: {
    height: 70,
    width: 70,
    color: '#FFFFFF',
    borderRadius: 35,
    backgroundColor: '#000000',
    shadowColor: '#FFFFFF',
    shadowOffset: {
    width: 0,
    height: 0,
    },
    shadowOpacity: 0.8,
    borderStyle: 'solid',
    borderWidth: 2,
    justifyContent: 'center'
  },
  CenterPopUp : {
    height: 700,
    width: 400,
    borderRadius: 35,
    alignContent: 'center',
    backgroundColor: '#000000',
    justifyContent: 'center',
    borderColor: '#FFFFFF',
    borderWidth: 1,
    shadowColor: '#FFFFFF',
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 0.8,
    borderStyle: 'solid'
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    alignItems: 'center',
    justifyContent: 'center'
  },
  close: {
    height: 70,
    width: 70,
    color: '#FFFFFF',
    borderRadius: 35,
    backgroundColor: '#000000',
    shadowColor: '#FFFFFF',
    shadowOffset: {
    width: 0,
    height: 0, 
    },
    position: "absolute",
    top: 10, 
    right: 20
  }
})
