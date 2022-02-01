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
            <View style={style.CPfont}>
                <Text>Course Planner: 2020/2021 </Text>
            </View>

            <View style={style.deptcont}>
                      <Icon
                        style={{paddingTop: 17}}
                        name='building'
                        type='font-awesome-5'
                        color='steelblue' 
                        size={15}
                        />
                <Text style={style.deptfont}>Department:</Text>
            </View>

            
        <Pressable onPress={pressISPlanner}>
              <View style={style.buttonMC}>
                <Text style={style.buttonText}>Information Systems</Text>
              </View>
        </Pressable>

        <Pressable onPress={pressNetworkPlanner}>
              <View style={style.buttonMC}>
                <Text style={style.buttonText}>Computer System and Network</Text>
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
      height: 50,
      borderRadius: 20,
      alignSelf: 'center',
      backgroundColor: '#6F8FAF',
      marginVertical:10 
    },

    buttonText:{
      alignSelf: 'center',
      paddingVertical: 12,
      fontSize: 15,
      color:'white'
    },

    deptfont:{
      paddingHorizontal: 15, 
      paddingVertical:15,
    },
    deptcont:{
      marginLeft:20, 
      flexDirection:'row'
    },

    CPfont:{
      marginBottom:20, 
      marginLeft:20, 
      marginTop:10
    },

  })
