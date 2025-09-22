import { MaterialCommunityIcons } from "@expo/vector-icons";
import { router } from 'expo-router';
import React from 'react';
import { Controller, useForm } from "react-hook-form";
import { Image, KeyboardAvoidingView, Platform, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import tw from 'twrnc';

interface LoginFormData {
  username: string;
  password: string;
}
export default function LoginScreen() {
  const [state, setLoginError] = React.useState(false);
  const loginForm = useForm<LoginFormData>({
    mode: "onChange",
    defaultValues: {
      username: "",
      password: "",
    },
  });
  const handleLogin = async() => {
    const loginFormValues = loginForm.getValues();
    console.warn(loginFormValues.username, loginFormValues.password);
    const url="http://192.168.0.15:8080/api/beta/user/login";
    let response = await fetch(url, {
      method : "POST",
      headers: {"Content-Type" : "application/json"},
      body: JSON.stringify({username: loginFormValues.username, password: loginFormValues.password})
    });

    
    if (response.ok) {
          const result = await response.json();
          router.push({pathname: "/(routes)/TopNews", params: {username:loginFormValues.username }});
          console.warn("pressed button");
          setLoginError(false);
    }
    else {
      const errorText = await response.text();
      console.warn("not working");
      setLoginError(true);
    }

  }

  const handleSignUp = () => {
    router.replace("/(routes)/SignUp");
  }
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
            <Text style={[stylist.title, {marginBottom: 50}]}>back</Text>
            <Controller 
            control={loginForm.control}
            name="username"
            render = {({field: {onChange, onBlur, value}}) => (
              <View style={tw`flex-row items-center bg-black-50 rounded-xl px-3 py-4 border ${state ? 'border-red-500' : 'border-gray-200'}`}
              >
              
              <MaterialCommunityIcons
              name= "account-outline"
              size={20}
              color="white"
              />
              <TextInput 
              style = {[tw `flex-1 ml-3`, {color: '#FFFFFF', fontFamily: 'inter'}]}
              placeholder='Username'
              placeholderTextColor='#9CA3AF'
              value={value}
              onChangeText={onChange}
              onBlur={onBlur}
              /> 
              </View> )} />

              <Text style={[stylist.userlog, {marginTop: 30}]}>
                
              </Text>

              <Controller
              control={loginForm.control}
              name="password"
              rules={{required: "password is required",}}
              render={({field: {onChange, onBlur, value}}) => (
              <View style={tw`flex-row items-center bg-black-50 rounded-xl px-3 py-4 border ${state ? 'border-red-500' : 'border-gray-200'}`}
              >
                <MaterialCommunityIcons 
                name="lock"
                size={20}
                color = "white"
                />
                <TextInput 
                style = {[tw `flex-1 ml-3`, {color: '#FFFFFF', fontFamily: 'inter'}]}
                placeholder='Password'
                placeholderTextColor='#9CA3AF'
                value={value}
                onChangeText={onChange}
                onBlur={onBlur}
                secureTextEntry= {true}
              />
              </View>
            )}
            />
            <TouchableOpacity style={stylist.button} onPress={handleLogin}>
              <Text style={stylist.buttonText}> Log In</Text>
            </TouchableOpacity>

            <TouchableOpacity style={stylist.buttonSign} onPress={handleSignUp}>
              <Text style={stylist.buttonTextSign}> Sign Up</Text>
            </TouchableOpacity>
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
        fontFamily : 'inter',
    },
    userlog : {
        fontSize: 27,
        fontWeight: 'bold',
        color: '#666666',
        marginBottom: 10,
        textAlign: 'center',
        fontFamily : 'inter',
    },
    button: {
        width: '70%',
        height: 50,
        backgroundColor : '#1e1e1e',
        opacity: 0.7,
        marginTop: 40,
        marginLeft: 50,
        borderRadius: 10,
        overflow: 'hidden',
        justifyContent: "center",
        alignItems: "center",
    },
    buttonText: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#FFFFFF',
        textAlign: 'center',
        opacity : 1,
        fontFamily : 'inter',
    },

    buttonSign: {
        width: '70%',
        height: 50,
        backgroundColor : '#1e1e1e',
        marginTop: 30,
        marginLeft: 50,
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
        fontFamily : 'inter',
    },
})

//fixed login hi