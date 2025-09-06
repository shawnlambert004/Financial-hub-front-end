import React from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';


export default function Dashboard() {
    const addLink = () => {
    }
  return (
    <SafeAreaView style={stylist.container}>
      <Image 
              source={require("@/assets/onboarding/onboarding.jpg")}
              style={stylist.OnboardPage} />
        <View style={{flexDirection:'row', alignItems: 'center'}}>
        <Text style={[stylist.feedtitle, {marginLeft: 140}]}>Your Feed</Text>
        <TouchableOpacity style={[stylist.buttonSign]} onPress={addLink}>
            <Text style={[stylist.buttonTextSign]}>Add</Text>
        </TouchableOpacity>
        </View>
        <View style={{position: 'absolute', bottom: 750, height: 1, backgroundColor: "white", width: '100%', marginTop: 2}} />
        <View style={{position: 'absolute', bottom: 100, height: 1, backgroundColor: "white", width: '100%', marginBottom: 10}} />
        
        <Text style={[stylist.title, {marginTop: 650}]}>Financial</Text>
        <Text style={stylist.title}>Hub</Text>
    </SafeAreaView>
  )
}

const stylist = StyleSheet.create({
  container: {flex: 1,
    backgroundColor: "black",
  },
  OnboardPage : {
        width: '100%',
        height: '100%',
        resizeMode: 'cover',
        position: 'absolute',
        zIndex: -1,
    },
  contentContainer: {
    flex: 1,
    backgroundColor: "transparent",
    zIndex: 1,
  },
  title : {
        fontSize: 25,
        fontWeight: 'bold',
        color: '#FFFFFF',
        marginBottom: 10,
        textAlign: 'center',
        fontFamily : 'Newsreader',
    },
    feedtitle : {
        fontSize: 30,
        color: '#FFFFFF',
        marginBottom: 10,
        textAlign: 'center',
        fontFamily : 'Newsreader',
    }, 
    buttonSign: {
        width: '30%',
        height: 45,
        backgroundColor : '#8B0000',
        marginTop: 30,
        marginBottom: 40,
        marginLeft: 20,
        borderRadius: 10,
        overflow: 'hidden',
        justifyContent: "center",
        alignItems: "center",
    },
    buttonTextSign: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#FFFFFF',
        textAlign: 'center',
        opacity : 1,
        fontFamily : 'Newsreader',
    },
})
