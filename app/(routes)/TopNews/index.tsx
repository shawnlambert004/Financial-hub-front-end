import React from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function index() {
  return (
    <SafeAreaView style={stylist.container}>
          <Image    
                  source={require("@/assets/onboarding/onboarding.jpg")}
                  style={stylist.OnboardPage} />
            <View style={{flexDirection:'row', alignItems: 'center'}}> </View>
            <Text style={[stylist.feedtitle, {marginTop: 30}]}>Main Headlines</Text>
            <View style={{position: 'absolute',top: 120, height: 1, backgroundColor: "white", width: '100%', marginBottom: 10}}/>
            <View style={{position: 'absolute',bottom: 100, height: 1, backgroundColor: "white", width: '100%', marginBottom: 10}}/>
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
    feedtitle : {
        fontSize: 30,
        color: '#FFFFFF',
        marginBottom: 10,
        textAlign: 'center',
        fontFamily : 'Newsreader',
    }, 
    urlSign: {
        borderRadius: 10,
        width: '50%',
        height: 45,
        color: '#FFFFFF',
        opacity: 1
    },
    TextBox: {
        borderRadius : 2,
        width: '90%',
        height: 160,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: '#000000',
        borderColor: '#ffff',
        borderWidth: 1,
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
        borderBottomLeftRadius: 10,
        borderBottomRightRadius: 10,
    },
})