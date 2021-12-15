import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

export default function Header({text}){
    return (
        <View style={styles.header}>
            <Text style={styles.headerText}>{text}</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    header: {
      width: '100%',
      height: '13%',
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: '#6F8FAF',
    },

    headerText: {
        paddingTop: '7%',
        fontFamily: 'nunito-bold',
        fontWeight: '900',
        fontSize: 20,
        color: "black"
    }

  });