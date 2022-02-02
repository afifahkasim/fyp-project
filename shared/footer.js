import React from 'react';
import { Dimensions, StyleSheet, Text, View } from 'react-native';
import { Icon } from 'react-native-elements';

export default function Footer({a, b}) {
    
    return (
        <View style={style.buttomNavCont}>
            <View style={style.buttonNavHome}>
                <Icon
                    name='home'
                    type='font-awesome-5'
                    color='steelblue'
                    size={20}
                    onPress={a}
                />
            </View>

            <View style={style.buttonNav}>
                <Icon
                    solid
                    name='user'
                    type='font-awesome-5'
                    color='steelblue'
                    size={20}
                    onPress={b}
                />
            </View>


            <View style={style.buttonNav}>
                <Icon
                    name='cog'
                    type='font-awesome-5'
                    color='steelblue'
                    size={20}
                //onPress={press}
                />
            </View>
        </View>
    )
}

const style = StyleSheet.create({
    buttomNavCont: {
        height: 60,
        backgroundColor: 'white',
        flexDirection: 'row',
        borderTopRightRadius: 20,
        borderTopLeftRadius: 20,
        position: 'absolute',
        bottom: 0,
        width: "100%"
    },
    buttonNavHome: {
        marginLeft: "50%",
        alignSelf: 'center'
    },

    buttonNav: {
        marginLeft: "12.5%",
        alignSelf: 'center'
    },
})

