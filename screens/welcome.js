import React from 'react';
import { StyleSheet, Text, View, ImageBackground, Image } from 'react-native';
import { globalStyles } from "../styles/global";
import FlatButton from "../shared/button";

export default function Welcome({ navigation }) {

    const pressRegister = () => {
        navigation.navigate('Register')
    }

    const pressLogin = () => {
        navigation.navigate('Login')
    }

    return (
        <View style={globalStyles.container}>
        <ImageBackground source={image} style={globalStyles.image}>
          
          
          <View style={globalStyles.container}>
          <View style={globalStyles.containerSubtitles}>
            <Image source={logo} style={globalStyles.logo} />
            <Text style={globalStyles.textTitle}>Data-U</Text>
            <Text style={globalStyles.textSubtitle}>
              view your results, {"\n"}
              schedule your results, {"\n"}
              calculate your CGPA {"\n"}
            </Text>
          </View>
          </View>

          <View style={globalStyles.container}>
          <View style={globalStyles.containerButton}>
          <FlatButton text='Register' onPress={pressRegister} />
          <View style={globalStyles.gapBetweenButton}>
          <FlatButton text='Login' style={globalStyles.gapBetweenButton} onPress={pressLogin} />
          </View></View>
          </View>
          
        </ImageBackground>
  
      </View>
  
    )
}

const image = require("../assets/welcomePage/background.png");
const logo = require("../assets/welcomePage/logo.png");