import { MaterialCommunityIcons } from "@expo/vector-icons";
import { router, useLocalSearchParams } from 'expo-router';
import React, { useEffect } from 'react';
import { Image, Pressable, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function index() {
    const params = useLocalSearchParams()
    const username = params.username;
    console.log("username from params, ", username);
    const [Title, setTitle] = React.useState([])
    const [imageUrl, setImage] = React.useState([])
    const [Content, setContent] = React.useState([])
    const [idx, setIdx] = React.useState(0)
    const [sources, setSources] = React.useState([])
    const [byLine, setByLine] = React.useState([])
    const [bigImg, setBigImg] = React.useState([])
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
            setTitle(data.title)
            setImage(data.imageUrl)
            setContent(data.contents)
            setSources(data.sources)
            setByLine(data.byLine)
            setBigImg(data.bigImUrls)
            console.log(bigImg)
            return data
        }
    }
    const Home = ()=> {
        router.replace({pathname: "/(routes)/Dashboard",
            params: {username: username}
        });
    }

    const Bookmarked = () => {
    router.replace({pathname: "/(routes)/Bookmarked",
        params: {username: username}
    });
    }

    const Article = (articleIndex: number) => {
        router.push({pathname: "/(routes)/Article" as any,
            params: {
                imageUrl: imageUrl[articleIndex], 
                Content: Content[articleIndex], 
                Title: Title[articleIndex], 
                idx: articleIndex,
                byLine: byLine[articleIndex],
                username: username,
                sources: sources[articleIndex],
                bigImg: bigImg[articleIndex]
            }
        });
    }
  return (
    <SafeAreaView style={[stylist.container]}>
          <Image    
                  source={require("@/assets/onboarding/onboarding.jpg")}
                  style={stylist.OnboardPage} />
 
            <Text style={[stylist.feedtitleH, {marginTop: 30}, {fontSize: 25}]}>Top Stories</Text>
            <View style={{position: 'absolute',top: 120, height: 1, backgroundColor: "#1e1e1e", width: '100%', marginBottom: 20, zIndex: 1}}/>
            <ScrollView >
                <TouchableOpacity onPress={() => {setIdx(0); Article(0);}}>
                <View style={{position: 'relative'}}>
                <Image source={{uri: bigImg[0]}}
                    style={{flex: 1, width: '100%', height: 240, borderRadius: 7, marginTop: 20, opacity: 0.7}}
                    resizeMode="cover"/>
                <View style={[stylist.CenterPopUp, {flexDirection:'row'}]}>
                    <View style={{position: 'absolute', bottom: 40, marginRight: 170, marginBottom: 10, right: 10}}>
                        <Text style={[stylist.feedtitle, {fontWeight: "bold"}]}>{sources[0]}</Text>
                    </View>
                    <View style={{position: 'absolute', bottom: 10, left: 10, right: 40}} >
                        <Text style={[stylist.feedtitle, {fontWeight: "bold"}, {flexWrap: 'wrap'}]} numberOfLines={3} ellipsizeMode="tail">{Title[0]}</Text>
                    </View>
                </View>
                </View>
                </TouchableOpacity>
                <View style={{alignItems: 'center'}}>
                <View style={{height: 1, backgroundColor: "#FFFF", width: '90%', opacity: 0.7, marginTop: 20}}/>
                </View>
                {Title.map((item1, index1) => { if (index1==0) return null;
                return (
                <TouchableOpacity onPress={() => {setIdx(index1); Article(index1);}} key={index1}>
                <View style={stylist.articleContainer}>
                    <View style={[stylist.CenterPopUp, {flexDirection:'row'}]}>
                        <Image source={{uri: bigImg[index1]}}
                                style={{width: 150, height: 80, borderRadius: 7}}
                                resizeMode="cover"/>
                        <View style={{flex: 1}} >
                         <Text style={[stylist.feedtitle, {flexWrap: 'wrap'}]} numberOfLines={4} ellipsizeMode="tail">{item1}</Text>
                         <Text style={[stylist.feedtitle, {opacity: 0.7}]}>{sources[index1]}</Text>
                        </View>
                    </View>
                </View>
                    <View style={{alignItems: 'center'}}>
                    <View style={{height: 1, backgroundColor: "#FFFF", width: '80%', opacity: 0.1}}/>
                    </View>
                </TouchableOpacity>
                );
                })}
            </ScrollView>
            <View style={{position: 'absolute',bottom: 100, height: 1, backgroundColor: "#1e1e1e", width: '100%', marginBottom: 10}}/>
            <View style={[stylist.blob]}>
        <View style={{flexDirection: 'row', justifyContent: 'space-around',alignItems: "center", marginTop: 20}}>
        <View style={{alignItems: "center"}}>
        <MaterialCommunityIcons
            name= "newspaper-variant-multiple"
            size={40}
            color="white"
            style={{alignItems: "center"}}
            />
        <Text style={[stylist.feedtitle]}>Feed</Text>
        </View>
        <Pressable onPress={Bookmarked} style={{flex: 0.7, alignItems: "center"}}>
        <MaterialCommunityIcons
            name= "bookmark"
            size={40}
            color="#1e1e1e"
            style={{alignItems: "center"}}
            />
        <Text style={[stylist.feedtitle]}>Saved</Text>
        </Pressable>
        <Pressable onPress={Home} style={{alignItems: "center"}}>
        <MaterialCommunityIcons
                      name= "link-variant"
                      size={40}
                      color="#1e1e1e"
                      />
        <Text style={[stylist.feedtitle]}>Links</Text>
        </Pressable>
        </View>
        </View>
    </SafeAreaView>
    )
}

const stylist = StyleSheet.create({
  CenterPopUp : {
    flex: 1,
    backgroundColor: '#0000'
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
        fontSize: 15,
        color: '#FFFFFF',
        marginBottom: 10,
        textAlign: 'center',
        fontFamily : 'inter',
        fontWeight: 'bold',
        flexWrap: 'wrap',
    }, 
    feedtitleH : {
        fontSize: 15,
        color: '#FFFFFF',
        marginBottom: 10,
        textAlign: 'center',
        fontFamily : 'inter',
        fontWeight: 'bold',
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
    articleContainer: {
        margin: 8,
        padding: 15, 
        borderRadius: 16,
        borderWidth: 1,
        borderColor: '#0000',
        backgroundColor: '#0000'
    }
})