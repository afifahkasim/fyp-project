import React, { useState, useContext } from 'react';
import {
  Text,
  TouchableOpacity,
  View, ImageBackground, TextInput, LogBox, StyleSheet,
  Image,
  ScrollView
} from 'react-native';
import { globalStyles } from '../styles/global';
import CenterButton from "../shared/buttonCenter";
import { Formik } from 'formik';
import * as yup from 'yup';
import Apikey from "../database/apiKey";
import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';
import { AuthContext } from "../routes/authProvider";
import Card from '../shared/card';
import { FontAwesome } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';

//check if firebase not init,so init from config file
if (!firebase.apps.length) { firebase.initializeApp(Apikey.firebaseConfig); }

const db = firebase.firestore();
LogBox.ignoreLogs(['Setting a timer for a long period of time'])


export default function Profile({ navigation }) {
  const { user, Logout, profile } = useContext(AuthContext);

  const pressEditProfile = () => {
    navigation.navigate('EditProfile')
  }

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
      <ScrollView>
        <View style={styles.header}>
          <Text style={styles.welcome}>Welcome,{"\n"}
            <Text style={{ fontFamily: 'nunito-bold', fontStyle: 'italic' }}>{profile.name}!</Text>
          </Text>
        </View>
        <Image style={styles.avatar} source={{ uri: profile.profilepic }} />
        <View style={styles.body}>
          <View style={styles.bodyContent}>

            <Card>
              <View style={{ flexDirection: 'row', paddingHorizontal: 6 }}>
                <FontAwesome name="user" size={32} color="black" />
                <Text style={styles.name}>{profile.name}</Text>
              </View>
            </Card>
            <Card>
              <View style={{ flexDirection: 'row' }}>
                <MaterialIcons name="email" size={30} color="black" />
                <Text style={styles.name}>{profile.email}</Text>
              </View>
            </Card>
            <Card>
              <View style={{ flexDirection: 'row', paddingLeft: 2 }}>
                <FontAwesome name="id-card" size={26} color="black" />
                <Text style={styles.name}>{profile.matricsid}</Text>
              </View>
            </Card>
            <Card>
              <View style={{ flexDirection: 'row', paddingLeft: 2 }}>
                {profile.gender == 'Male' ?
                  <MaterialCommunityIcons name="gender-male" size={28} color="black" /> :
                  <MaterialCommunityIcons name="gender-female" size={28} color="black" />
                }
                <Text style={styles.name}>{profile.gender}</Text>
              </View>
            </Card>
            <Card>
              <View style={{ flexDirection: 'row', paddingLeft: 2 }}>
                <MaterialCommunityIcons name="calendar-text-outline" size={28} color="black" />
                {profile.session != "" ?
                  <Text style={styles.name}>{profile.session} Intake</Text> :
                  <View></View>
                  }

              </View>
            </Card>
            <Card>
              <View style={{ flexDirection: 'row', paddingLeft: 2 }}>
                <MaterialCommunityIcons name="clock-time-three" size={28} color="black" />
                {profile.semester != "" ? 
                <Text style={styles.name}>Currently in {profile.semester}</Text> :
                <View></View>
                }
                
              </View>
            </Card>
            <Card>
              <View style={{ flexDirection: 'row', paddingLeft: 2 }}>
                <MaterialCommunityIcons name="home-group" size={28} color="black" />
                <Text style={styles.name}>{profile.department}</Text>
              </View>
            </Card>

            <CenterButton text='Edit Profile' onPress={pressEditProfile} />
            <CenterButton text='Logout' onPress={() => Logout()} />

          </View>
        </View>
      </ScrollView>
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
  body: {
    marginTop: 40,
  },
  bodyContent: {
    //flex: 1,
    //   alignItems: 'center',
    padding: 30,
  },
  bodyButton: {
    alignItems: 'center'
  },
  name: {
    fontSize: 20,
    color: "black",
    fontWeight: "600",
    fontFamily: "nunito-bold",
    paddingHorizontal: 15
  },
  info: {
    fontSize: 16,
    color: "#00BFFF",
    marginTop: 10
  },
  description: {
    fontSize: 16,
    color: "#696969",
    marginTop: 10,
    textAlign: 'center'
  },
  buttonContainer: {
    marginTop: 10,
    height: 45,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
    width: 250,
    borderRadius: 30,
    backgroundColor: "#00BFFF",
  },
});

const image = require("../assets/registerPage/backgroundLogin.png");
