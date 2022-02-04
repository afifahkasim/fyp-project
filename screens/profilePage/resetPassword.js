import React, { useEffect, useState, useContext } from 'react'
import { StyleSheet, Text, View, ScrollView, Button, TouchableOpacity, Alert, Dimensions, TextInput } from 'react-native'
import CenterButton from '../../shared/buttonCenter'
import BlueButton from '../../shared/buttonBlue'
import Card from '../../shared/card'
import Header from '../../shared/header'
import { globalStyles } from '../../styles/global'
import Apikey from "../../database/apiKey";
import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';
import { AuthContext } from '../../routes/authProvider';
import { Formik } from 'formik';


//check if firebase not init,so init from config file
if (!firebase.apps.length) { firebase.initializeApp(Apikey.firebaseConfig); }
const db = firebase.firestore();

const resetPassword = ({ navigation }) => {
    const { profile, ResetPassword } = useContext(AuthContext);


    const resetPassword = async () => {
        await profile.updatePassword(newPassword).then(function() {
            console.log(newPassword);
          }).catch(function(error) {
            console.log("Error.")
        });
    }

    return (
        <View style={globalStyles.container}>
            <Header text='Reset Password' />
            <View style={{ alignItems: 'center', justifyContent: 'center', height: Dimensions.get("window").height-100 }}>
                <Card>
                    <View style={styles.containerLogin}>
                        <Formik
                            initialValues={{ email: '', password: '' }}
                            onSubmit={(values, actions) => {
                                // actions contain some methods to call on form
                                console.log("Hello?");
                                console.log(values.email);
                                actions.resetForm();
                                ResetPassword(values.email);
                            }}>
                            {/* Formik provides these props automatically (any name accepted) */}
                            {(formikProps) => (
                                <View>
                                    <Text style={styles.textRegister}>Reset Password</Text>

                                    <TextInput
                                        placeholder='Siswamail'
                                        placeholderTextColor='#6F8FAF'
                                        style={styles.inputLogin}
                                        // this handles/changes the state behind the scenes for us
                                        onChangeText={formikProps.handleChange('email')}
                                        // this
                                        value={formikProps.values.email}
                                        onBlur={formikProps.handleBlur('email')} />

                                    {/* <TextInput
                                        placeholder='New Password'
                                        placeholderTextColor='#6F8FAF'
                                        style={styles.inputLogin}
                                        secureTextEntry={true}
                                        onChangeText={formikProps.handleChange('password')}
                                        value={formikProps.values.password}
                                        onBlur={formikProps.handleBlur('password')} /> */}

                                    <CenterButton text='Reset' onPress={formikProps.handleSubmit} />

                                </View>
                            )}
                        </Formik>


                    </View>


                </Card>
            </View>

        </View>
    )
}


export default resetPassword

const styles = StyleSheet.create({
    containerLogin: {
        marginTop: 10,
        paddingLeft: 40,
        paddingRight: 40,
        paddingBottom: 10
    },
    textRegister: {
        fontFamily: "nunito-bold",
        color: "black",
        fontSize: 36,
        textAlign: "center"
    },
    inputLogin: {
        borderRadius: 10,
        borderColor: "black",
        borderWidth: 1,
        padding: 10,
        marginVertical: 10,
        marginRight: 10,
        width: "100%",
        height: 50,
        color: "black"
      },
})