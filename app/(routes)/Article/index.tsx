import { useLocalSearchParams } from 'expo-router';
import React from 'react';
import { ScrollView, Text, View } from 'react-native';

export default function index() {
  const Params = useLocalSearchParams()
  const Article = JSON.parse(Params.Content as string) as string[]
  console.log("Articles", typeof (Article))
  const index = Params.idx
  const articleContent = Article[Number(index)]
  
  return (
    <View>
      <ScrollView>
      <Text>{articleContent}</Text>
      </ScrollView>
    </View>
  )
}
