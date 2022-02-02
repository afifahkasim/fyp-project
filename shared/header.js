import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native'

export default function Header({ text }) {

    const navigation = useNavigation();
    const pressHomepage = () => {
        navigation.navigate('Homepage')
      }

    return (
        <View style={styles.header}>
            <View style={{ flex: 1, alignItems: 'flex-start', paddingLeft: '7%'}}>
                <TouchableOpacity
                    style={{
                        flexDirection: 'row',
                        alignItems: 'center'
                    }}
                    onPress={() => navigation.goBack()}
                >
                    <Image
                        source={back_arrow}
                        resizeMode="contain"
                        style={{
                            width: 25,
                            height: 25,
                            tintColor: "black"
                        }}
                    />
                </TouchableOpacity>
            </View>

            <Text style={styles.headerText}>{text}</Text>

            <View style={{ flex: 1, alignItems: 'flex-end', paddingRight: '7%'}}>
                <TouchableOpacity
                    style={{
                        flexDirection: 'row',
                        alignItems: 'center'
                    }}
                    onPress={() => pressHomepage()}
                >
                    <Image
                        source={home}
                        resizeMode="contain"
                        style={{
                            width: 30,
                            height: 30,
                            tintColor: "black"
                        }}
                    />
                </TouchableOpacity>
            </View>
        </View>
    )
}

const back_arrow = require("../assets/icons/back-arrow.png");
const home = require("../assets/icons/home.png");

const styles = StyleSheet.create({
    header: {
        flexDirection: 'row',
        width: '100%',
        height: '13%',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#6F8FAF',
    },

    headerText: {
        fontFamily: 'nunito-bold',
        fontWeight: '900',
        fontSize: 22,
        color: "black"
    }

});