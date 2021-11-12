import React, { useState, useContext } from 'react';
import { Text, View, ImageBackground, TextInput, LogBox } from 'react-native';
import { globalStyles } from '../styles/global';
import { Formik } from 'formik';
import * as yup from 'yup';
import 'firebase/compat/firestore';
import { AuthContext } from "../routes/authProvider";
import CenterButton from "../shared/buttonCenter";

LogBox.ignoreLogs(['Setting a timer for a long period of time'])

export default function Homepage({ navigation }) {
    // const {SubmitProfile} = useContext(AuthContext)
    const {user, profile, Logout} = useContext(AuthContext);    
  
    const pressProfile = () => {
      navigation.navigate('Profile')
    }

    const pressGroup = () => {
      navigation.navigate('Group')
    }

    const pressDashboard = () => {
      navigation.navigate('MyDashboard')
    }
  
      return (
          <View style={globalStyles.container}>
            <View style={globalStyles.containerCenter}>
                <Text style={globalStyles.textSubtitle, {alignSelf: 'center'}}>
                    Welcome to Data-U! This is the home page.
                </Text>
                <CenterButton text='Profile' onPress={pressProfile} />
                <CenterButton text='Group' onPress={pressGroup} />
                <CenterButton text='My Dashboard' onPress={pressDashboard} />
                <CenterButton text='Group Dashboard'/>
                <CenterButton text='Submit Feedback' />
            </View>    
        </View>
    
      )
  }

  const image = require("../assets/homePage/background.png");