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

  const back = () => {
    router.back();
  }
  return (
    <SafeAreaView style={styles.Container}>
    <View>
      <TouchableOpacity onPress={back}>
      <MaterialCommunityIcons
          name= "arrow-left"
          size={40}
          color="white"
          style={{marginLeft: 30, marginBottom: 10}}
          />
      </TouchableOpacity>
      <ScrollView>
      <Image source={{uri: String(imageURL)}}
        style={{flex: 1, width: '100%', height: 300, resizeMode:"cover"}}
        resizeMode="cover"
        progressiveRenderingEnabled={true}/>
      <Text style={[styles.feedtitleH, {fontSize: 20, marginTop: 40}]} numberOfLines={3} ellipsizeMode="tail">{Title}</Text> 
      <Text style={[styles.feedtext]}>{Article}</Text>
      </ScrollView>
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
  } 
})
