import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

export default function HomepageHeader({text}){
    return (
        <View style={styles.header}>
            <Text style={styles.headerText}>{text}</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    header: {
        backgroundColor: 'steelblue',           //style for the header
        height: 120,
        borderBottomLeftRadius: 0,
        borderBottomRightRadius: 70,
        tintColor: 'mintcream'
    },

    headerText: {
        paddingLeft: 30,
        paddingTop: '15%',
        fontFamily: 'nunito-bold',
        fontWeight: '900',
        fontSize: 20,
        color: "white"
    }

  });
