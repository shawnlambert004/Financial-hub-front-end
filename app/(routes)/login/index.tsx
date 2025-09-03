import { MaterialCommunityIcons } from "@expo/vector-icons";
import React from 'react';
import { Controller, useForm } from "react-hook-form";
import { Image, KeyboardAvoidingView, Platform, StyleSheet, Text, TextInput, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import tw from 'twrnc';

interface LoginFormData {
  username: string;
  password: string;
}
export default function LoginScreen() {
  const loginForm = useForm<LoginFormData>({
    mode: "onChange",
    defaultValues: {
      username: "",
      password: "",
    },
  });
  return (
    <SafeAreaView style={stylist.container}>
      <Image 
              source={require("@/assets/onboarding/onboarding.jpg")}
              style={stylist.OnboardPage} />
      <KeyboardAvoidingView
        behavior = {Platform.OS == "ios"? "padding": "height"}
        style={{flex: 1, paddingBottom: 50, paddingTop: 50, paddingHorizontal: 20, zIndex : 2}}
        >
            <Text style={[stylist.title, {marginTop: 90}]}>Welcome</Text>
            <Text style={stylist.title}>back</Text>
            <Text style={[stylist.userlog, {marginTop: 50}]}>
              Username
            </Text>
            <Controller 
            control={loginForm.control}
            name="username"
            render = {({field: {onChange, onBlur, value}}) => (
              <View style={tw`flex-row items-center bg-black-50 rounded-xl px-3 py-4 border ${loginForm.formState.errors.username ? 'border-red-500' : 'border-gray-200'}`}
              >
              
              <MaterialCommunityIcons
              name= "account-outline"
              size={20}
              color="white"
              />
              <TextInput 
              style = {tw `flex-1 ml-3 text-gray-800 font-NewsReader`}
              placeholder='Username'
              value={value}
              onChangeText={onChange}
              onBlur={onBlur}
              />
              </View> )} />

              <Text style={[stylist.userlog, {marginTop: 30}]}>
                Password
              </Text>

              <Controller
              control={loginForm.control}
              name="password"
              rules={{required: "password is required",}}
              render={({field: {onChange, onBlur, value}}) => (
              <View style={tw`flex-row items-center bg-black-50 rounded-xl px-3 py-4 border ${loginForm.formState.errors.password ? 'border-red-500' : 'border-gray-200'}`}
              >
                <MaterialCommunityIcons 
                name="lock"
                size={20}
                color = "white"
                />
                <TextInput 
              style = {tw `flex-1 ml-3 text-gray-800 font-NewsReader`}
              placeholder='Password'
              value={value}
              onChangeText={onChange}
              onBlur={onBlur}
              secureTextEntry= {true}
              />
              </View>
            )} 
            />
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

//fixed login hi