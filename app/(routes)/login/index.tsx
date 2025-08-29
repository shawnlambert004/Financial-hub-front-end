import React from 'react'
import { KeyboardAvoidingView, Platform } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

export default function LoginScreen() {
  return (
    <SafeAreaView className='flex-1 bg-black'>
      <KeyboardAvoidingView>
        behavior = {Platform.OS == "ios"? "padding": "height"}
        className= "flex-1"
      </KeyboardAvoidingView>
    </SafeAreaView>
  )
}