import { router } from 'expo-router';
import React from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function OnboardingScreen() {
    const getStarted = () => {
        router.replace("/(routes)/login");
    };
    return <View style ={styles.container}>
        <Image 
            source = {require("@/assets/onboarding/onboarding.jpg")}
            style={styles.OnboardPage}
        />
         <View style= {styles.contentContainer}>
            <Text style={styles.title}>Financial</Text>
            <Text style={styles.title}>Hub</Text>
            <Text style={styles.subtitle}>At your fingertips</Text>
            <TouchableOpacity style={styles.button} onPress={getStarted}>
                <Text style={styles.buttonText}>Get Started</Text>
            </TouchableOpacity>
         </View>
        </View>;
} // esefe

const styles = StyleSheet.create({
    container : {   
        flex: 1,
    },
    OnboardPage : {
        width: '100%',
        height: '100%',
        resizeMode: 'cover',
          position: 'absolute'
    },
    contentContainer : {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        paddingBottom: 50,
        paddingTop: 50,
        paddingHorizontal: 20,
        zIndex : 1
    },
    title : {
        fontSize: 40,
        fontWeight: 'bold',
        color: '#FFFFFF',
        marginBottom: 10,
        textAlign: 'center',
        fontFamily : 'inter',
    },
    subtitle : {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#FFFFFF',
        marginBottom: 10,
        textAlign: 'center',
        opacity : 0.7,
        fontFamily : 'inter',
    },
    button: {
        width: '70%',
        height: 50,
        backgroundColor : '#8B0000',
        marginTop: 200,
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

});

