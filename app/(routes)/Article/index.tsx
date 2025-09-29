import { useLocalSearchParams } from 'expo-router';
import React from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function index() {
  const Params = useLocalSearchParams()
  const Article = Params.Content
  const index = Params.idx
  
  return (
    <SafeAreaView style={styles.Container}>
    <View>
      <ScrollView>
      <Text style={styles.feedtitleH}>{Article}</Text>
      </ScrollView>
    </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  Container : {flex: 1, backgroundColor: '#1e1e1e'},
  feedtitleH : {
        fontSize: 15,
        color: '#FFFFFF',
        marginBottom: 10,
        textAlign: 'center',
        fontFamily : 'inter',
        fontWeight: 'bold',
    }, 
})
