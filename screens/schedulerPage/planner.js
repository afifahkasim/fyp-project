import React,{useState, useContext}  from 'react';
import { Icon } from 'react-native-elements';
import Apikey from "../../database/apiKey";
import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';
import { AuthContext } from "../../routes/authProvider";
import Header from '../../shared/header';
import { StyleSheet, 
    Text, 
    View, 
    LogBox,
    Pressable
   
  } from 'react-native';

  if (!firebase.apps.length) { firebase.initializeApp(Apikey.firebaseConfig); }

  const db = firebase.firestore();
  LogBox.ignoreLogs(['Setting a timer for a long period of time'])

  export default function Planner({navigation}){

    const { user, Logout, profile } = useContext(AuthContext);
  
    const pressISPlanner = () => {  
      navigation.navigate('ISPlanner');  
    }
    const pressNetworkPlanner = () => {  
      navigation.navigate('NetworkPlanner');  
    }
    const pressDSPlanner = () => {  
      navigation.navigate('DSPlanner');  
    }
    const pressAIPlanner = () => {  
      navigation.navigate('AIPlanner');  
    }
    const pressMULPlanner = () => {  
      navigation.navigate('MULPlanner');  
    }
    const pressSEPlanner = () => {  
      navigation.navigate('SEPlanner');  
    }


      return(
       
    <View style={{flex:1}}>
            <Header text="Course Planner" />
            <View style={{marginBottom:20, marginLeft:20, marginTop:10}}>
                <Text>Course Planner: 2020/2021 </Text>
            </View>

            
        <Pressable onPress={pressISPlanner}>
              <View style={style.buttonMC}>
                <Text style={style.buttonText}>Information systems</Text>
              </View>
        </Pressable>

        <Pressable onPress={pressNetworkPlanner}>
              <View style={style.buttonMC}>
                <Text style={style.buttonText}>Computer system and network</Text>
              </View>
        </Pressable>
        <Pressable onPress={pressDSPlanner}>
              <View style={style.buttonMC}>
                <Text style={style.buttonText}>Data Science</Text>
              </View>
        </Pressable>

        <Pressable onPress={pressAIPlanner}>
              <View style={style.buttonMC}>
                <Text style={style.buttonText}>Artificial Intelligence</Text>
              </View>
        </Pressable>

        <Pressable onPress={pressMULPlanner}>
              <View style={style.buttonMC}>
                <Text style={style.buttonText}>Multimedia</Text>
              </View>
        </Pressable>

        <Pressable onPress={pressSEPlanner}>
              <View style={style.buttonMC}>
                <Text style={style.buttonText}>Software Engineering</Text>
              </View>
        </Pressable>

    </View>
  
      )
  };

  const style = StyleSheet.create({

    buttonMC:{
      width: 340,
      height: 40,
      borderRadius: 20,
      alignSelf: 'center',
      backgroundColor: '#6F8FAF',
      marginTop: 5, 
    },

    buttonText:{
      alignSelf: 'center',
      paddingTop: 7,
      fontSize: 15,
      color:'white'
    },

  })