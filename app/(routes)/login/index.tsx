import React from 'react'
import { Image, KeyboardAvoidingView, Platform, ScrollView, StyleSheet, Text } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

export default function LoginScreen() {
  return (
    <SafeAreaView style={stylist.container}>
      <Image 
              source={require("@/assets/onboarding/onboarding.jpg")}
              style={stylist.OnboardPage} />
      <KeyboardAvoidingView
        behavior = {Platform.OS == "ios"? "padding": "height"}
        style={{flex: 1, paddingBottom: 50, paddingTop: 250, paddingHorizontal: 20, zIndex : 2}}
        >
          <ScrollView style={{flex: 1}}>
            <Text style={stylist.title}>Welcome</Text>
            <Text style={stylist.title}>back</Text>
            <Text style={[stylist.userlog, {marginTop: 80}]}>
              Username
            </Text>
            </ScrollView>
      </KeyboardAvoidingView>
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
        fontSize: 40,
        fontWeight: 'bold',
        color: '#FFFFFF',
        marginBottom: 10,
        textAlign: 'center',
        fontFamily : 'Newsreader',
    },
    userlog : {
        fontSize: 27,
        fontWeight: 'bold',
        color: '#666666',
        marginBottom: 10,
        textAlign: 'center',
        fontFamily : 'Newsreader',
    },

})

