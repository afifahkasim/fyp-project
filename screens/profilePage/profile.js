import React, { useState, useContext } from 'react';
import {
  Text,
  TouchableOpacity,
  View, ImageBackground, TextInput, LogBox, StyleSheet,
  Image,
  ScrollView
} from 'react-native';
import { globalStyles } from '../../styles/global';
import CenterButton from "../../shared/buttonCenter";
import BlueButton from "../../shared/buttonBlue";
import { Formik } from 'formik';
import * as yup from 'yup';
import Apikey from "../../database/apiKey";
import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';
import { AuthContext } from "../../routes/authProvider";
import Card from '../../shared/card';
import { FontAwesome } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import Header from '../../shared/header';
import ProfileCard from '../../shared/cardProfile';
import ProfileCard2 from '../../shared/cardProfile2';
import LineDivider from '../../shared/lineDivider';


//check if firebase not init,so init from config file
if (!firebase.apps.length) { firebase.initializeApp(Apikey.firebaseConfig); }

const db = firebase.firestore();
LogBox.ignoreLogs(['Setting a timer for a long period of time'])


export default function Profile({ navigation }) {
  const { user, Logout, profile } = useContext(AuthContext);

  const pressEditProfile = () => {
    navigation.navigate('EditProfile')
  }

  const pressResetPassword = () => {
    navigation.navigate('ResetPassword')
  }

  const pressSubmitFeedback = () => {
    navigation.navigate('SubmitFeedback')
  }

  function renderProfileCard() {
    return (
      <View
        style={{
          flexDirection: 'row',
          marginTop: 24,
          paddingHorizontal: 12,
          paddingVertical: 20,
          borderRadius: 12,
          backgroundColor: '#6F8FAF'
        }}
      >

        {/* Profile Image */}
        <TouchableOpacity
          style={{
            width: 80,
            height: 80
          }}

          onPress={pressEditProfile}
        >
          <Image
            source={{ uri: profile.profilepic }}
            style={{
              width: "100%",
              height: "100%",
              borderRadius: 40,
              borderWidth: 1,
              borderColor: "#FFFFFF",
            }} />

          <View
            style={{
              position: 'absolute',
              width: "100%",
              height: "100%",
              alignItems: 'center',
              justifyContent: 'flex-end'
            }}
          >

            <View
              style={{
                width: 30,
                height: 30,
                marginBottom: -15,
                alignItems: 'center',
                justifyContent: 'center',
                borderRadius: 15,
                backgroundColor: '#6F8FAF',
              }}
            >

              <Image
                source={add_picture}
                resizeMode="contain"
                style={{
                  width: 30,
                  height: 30
                }}
              />
            </View>

          </View>

        </TouchableOpacity>

        {/* Details */}
        <View
          style={{
            flex: 1,
            marginLeft: 12,
            alignItems: 'flex-start'
          }}
        >
          <Text
            style={{
              color: "#FFFFFF",
              fontFamily: "nunito-bold", fontSize: 22, lineHeight: 30
            }}
          >
            {profile.name}
          </Text>

          <Text
            style={{
              color: "#FFFFFF",
              fontFamily: "nunito-regular", fontSize: 14, lineHeight: 22
            }}
          >
            {profile.gender}{"\n"}
            Currently in {profile.semester}
          </Text>
        </View>

      </View>
    )
  }

  // Section 1: Name, Email, Matrics ID, Department, Intake Session
  function renderProfileSection1() {
    return (
      <View
        style={styles.profileSectionContainer}
      >
        <ProfileCard
          icon={profile_icon}
          label="Name"
          value={profile.name}
        />

        <LineDivider />
        <ProfileCard
          icon={email}
          label="Email"
          value={profile.email}
        />

        <LineDivider />
        <ProfileCard
          icon={matrics_id}
          label="Matrics ID"
          value={profile.matricsid}
        />

        <LineDivider />
        <ProfileCard
          icon={department}
          label="Department"
          value={profile.department}
        />

        <LineDivider />
        <ProfileCard
          icon={intake}
          label="Intake"
          value={profile.session}
        />
      </View>
    )
  }

  // Section 2: Edit Profile, Reset Password, Submit Feedback, Logout
  function renderProfileSection2() {
    return (
      <View
        style={styles.profileSectionContainer}
      >
        <ProfileCard2
          icon={edit_profile}
          value="Edit Profile"
          onPress={pressEditProfile}
        />

        <LineDivider />
        <ProfileCard2
          icon={reset_password}
          value="Reset Password"
          onPress={pressResetPassword}
        />

        <LineDivider />
        <ProfileCard2
          icon={submit_feedback}
          value="Submit Feedback"
          onPress={pressSubmitFeedback}
        />

        <LineDivider />
        <ProfileCard2
          icon={sign_out}
          value="Sign Out"
          onPress={() => Logout()}
        />


      </View>
    )
  }

  return (

    <View style={globalStyles.container}>
      <Header text="Profile" />
      <ScrollView
        contentContainerStyle={{
          paddingHorizontal: 24,
          paddingBottom: 150
        }}
      >
        {/* Profile Card */}
        {renderProfileCard()}

        {/* Profile Section 1 */}
        {renderProfileSection1()}

        {/* Profile Section 2 */}
        {renderProfileSection2()}

      </ScrollView>




      {/* <ScrollView>
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

            <BlueButton text='Edit Profile' onPress={pressEditProfile} />
            <BlueButton text='Logout' onPress={() => Logout()} />

          </View>
        </View>
      </ScrollView> */}
    </View>
  );


}


const styles = StyleSheet.create({
  profileSectionContainer: {
    marginTop: 24,
    paddingHorizontal: 24,
    borderWidth: 1,
    borderRadius: 12,
    borderColor: "#BEC1D2",
  },


  header: {
    backgroundColor: '#6F8FAF',
    height: 160,
    borderBottomLeftRadius: 500,
    borderBottomRightRadius: 500,
    shadowOffset: { width: 2, height: 2 },
    shadowColor: '#333',
    shadowOpacity: 0.9,
    shadowRadius: 5,
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
    marginTop: 100,
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

const image = require("../../assets/registerPage/backgroundLogin.png");
const add_picture = require("../../assets/icons/add-picture.png");
const department = require("../../assets/icons/department.png");
const edit_profile = require("../../assets/icons/edit-profile.png");
const email = require("../../assets/icons/email.png");
const intake = require("../../assets/icons/intake.png");
const matrics_id = require("../../assets/icons/matrics-id.png");
const profile_icon = require("../../assets/icons/profile.png");
const reset_password = require("../../assets/icons/reset-password.png");
const sign_out = require("../../assets/icons/sign-out.png");
const submit_feedback = require("../../assets/icons/submit-feedback.png");