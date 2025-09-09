import React from 'react';
import { Controller, useForm } from "react-hook-form";
import { Image, Linking, Modal, Pressable, StyleSheet, Text, TextInput, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import tw from 'twrnc';

interface urlInput  {
        url: string;
    }

export default function Dashboard() {
    const [boxState, addButtonPressed] = React.useState(false);

    const urlForm = useForm<urlInput>({
        mode: "onChange",
        defaultValues: {url: "",}

    });

  return (
    <SafeAreaView style={stylist.container}>
      <Image    
              source={require("@/assets/onboarding/onboarding.jpg")}
              style={stylist.OnboardPage} />
        <View style={{flexDirection:'row', alignItems: 'center'}}>
        <Text style={[stylist.feedtitle, {marginLeft: 140}]}>Your Feed</Text>
        <Pressable style={[stylist.buttonTextSign, stylist.buttonSign]} onPress={() => addButtonPressed(true)} >
            <Text style= {stylist.buttonTextSign}>Add</Text>
        </Pressable>
        <Modal animationType='slide' transparent={true} visible={boxState} >
            <View style= {stylist.CenterPopUp}>
            <View style={[stylist.TextBox]}>
            <Controller
            control={urlForm.control}
            name="url"
            render={({field: {onChange, onBlur, value}}) => 
            (<View style={tw`flex-row items-center bg-black-50 rounded-xl px-3 py-4 border - white}`}
              >
                <TextInput style={[tw `flex-1 ml-3`, {color: '#000000', fontFamily: 'NewsReader', height: 30, borderWidth: 1, borderColor: '#8B0000', borderRadius: 2}]}
                    placeholder='https://'
                    placeholderTextColor='#9CA3AF'
                    value = {value}
                    onBlur={onBlur}
                    onChangeText={onChange}/>
                </View>
                )}
            />

            </View>
            </View>
        </Modal>
        </View>
        <View style={{position: 'absolute', bottom: 750, height: 1, backgroundColor: "white", width: '100%', marginTop: 2}} />
        <Text style={{color: 'blue'}} onPress={() => Linking.openURL('https://google.com')}>Google</Text>
        <View style={{position: 'absolute', bottom: 100, height: 1, backgroundColor: "white", width: '100%', marginBottom: 10}} />
        <Text style={[stylist.title, {marginTop: 620}]}>Financial</Text>
        <Text style={stylist.title}>Hub</Text>
    </SafeAreaView>
  )
}

const stylist = StyleSheet.create({
  CenterPopUp : {
    flex: 1,
    alignItems: 'center',
    alignContent: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center'
  },
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
    urlSign: {
        borderRadius: 10,
        width: '50%',
        height: 45,
        color: '#FFFFFF',
        opacity: 1
    },
    TextBox: {
        borderRadius : 2,
        width: '80%',
        height: 90,
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
