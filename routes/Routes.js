import React, {useContext, useState, useEffect} from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { AuthContext } from './authProvider';
import UserStack from './userStack';
import GuestStack from './guestStack';
import Apikey from "../database/apiKey";
// import * as firebase from 'firebase';
// import 'firebase/firestore';
import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';
import * as Font from 'expo-font';
import AppLoading from 'expo-app-loading';

//check if firebase not init,so init from config file
if (!firebase.apps.length) {firebase.initializeApp(Apikey.firebaseConfig);}
const db = firebase.firestore();

const getFonts = () => {
    return Font.loadAsync({
      'nunito-regular': require('../assets/fonts/Nunito-Regular.ttf'),
      'nunito-bold': require('../assets/fonts/Nunito-Bold.ttf'),
      'nunito-light': require('../assets/fonts/Nunito-Light.ttf')
    });
  };



const Routes = () => {
  const [fontsLoaded, setFontsLoaded] = useState(false);
  const {user, setUser} = useContext(AuthContext);
  const {profile, setProfile} = useContext(AuthContext);
  const [initializing, setInitializing] = useState(true);

  const getuserinfo = (user) =>{

    try{
       db.collection("users").doc(user.uid).onSnapshot(doc =>{
        setProfile(doc.data())
       })
    }catch(e){
      console.log(e);
    }
  
    
 }

  const onAuthStateChanged = (user) => {
    setUser(user);
    getuserinfo(user);
    if (initializing) setInitializing(false);
  };


  useEffect(() => {
    const subscriber = firebase.auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber; // unsubscribe on unmount
  }, []);

  if (initializing) return null;

  if (fontsLoaded){
  return (
      console.log('[Routes.js] No issues with starting.'),
    <NavigationContainer>
      {user ? <UserStack /> : <GuestStack />}
    </NavigationContainer>
  );
 }else{
   return <AppLoading 
   startAsync={getFonts} 
   onFinish={() => setFontsLoaded(true)}
   onError={() => console.log('error')} />;
 }
};

export default Routes;