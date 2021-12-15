import React, { useLayoutEffect, useState, useContext } from 'react'
import { StyleSheet, Text, View, ScrollView } from 'react-native'
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
        console.log('[Listing out the backend of addGroup.js]'),
        console.log(memberList),
        <View style={globalStyles.container}>
            <Header text='Add Group' />
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

})
