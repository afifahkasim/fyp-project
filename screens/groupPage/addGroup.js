import React, { useLayoutEffect, useState, useContext } from 'react'
import { StyleSheet, Text, View, ScrollView, Alert, Dimensions, TextInput } from 'react-native'
import CenterButton from '../../shared/buttonCenter'
import Card from '../../shared/card'
import Header from '../../shared/header'
import { globalStyles } from '../../styles/global'
import { Input } from 'react-native-elements'
import { FontAwesome } from '@expo/vector-icons';
import Apikey from "../../database/apiKey";
import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';
import { Formik } from 'formik';
import { AuthContext } from '../../routes/authProvider'

//check if firebase not init,so init from config file
if (!firebase.apps.length) { firebase.initializeApp(Apikey.firebaseConfig); }
const db = firebase.firestore();


const addGroup = ({ navigation }) => {
    const [input, setInput] = useState("");
    const { user, profile, AddGroup } = useContext(AuthContext);
    const memberList = [{
        memberName: profile.name,
        memberID: profile.userid,
        memberStatus: 'admin'
    }]

    useLayoutEffect(() => {
        navigation.setOptions({
            title: "Adding a New Group",
            headerBackTitle: "Group",
        });
    }, [navigation]);

    const addGroup = async (abc) => {
        await db.collection('groups').add({
            groupName: abc,
            member: memberList
        }).then(() => {
            navigation.goBack()
        })
            .catch((error) => {
                Alert.alert("Failed to add group.", "Please make sure that you have entered a group name.")
                console.log('[authProvider.js] Error adding group.');
                console.log(error);
            });
    }

    return (
        console.log('---------------'),
        console.log(profile),
        console.log('[Listing out the backend of addGroup.js]'),
        console.log(memberList),
        <View style={globalStyles.container}>
            <Header text='Add Group' />
            <View style={{ alignItems: 'center', justifyContent: 'center', height: Dimensions.get("window").height - 100 }}>
                <Card>
                    <View style={styles.containerLogin}>
                        <Formik
                            initialValues={{ gpname: '' }}
                            onSubmit={(values, actions) => {
                                // actions contain some methods to call on form
                                actions.resetForm();
                                // setInput(values.gpname);
                                addGroup(values.gpname);
                            }}>
                            {/* Formik provides these props automatically (any name accepted) */}
                            {(formikProps) => (
                                <View>
                                    <Text style={styles.textRegister}>Add New Group</Text>
                                    
                                    <TextInput
                                        placeholder='Enter Group Name'
                                        placeholderTextColor='#6F8FAF'
                                        style={styles.inputLogin}
                                        // this handles/changes the state behind the scenes for us
                                        onChangeText={formikProps.handleChange('gpname')}
                                        // this
                                        
                                        value={formikProps.values.gpname}
                                        onBlur={formikProps.handleBlur('gpname')} />
{/* 
                                    <Input
                                        placeholder="Enter a group name"
                                        value={input}
                                        onChangeText={(text) => setInput(text)}
                                        leftIcon={
                                            <FontAwesome style={{ marginRight: 5 }} name="users" size={24} color="black" />
                                        }
                                    /> */}

                                    <CenterButton text='Submit' onPress={formikProps.handleSubmit} />

                                </View>
                             )} 
                         </Formik>


                    </View>


                </Card>
            </View>

        </View>
    )
}

export default addGroup

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
