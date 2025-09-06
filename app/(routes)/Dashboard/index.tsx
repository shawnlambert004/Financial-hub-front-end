import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

export default function Dashboard() {
  return (
    <View>
        <Text style={stylist.title}> Dashboard Hello </Text>
    </View>
  )

}

    const stylist = StyleSheet.create({
    title: {
        fontFamily : 'NewsReader',
        fontSize: 20,
        color: '#000000',
        marginBottom: 10,
        textAlign: 'center',
    }
  })
