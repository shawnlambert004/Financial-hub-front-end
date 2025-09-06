import { MaterialCommunityIcons } from "@expo/vector-icons";
import { router } from 'expo-router';
import React from 'react';
import { Controller, useForm } from "react-hook-form";
import { Image, KeyboardAvoidingView, Platform, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import tw from 'twrnc';

interface SignUpFormData {
  firstName: string;
  lastName: string;
  username: string;
  password: string;
  confirm: string;
}
export default function SignUp() {
  const signUpForm = useForm<SignUpFormData>({
    mode: "onChange",
    defaultValues: {
      firstName: "",
      lastName: "",
      username: "",
      password: "",
      confirm: "",
    },
  });


  const saveData = async() => {
    const formValues = signUpForm.getValues();
    console.warn(formValues.firstName, formValues.lastName, formValues.username, formValues.password);
    const url = "http://192.168.0.15:8080/api/beta/user/regUser";
    let response = await fetch(url, {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body:JSON.stringify({first_name: formValues.firstName, last_name: formValues.lastName, 
        username: formValues.username,
        password: formValues.password }),
  });
    const result = await response.json();
    if (result) {
        console.warn("data added");
    }
    router.push("/(routes)/login");
};

  const handleSignUp = () => {
    router.push("/(routes)/login");
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
            <Text style={[stylist.title, {marginTop: 20}, {marginBottom: 60}]}>Sign Up</Text>
            
            <Controller
                control={signUpForm.control}
                name="firstName"
                render = {({field: {onChange, onBlur, value}}) => (<View style={tw`flex-row items-center bg-black-50 rounded-xl px-3 py-4 border ${signUpForm.formState.errors.firstName? 'border-red-500' : 'border-gray-200'}`}
              >
                <MaterialCommunityIcons
              name= "pen"
              size={20}
              color="white"
              />
              <TextInput 
              style = {[tw `flex-1 ml-3`, {color: '#FFFFFF', fontFamily: 'NewsReader'}]}
              placeholder='First Name'
              placeholderTextColor='#9CA3AF'
              value={value}
              onChangeText={onChange}
              onBlur={onBlur}
              />
              </View> )} />

              <Text style={[stylist.userlog, {marginTop: 10}]}>
                
              </Text>
                

                <Controller
                control={signUpForm.control}
                name="lastName"
                render = {({field: {onChange, onBlur, value}}) => (<View style={tw`flex-row items-center bg-black-50 rounded-xl px-3 py-4 border ${signUpForm.formState.errors.lastName? 'border-red-500' : 'border-gray-200'}`}
              >
                <MaterialCommunityIcons
              name= "pen"
              size={20}
              color="white"
              />
              <TextInput 
              style = {[tw `flex-1 ml-3`, {color: '#FFFFFF', fontFamily: 'NewsReader'}]}
              placeholder='Last Name'
              placeholderTextColor='#9CA3AF'
              value={value}
              onChangeText={onChange}
              onBlur={onBlur}
              />
              </View> )} />

              <Text style={[stylist.userlog, {marginTop: 10}]}>
                
              </Text>


            <Controller 
            control={signUpForm.control}
            name="username"
            render = {({field: {onChange, onBlur, value}}) => (
              <View style={tw`flex-row items-center bg-black-50 rounded-xl px-3 py-4 border ${signUpForm.formState.errors.username ? 'border-red-500' : 'border-gray-200'}`}
              >
              
              <MaterialCommunityIcons
              name= "account-outline"
              size={20}
              color="white"
              />
              <TextInput 
              style = {[tw `flex-1 ml-3`, {color: '#FFFFFF', fontFamily: 'NewsReader'}]}
              placeholder='Username'
              placeholderTextColor='#9CA3AF'
              value={value}
              onChangeText={onChange}
              onBlur={onBlur}
              />
              </View> )} />

              <Text style={[stylist.userlog, {marginTop: 10}]}>
                
              </Text>

              <Controller
              control={signUpForm.control}
              name="password"
              rules={{required: "password is required",}}
              render={({field: {onChange, onBlur, value}}) => (
              <View style={tw`flex-row items-center bg-black-50 rounded-xl px-3 py-4 border ${signUpForm.formState.errors.password ? 'border-red-500' : 'border-gray-200'}`}
              >
                <MaterialCommunityIcons 
                name="lock"
                size={20}
                color = "white"
                />
                <TextInput 
                style = {[tw `flex-1 ml-3`, {color: '#FFFFFF', fontFamily: 'NewsReader'}]}
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

            <Text style={[stylist.userlog, {marginTop: 10}]}>
                
              </Text>

            <TouchableOpacity style={stylist.buttonSign} onPress={saveData}>
              <Text style={stylist.buttonTextSign}> Sign Up</Text>
            </TouchableOpacity>

            <Text style={[stylist.helpText, {marginTop: 10}]}>already have an account? </Text>
            <TouchableOpacity style={[stylist.buttonLogin, {marginLeft: 135}, {marginTop: 10}]} onPress={handleSignUp}>
              <Text style={[stylist.buttonLoginText, {marginRight: 260}]}>Log in</Text>
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
        fontSize: 10,
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

    buttonSign: {
        width: '70%',
        height: 50,
        backgroundColor : '#8B0000',
        marginTop: 30,
        marginLeft: 50,
        borderRadius: 10,
        overflow: 'hidden',
        justifyContent: "center",
        alignItems: "center",
    },
    buttonLogin: {
        width: '100%',
        height: 30,
        backgroundColor: '#000000',
        marginTop: 30,
        marginLeft: 200,
        marginRight: 200,
        borderRadius: 10,
        overflow: 'hidden',
        justifyContent: "center",
        alignItems: "center",
    },
    buttonLoginText: {
        fontSize: 15,
        fontWeight: 'bold',
        color: '#FFFFFF',
        textAlign: 'center',
        opacity : 1,
        fontFamily : 'Newsreader',
    },
    buttonTextSign: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#FFFFFF',
        textAlign: 'center',
        opacity : 1,
        fontFamily : 'Newsreader',
    },
    helpText: {
        fontSize: 15,
        fontWeight: 'bold',
        color: '#9CAFAC',
        textAlign: 'center',
        opacity: 1,
        fontFamily: 'Newsreader',
    }
})