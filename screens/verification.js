import React, { useState } from 'react';
import { StyleSheet, Text, View, ImageBackground, Image, TextInput } from 'react-native';
import { globalStyles } from '../styles/global';
import RegisterButton from "../shared/buttonRegister";
import SubtitleButton from "../shared/buttonSubtitle";

export default function Verification({ navigation }) {
    const pressLogin = () => {
        navigation.navigate('Login')
      }

  const [code, setCode] = useState();

    return (
        <View style={globalStyles.container}>
        <ImageBackground source={image} style={globalStyles.image}>
          <View style={globalStyles.containerVerification}>
            <Text style={globalStyles.textRegister}>Verification</Text>
            <TextInput 
              placeholder='Enter the code that was sent to your e-mail.'
              placeholderTextColor='lightgrey'
              style={globalStyles.inputRegister}
              onChangeText={(value) => setCode(value)} />

        <RegisterButton text='Verify' onPress={pressLogin} />
        <View style={{marginTop: 20}}></View>
        <SubtitleButton text1='Didnt receive the e-mail?' text2='Resend Code' onPress={pressLogin} />

      {/* <Text style={globalStyles.textSubtitle}>E-mail: {email}</Text> */}
          </View>

        </ImageBackground>
  
      </View>
  
    )
}

const image = require("../assets/registerPage/backgroundVerification.png");