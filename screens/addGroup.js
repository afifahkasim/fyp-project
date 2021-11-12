import React, { useLayoutEffect, useState, useContext } from 'react'
import { StyleSheet, Text, View, ScrollView } from 'react-native'
import CenterButton from '../shared/buttonCenter'
import Card from '../shared/card'
import { globalStyles } from '../styles/global'
import { Input } from 'react-native-elements'
import { FontAwesome } from '@expo/vector-icons';
import Apikey from "../database/apiKey";
import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';
import { Formik } from 'formik';
import { AuthContext } from '../routes/authProvider'

//check if firebase not init,so init from config file
if (!firebase.apps.length) {firebase.initializeApp(Apikey.firebaseConfig);}
const db = firebase.firestore();


const addGroup = ({ navigation }) => {
    const [input, setInput] = useState("");
    const { user, profile } = useContext(AuthContext);
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

    const createGroup = async () => {
        await db.collection('groups').add({
            groupName: input,
            member: memberList
        }).then(() => {
            navigation.goBack()
        })
        .catch((error) => alert(error));
    }

    return (
        console.log('---------------'),
        console.log(profile),
        console.log('yo ni addGroup.js'),
        console.log(memberList),
        <View style={globalStyles.container}>
            <View style={styles.header}>
                <View style={styles.headerContainer}>
                    <Text style={styles.headerText}>Header text</Text>
                </View>
            </View>
            <ScrollView>
                <Card>
                    <Input 
                        placeholder="Enter a group name"
                        value={input}
                        onChangeText={(text) => setInput(text)}
                        leftIcon={
                            <FontAwesome style={{marginRight: 5}} name="users" size={24} color="black" />
                        }
                    />
                </Card>
                <CenterButton text='Submit' onPress={createGroup}/>
            </ScrollView>
        </View>
    )
}

export default addGroup

const styles = StyleSheet.create({
    header:{
        backgroundColor: "#C4C4C4",
        height: 80,
      },
    headerContainer:{
        padding: 40,
        alignContent: 'center',
        alignItems: 'center'
    },
    headerText:{
        fontFamily: 'nunito-bold',
        fontWeight: '900',
        fontSize: 20,
        color: "black"
    }
})
