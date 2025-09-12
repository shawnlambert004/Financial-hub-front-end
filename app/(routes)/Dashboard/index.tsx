import { LinkPreview } from '@flyerhq/react-native-link-preview';
import { useLocalSearchParams } from 'expo-router';
import React, { useEffect } from 'react';
import { Controller, useForm } from "react-hook-form";
import { Image, Modal, Pressable, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import tw from 'twrnc';

interface urlInput  {
        url: string;
    }

export default function Dashboard() {
    const params = useLocalSearchParams()
    const username = params.username;
    console.log("username from params, ", username);
    const [urllist, seturllist] = React.useState([]);

    const [boxState, addButtonPressed] = React.useState(false);

    const urlForm = useForm<urlInput>({
        mode: "onChange",
        defaultValues: {url: "",}
    });

    useEffect(() => {
        pullURLs();
    }, []);

    const pullURLs = async() => {
        const url = "http://192.168.0.15:8080/api/beta/user/getuserID"
        let response = await fetch(url, {
            method: 'POST',
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({username: username})
        });

        if (response.ok) {
            const userID = await response.text()
            const url1 = "http://192.168.0.15:8080/api/beta/feed/getUrl"
            let response2 = await fetch(url1, {
                method: 'POST',
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify({user_id: userID})
            })
        if (response2.ok) {
            const urllist = await response2.json()
            console.log(urllist)
            seturllist(urllist);
            return urllist
        }
        }
    };

    const submitURL = async() => {
        const url = urlForm.getValues();
        console.warn(url.url);
        const apiLink = "http://192.168.0.15:8080/api/beta/feed/addUrl"
        let response = await fetch(apiLink, {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({url: url.url, username: username})
            });

            const result = await response.json();
            if (result) {
                console.warn("nice");
                addButtonPressed(false);
                pullURLs();
            }
            else{
                console.warn("error");
            }
        };

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
                <TextInput style={[tw `flex-1 ml-3`, {color: '#ffff', fontFamily: 'NewsReader', height: 40, borderWidth: 1, borderColor: '#ffff', borderRadius: 2, marginTop: 20}]}
                    placeholder='https://'
                    placeholderTextColor='#9CA3AF'
                    value = {value}
                    onBlur={onBlur}
                    onChangeText={onChange}/>
                </View>
                )}
            />
            <View style={{flexDirection:'row', alignItems: 'center'}}>
            <Pressable style={[stylist.submitButton]} onPress={submitURL}>
                <Text style={stylist.submitTextSign}>Submit</Text>
            </Pressable>
            <Pressable style={stylist.cancelButton} onPress={() => addButtonPressed(false)}>
                <Text style={stylist.submitTextSign}>cancel</Text>
            </Pressable>
            </View>
            <View>
            </View>
            </View>
            </View>
        </Modal>
        </View>
        <View style={{position: 'absolute', bottom: 750, height: 1, backgroundColor: "white", width: '100%', marginBottom: 10}} />
        <ScrollView>
        <View>
            { urllist.map((item, index) => (<View key={index}>
                <View style={{marginBottom: 80, height: 100, width: 200, marginLeft: 30}}>
                <LinkPreview
                text = {item} 
                containerStyle ={{flex: 0.5, padding: 5, borderRadius: 10}}
                />
                </View>
                </View>))}
        </View>
        </ScrollView>
        <View style={{position: 'absolute', bottom: 100, height: 1, backgroundColor: "white", width: '100%', marginBottom: 10}} />
        <Text style={[stylist.title, {position: 'absolute', bottom: 60, left: 160}]}>Financial</Text>
        <Text style={[stylist.title, {position: 'absolute', bottom: 30, left: 190}]}>Hub</Text>
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
    submitButton: {
        width: '30%',
        height: 45,
        backgroundColor : '#8B0000',
        marginTop: 30,
        marginBottom: 40,
        marginLeft: 10,
        borderRadius: 10,
        overflow: 'hidden',
        justifyContent: "center",
        alignItems: "center",
    },
    submitTextSign: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#FFFFFF',
        textAlign: 'center',
        opacity : 1,
        fontFamily : 'Newsreader',
    },
        cancelButton: {
        width: '30%',
        height: 45,
        backgroundColor : '#8B0000',
        marginTop: 30,
        marginBottom: 40,
        marginLeft: 10,
        borderRadius: 10,
        overflow: 'hidden',
        justifyContent: "center",
        alignItems: "center",
    },
})
