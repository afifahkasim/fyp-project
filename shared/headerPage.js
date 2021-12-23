import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

export default function PageHeader({text}){
    return (
        <View style={styles.header}>
            <Text style={styles.headerText}>{text}</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    header: {
        backgroundColor: 'steelblue',           //style for the header
        height: 90,
        borderBottomLeftRadius: 0,
        borderBottomRightRadius: 40,
        tintColor: 'mintcream'
    },

    headerText: {
        paddingLeft: 10,
        paddingTop: '7%',
        fontFamily: 'nunito-bold',
        fontWeight: '900',
        fontSize: 20,
        color: "black"
    }

  });