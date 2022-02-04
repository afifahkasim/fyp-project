import React, { createContext, useState } from 'react';
import { Alert } from 'react-native';
import Apikey from "../database/apiKey";
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore'

if (!firebase.apps.length) { firebase.initializeApp(Apikey.firebaseConfig); }
const db = firebase.firestore();
export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [profile, setProfile] = useState(null);

    return (
        console.log('[authProvider.js] Loading.'),
        <AuthContext.Provider
            value={{
                user,
                setUser,
                profile,
                setProfile,
                Login: async (email, password) => {
                    try {
                        await firebase.auth().signInWithEmailAndPassword(email, password);
                        console.log('[authProvider.js] Logging in successful.')

                    } catch (e) {
                        Alert.alert("Login failed. Please check for any errors in your email.")
                        console.log('[authProvider.js] Logging in failed.');
                        console.log(e);
                    }
                },
                Register: async (name, email, password) => {
                    try {
                        await firebase.auth().createUserWithEmailAndPassword(email, password).then(cred => {
                            db.collection('users').doc(cred.user.uid).set({
                                name: name,
                                email: email,
                                matricsid: '',
                                gender: '',
                                session: '',
                                semester: '',
                                department: '',
                                userid: cred.user.uid,
                                profilepic: 'https://firebasestorage.googleapis.com/v0/b/gwcqp-40547.appspot.com/o/blank-profile-picture-973460_640.png?alt=media&token=9ddd6547-e1c9-4f8a-a157-b419cfcf6782'
                            })
                        },

                            console.log('[authProvider.js] Registration successful.'))
                        Alert.alert("Registration successful.", "Welcome to Data-U, enjoy your stay here!")
                    } catch (e) {
                        console.log('[authProvider.js] Registration failed.');
                        console.log(e);
                        Alert.alert("Registration failed.", "Your email has already been used to create an account.")

                    }
                },
                Logout: async () => {
                    try {
                        await firebase.auth().signOut();
                    } catch (e) {
                        console.log('[authProvider.js] Error signing out.');
                        console.log(e);

                    }
                },
                ResetPassword: async (email) => {
                    try {
                        await firebase.auth().sendPasswordResetEmail(email).then(() => {
                            Alert.alert("A password reset email has been sent.", "For further instructions, please check your inbox, " + email + ".")
                        })
                    } catch (e) {
                        Alert.alert("Password reset failed.", "Please enter the correct e-mail of your account.")
                        console.log("[authProvider.js Error resetting password.");
                        console.log(e)
                    }
                },
            }}
        >
            {children}
        </AuthContext.Provider>
    );
}