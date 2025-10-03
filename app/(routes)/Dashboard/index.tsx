import { MaterialCommunityIcons } from "@expo/vector-icons";
import { router, useLocalSearchParams } from 'expo-router';
import React, { useEffect } from 'react';
import { Controller, useForm } from "react-hook-form";
import { Image, Modal, Pressable, ScrollView, StyleSheet, Text, TextInput, TouchableWithoutFeedback, View } from 'react-native';
import RNUrlPreview from 'react-native-preview-url';
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
    const [confirmURL, URLdelPop] = React.useState(false);
    const [selectedURL, URLselected] = React.useState(null);
    const [boxState, addButtonPressed] = React.useState(false);

    const urlForm = useForm<urlInput>({
        mode: "onChange",
        defaultValues: {url: "",}
    });

    useEffect(() => {
        pullURLs();
    }, []);

    const deleteURLs = async() => {
        const apiurl = "http://192.168.0.15:8080/api/beta/feed/delUrl"
        let response = await fetch(apiurl, {
            method: 'DELETE',
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({url: selectedURL}) }
        )
        if (response.ok) {
            console.log("yes");
            URLdelPop(false);
            pullURLs();
        }
    };

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
    const NewsFeed = () => {
        router.replace({pathname: "/(routes)/TopNews", 
            params: {username: username}
        });
    }

    const Bookmarked = () => {
        router.replace({pathname: "/(routes)/Bookmarked",
            params: {username: username}
        });
    }

  return (
    <SafeAreaView style={stylist.container}>
      <Image    
              source={require("@/assets/onboarding/onboarding.jpg")}
              style={stylist.OnboardPage} />
        <View style={{flexDirection:'row', alignItems: 'center'}}>
        <Text style={[stylist.feedtitleH, {marginTop: 30}, {fontSize: 25},{marginLeft: 120}]}>Your Links</Text>
        <View style={{position: 'absolute',top: 80, height: 1, backgroundColor: "#1e1e1e", width: '100%', marginBottom: 10, zIndex: 1}}/>
        <Pressable onPress={() => addButtonPressed(true)}>
            <View style={[{marginLeft: 60}]}>
            <MaterialCommunityIcons
                name="tab-plus"
                size={50}
                color="#1e1e1e"
            />
            </View>
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
            </View>
            </View>
        </Modal>
        <Modal animationType='slide' transparent={true} visible={confirmURL} >
            <View style= {stylist.CenterPopUp}>
            <View style={[stylist.TextBox]}>
            <Text style={[stylist.feedtitle, {marginTop: 30}]}>Delete Link?</Text>
            <View style={{flexDirection:'row', alignItems: 'center'}}>
            <Pressable style={[stylist.submitButton, {marginTop: 0}]} onPress={deleteURLs}>
                <Text style={stylist.submitTextSign}>Confirm</Text>
            </Pressable>
            <Pressable style={[stylist.cancelButton, {marginTop: 0}]} onPress={() => URLdelPop(false)}>
                <Text style={[stylist.submitTextSign]}>cancel</Text>
            </Pressable>
            </View>
            </View>
            <View>
            </View>
            </View>
        </Modal>
        </View>
        <ScrollView>
        <View style={stylist.CenterPopUp}>
            { urllist.map((item, index) => {if (item == "") return null; return (
                // @ts-ignore
                <TouchableWithoutFeedback key={index} onLongPress={()=> {
                    URLdelPop(true)
                    URLselected(item)}}>
                <View>
                <RNUrlPreview url={item}
                containerStyle={{width: '95%', backgroundColor: '#1e1e1e', marginTop: 20 }}
                titleStyle={{color: '#FFFF', fontFamily: 'inter'}}
                descriptionStyle={{color: '#FFFF', opacity: 0.7, fontFamily: 'inter'}}
                />
                </View>
                </TouchableWithoutFeedback>
                )})
                }
        </View>
        </ScrollView>
        <View style={{position: 'absolute', bottom: 100, height: 1, backgroundColor: "#1e1e1e", width: '100%', marginBottom: 10}} />
            <View style={[stylist.blob]}>
            <View style={{flexDirection: 'row', justifyContent: 'space-around', alignItems: "center", marginTop: 20}}>
            <Pressable onPress={NewsFeed}>
                <MaterialCommunityIcons
                    name= "newspaper-variant-multiple"
                    size={40}
                    color="#1e1e1e"
                    style={{alignItems: "center"}}
                    />
                <Text style={[stylist.feedtitle]}>Feed</Text>
            </Pressable>
            <Pressable onPress={Bookmarked} style={{alignItems: "center", flex: 0.7}}>
                <MaterialCommunityIcons
                    name= "bookmark"
                    size={40}
                    color="#1e1e1e"
                    style={{alignItems: "center"}}
                    />
            <Text style={[stylist.feedtitle]}>Saved</Text>
            </Pressable>
            <View style={{alignItems: "center"}}>
                <MaterialCommunityIcons
                    name= "link-variant"
                    size={40}
                    color="#FFFF"
                />
            <Text style={[stylist.feedtitle]}>Links</Text>
            </View>
            </View>
            </View>
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
        fontSize: 15,
        color: '#FFFFFF',
        marginBottom: 10,
        textAlign: 'center',
        fontFamily : 'inter',
        fontWeight: 'bold',
        flexWrap: 'wrap',
    }, 
    feedtitleH : {
        fontSize: 25,
        color: '#FFFFFF',
        marginBottom: 10,
        textAlign: 'center',
        fontFamily : 'inter',
        fontWeight: 'bold',
    }, 
    buttonSign: {
        width: '30%',
        height: 45,
        backgroundColor : '#1e1e1e',
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
        fontFamily : 'inter',
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
        backgroundColor : '#1e1e1e',
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
        fontFamily : 'inter',
    },
        cancelButton: {
        width: '30%',
        height: 45,
        backgroundColor : '#1e1e1e',
        marginTop: 30,
        marginBottom: 40,
        marginLeft: 10,
        borderRadius: 10,
        overflow: 'hidden',
        justifyContent: "center",
        alignItems: "center",
    },
    blob: {
        width: '100%',
        backgroundColor: '#0000',
        height: 77,
        alignItems: "center"
    }
}) 
