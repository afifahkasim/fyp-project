import React, { useLayoutEffect, useState, useContext, useEffect } from 'react'
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

const joinGroup = ({ navigation }) => {
    const [groups, setGroups] = useState([]);
    const [input, setInput] = useState("");
    const { user, profile, JoinGroup } = useContext(AuthContext);
    // const memberList = {
    //     memberName: profile.name,
    //     memberID: profile.userid,
    //     memberStatus: 'member'
    // }

    // const [memberList, setMemberList] = useState([{
    //     memberName: profile.name,
    //     memberID: profile.userid,
    //     memberStatus: 'member'
    // }]);




    const [memberList, setMemberList] = useState({
        memberName: profile.name,
        memberID: profile.userid,
        memberStatus: 'member'
    });


    useLayoutEffect(() => {
        navigation.setOptions({
            title: "Joining a New Group",
            headerBackTitle: "Group",
        });
    }, [navigation]);

    useEffect(() => {
        const unsubscribe = db.collection('groups').onSnapshot((snapshot) =>
            setGroups(
                snapshot.docs.map(doc => ({
                    id: doc.id, // the group id, second column
                    data: doc.data() // the third column
                }))
            )
        );

        return unsubscribe;
    }, []);

    const joinGroup = async (abc) => {
        // db.collection("groups").doc(input)
        // .get()
        // .then(function(doc) {
        //     console.log("Before, ", doc.data().member),
        //     console.log("Memberlist, ", memberList),
        //     db.collection('groups').doc(input).update(
        //          {
        //             member: firebase.firestore.FieldValue.arrayUnion()
        //          }
        //     ).then(() => {
        //          navigation.goBack()
        //       })
        //     .catch((error) => alert(error.message));

        // }).catch(function(error) {
        //   console.log("Error getting document:", error);
        // });

        // LeiwPA6DqVtHKB2lPrKK
        await db.collection('groups').doc(abc).update({
            member: firebase.firestore.FieldValue.arrayUnion(memberList)
        }).then(() => {
            Alert.alert("Congratulations!", "You have joined the group.")
            navigation.goBack()
        })
            .catch((error) => {
                Alert.alert("Failed to join group.", "Please make sure that you have entered the correct group ID.")
                console.log('[authProvider.js] Error joining group.');
                console.log(error);
            }
            );
    }


    return (
        <View style={globalStyles.container}>
            <Header text='Join Group' />
            <View style={{ alignItems: 'center', justifyContent: 'center', height: Dimensions.get("window").height - 100 }}>
                <Card>
                    <View style={styles.containerLogin}>
                        <Formik
                            initialValues={{ gpid: '' }}
                            onSubmit={(values, actions) => {
                                // actions contain some methods to call on form
                                actions.resetForm();
                                // setInput(values.gpid);
                                joinGroup(values.gpid);
                            }}>
                            {/* Formik provides these props automatically (any name accepted) */}
                            {(formikProps) => (
                                <View>
                                    <Text style={styles.textRegister}>Join Group by ID</Text>

                                    <TextInput
                                        placeholder='Enter Group ID'
                                        placeholderTextColor='#6F8FAF'
                                        style={styles.inputLogin}
                                        // this handles/changes the state behind the scenes for us
                                        onChangeText={formikProps.handleChange('gpid')}
                                        // this
                                        value={formikProps.values.gpid}
                                        onBlur={formikProps.handleBlur('gpid')} />

                                        

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

export default joinGroup

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
