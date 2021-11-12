import React, { createContext, useState} from 'react';
import Apikey from "../database/apiKey";
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore'

if (!firebase.apps.length) {firebase.initializeApp(Apikey.firebaseConfig);}
const db = firebase.firestore();
export const AuthContext = createContext();

export const AuthProvider = ({children}) =>{
    const [user,setUser] =  useState(null);
    const [profile,setProfile] =  useState(null);
    
    return(
        console.log('[authProvider.js] Loading.'),
        <AuthContext.Provider
         value={{
            user,
            setUser,
            profile,
            setProfile,
            Login: async (email,password) => {
                try{
                    await firebase.auth().signInWithEmailAndPassword(email, password);
                    console.log('[authProvider.js] Logging in successful.')
                }catch(e){
                    console.log('[authProvider.js] Logging in failed.');
                    console.log(e);
                }
            },
            Register: async (name,email,password) => {
                try{
                  await firebase.auth().createUserWithEmailAndPassword(email,password).then(cred =>{
                    db.collection('users').doc(cred.user.uid).set({
                        name:name,
                        email:email,
                        matricsid: '',
                        gender: '',
                        session:'',
                        semester:'',
                        department:'',
                        userid: cred.user.uid,
                        profilepic:'https://firebasestorage.googleapis.com/v0/b/gwcqp-40547.appspot.com/o/blank-profile-picture-973460_640.png?alt=media&token=9ddd6547-e1c9-4f8a-a157-b419cfcf6782'                      
                      })
                  },
                  
                  console.log('[authProvider.js] Registration successful.'))
                }catch(e){
                    console.log('[authProvider.js] Registration failed.');
                    console.log(e);
                }
            },
            Logout: async() =>{
                try{
                    await firebase.auth().signOut();
                }catch(e){
                    console.log('[authProvider.js] Error signing out.');
                    console.log(e);

                }
            }
         }}
        > 
            {children}
        </AuthContext.Provider>             
    );
}