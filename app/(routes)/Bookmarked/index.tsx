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
    const [articles, setarticles] = React.useState([])

    const NewsFeed = () => {
            router.replace({pathname: "/(routes)/TopNews", 
                params: {username: username}
            });
        }

    const Home = ()=> {
        router.replace({pathname: "/(routes)/Dashboard",
            params: {username: username}
        });
    }

    
     useEffect(() => {
        getSavedArticles();
    }, []);

    const getSavedArticles = async() => {
        console.log("yes")
        const url = `http://192.168.0.15:8080/api/beta/Savearticles/getArty?username=${username}`;
        const response = await fetch(url, {method: 'POST',
            headers: {"Content-type": "application/json"},
        });
        if (response.ok) {
            console.log("nice")
            const articles = await response.json()
            setarticles(articles)
            setTitle(articles.map((article: any) => article.title))
            setImage(articles.map((article: any) => article.imageURL))
            setContent(articles.map((article: any) => article.contents))
            setSources(articles.map((article: any) => article.sources))
            setByLine(articles.map((article: any) => article.byLine))
            console.log(Title)
           
        }
        else{
            console.log("oh no")
        }
    };

    const Article = (articleIndex: number) => {
        router.push({pathname: "/(routes)/Article" as any,
            params: {
                imageUrl: imageUrl[articleIndex], 
                Content: Content[articleIndex], 
                Title: Title[articleIndex], 
                idx: articleIndex,
                byLine: byLine[articleIndex],
                username: username,
                sources: sources}
        });
        }
   
  return (
    <SafeAreaView style={[stylist.container]}>
        <Image    
          source={require("@/assets/onboarding/onboarding.jpg")}
          style={stylist.OnboardPage} />

        <Text style={[stylist.feedtitleH, {marginTop: 30}, {fontSize: 25}]}>Saved Articles</Text>
        <View style={{position: 'absolute',top: 120, height: 1, backgroundColor: "#1e1e1e", width: '100%', marginBottom: 20, zIndex: 1}}/>
        <ScrollView >
        {Title.map((item1, index1) => { if (index1==0) return null;
            return (
            <TouchableOpacity onPress={() => {setIdx(index1); Article(index1);}} key={index1}>
            <View style={stylist.articleContainer}>
                <View style={[stylist.CenterPopUp, {flexDirection:'row'}]}>
                    <Image source={{uri: imageUrl[index1]}}
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
        <View style={{position: 'absolute', bottom: 100, height: 1, backgroundColor: "#1e1e1e", width: '100%'}}/>
        <View style={{position: 'absolute', bottom: 0, width: '100%'}}>
        <View style={{flexDirection: 'row', justifyContent: 'space-around',alignItems: "center", paddingBottom: 20}}>
        <Pressable onPress={NewsFeed} style={{alignItems: "center"}}>
        <MaterialCommunityIcons
            name= "newspaper-variant-multiple"
            size={40}
            color="#1e1e1e"
            style={{alignItems: "center"}}
            />
        <Text style={[stylist.feedtitle]}>Feed</Text>
        </Pressable>
        <View style={{alignItems: "center"}}>
        <MaterialCommunityIcons
            name= "bookmark"
            size={40}
            color="#FFFF"
            style={{alignItems: "center"}}
            />
        <Text style={[stylist.feedtitle]}>Saved</Text>
        </View>
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