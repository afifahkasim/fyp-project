import React, { useState, useContext } from 'react';
import {
    Text,
    TouchableOpacity,
    View, ImageBackground, TextInput, LogBox, StyleSheet,
    Image,
    ScrollView,
    Dimensions
} from 'react-native';
import { globalStyles } from '../styles/global';
import CenterButton from "../shared/buttonCenter";
import { Formik } from 'formik';
import * as yup from 'yup';
import Apikey from "../database/apiKey";
import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';
import {
    LineChart,
     BarChart,
     PieChart,
     ProgressChart,
     ContributionGraph,
     StackedBarChart
   } from "react-native-chart-kit";
import { AuthContext } from "../routes/authProvider";
import Card from '../shared/card';
import { FontAwesome } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';

//check if firebase not init,so init from config file
if (!firebase.apps.length) { firebase.initializeApp(Apikey.firebaseConfig); }

const db = firebase.firestore();
LogBox.ignoreLogs(['Setting a timer for a long period of time'])


export default function myDashboard({ navigation }) {
    const { user, Logout, profile } = useContext(AuthContext);

    const pressEditProfile = () => {
        navigation.navigate('EditProfile')
    }

    // const line = {
    //     labels: ['January', 'February', 'March', 'April', 'May', 'June'],
    //     datasets: [
    //       {
    //         data: [20, 45, 28, 80, 99, 43],
    //         strokeWidth: 2, // optional
    //       },
    //     ],
    //   };

    //   return (
    //     <View style={globalStyles.container}>
    //         <View style={globalStyles.containerCenter}>
    //             <Text style={globalStyles.textSubtitle}>
    //                 Welcome {user.uid}!
    //             </Text>
    //             <CenterButton text='Logout' onPress={() => Logout()} />
    //             <CenterButton text='Edit Profile' onPress={() => Logout()} />
    //         </View>    
    //     </View>
    //      )

    return (

        <View style={globalStyles.container}>

  <Text>
    Bezier Line Chart
  </Text>
  {/* <Card>
  <LineChart
    data={line}
    width={Dimensions.get('window').width} // from react-native
    height={220}
    yAxisLabel={'$'}
    chartConfig={{
      backgroundColor: '#e26a00',
      backgroundGradientFrom: '#fb8c00',
      backgroundGradientTo: '#ffa726',
      decimalPlaces: 2, // optional, defaults to 2dp
      color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
      style: {
        borderRadius: 16
      }
    }}
    bezier
    style={{
      marginVertical: 1,
      borderRadius: 8
    }}
  />
  </Card> */}

        </View>
    );


}


const styles = StyleSheet.create({
    header: {
        backgroundColor: "#C4C4C4",
        height: 160,
        borderBottomLeftRadius: 500,
        borderBottomRightRadius: 500,
        transform: [{ scaleX: 1.5 }]
    },
    welcome: {
        transform: [{ scaleX: 1.0 }, { scaleY: 1.5 }],
        fontFamily: 'nunito-regular',
        fontSize: 12,
        alignSelf: 'center',
        textAlign: 'center',
        padding: 40,
    },
    avatar: {
        width: 110,
        height: 110,
        borderRadius: 63,
        borderWidth: 4,
        borderColor: "white",
        marginBottom: 10,
        alignSelf: 'center',
        position: 'absolute',
        marginTop: 100
    },
});

const image = require("../assets/registerPage/backgroundLogin.png");