import { MaterialCommunityIcons } from "@expo/vector-icons";
import { router } from 'expo-router';
import React, { useEffect } from 'react';
import { Image, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function index() {
    const [Des, setDes] = React.useState([])
    const [Title, setTitle] = React.useState([])
    const [imageUrl, setImage] = React.useState([])
    useEffect(() => {
            getArticles();
        }, []);

    const getArticles = async() => {
        const url = "http://192.168.0.15:8080/api/beta/articles/getArticles";
        let response = await fetch(url, {method: 'POST',
            headers: {"Content-Type": "application/json"}},
        )
        if (response.ok) {
            const data = await response.json()
            setDes(data.description)
            setTitle(data.title)
            setImage(data.imageUrl)
            return data
        }
    }
    const Home = async() => {
        router.back()
    }
  return (
    <SafeAreaView style={stylist.container}>
          <Image    
                  source={require("@/assets/onboarding/onboarding.jpg")}
                  style={stylist.OnboardPage} />
            <View style={{flexDirection:'row', alignItems: 'center'}}> </View>
            <Text style={[stylist.feedtitleH, {marginTop: 30}]}>Headlines</Text>
            <View style={{position: 'absolute',top: 120, height: 1, backgroundColor: "white", width: '100%', marginBottom: 10}}/>
            <ScrollView>
                {Title.map((item1, index1) => (
                <View key={index1}>
                    <Text style={[stylist.feedtitle, {marginTop:20}]}>{item1}</Text>
                    <View style={[stylist.CenterPopUp, {flexDirection:'row'}]}>
                        <Image source={{uri: imageUrl[index1]}}
                                style={{width: 150, height: 100, marginLeft: 20}}
                                resizeMode="cover"/>
                        <Text key={index1} style={[stylist.feedtitle, {fontSize: 15}, {flex: 1}, {opacity: 0.6}]} numberOfLines={4} ellipsizeMode="tail">
                            {Des[index1]}
                        </Text>
                        <View style={{position: 'absolute',bottom: 230, height: 1, backgroundColor: "white", width: '90%', marginBottom: 90, opacity: 0.6, marginTop: 10}}/>
                    </View>
                </View>
                ))}
            </ScrollView>
            <View style={{position: 'absolute',bottom: 100, height: 1, backgroundColor: "white", width: '100%', marginBottom: 10}}/>
            <View style={[stylist.blob]}>
        <View style={[{alignItems: 'center'}]}>
        <Pressable onPress={Home}>
        <MaterialCommunityIcons
                      name= "home-variant-outline"
                      size={60}
                      color="white"
                      style={{position: 'absolute', alignSelf: 'center', marginRight: 170}}
                      />
        </Pressable>
        </View>
        <View style={[{alignItems: 'center'}]}>
        <Pressable >
        <MaterialCommunityIcons
                      name= "newspaper-variant-multiple-outline"
                      size={60}
                      color="white"
                      style={{position: 'absolute', marginRight: 40}}
                      />
        </Pressable>
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
    feedtitle : {
        fontSize: 20,
        color: '#FFFFFF',
        marginBottom: 10,
        textAlign: 'center',
        fontFamily : 'Newsreader',
    }, 
    feedtitleH : {
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
    blob: {
        width: '100%',
        backgroundColor: '#0000',
        height: 77,
        alignItems: "center"
    },
})