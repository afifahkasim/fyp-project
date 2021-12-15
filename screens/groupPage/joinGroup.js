import React, { useLayoutEffect, useState, useContext, useEffect } from 'react'
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
if (!firebase.apps.length) { firebase.initializeApp(Apikey.firebaseConfig); }
const db = firebase.firestore();

const joinGroup = ({ navigation }) => {
    const [groups, setGroups] = useState([]);
    const [input, setInput] = useState("");
    const { user, profile } = useContext(AuthContext);
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

    // const testData = db.collection('groups').doc('LeiwPA6DqVtHKB2lPrKK');
    // const testie = async () => await testData.get();
    // if (!testie.exists) {
    //     console.log('No got onezzzzz');
    // } else {
    //     console.log('Document data:', testie.data());
    // }

    // const docsArr = (db, collection) => {
    //     return db
    //       .collection(collection)
    //       .get()
    //       .then(snapshot => snapshot.docs.map(x => x.data()))
    //   }

    //   ;
    //   (async () => {
    //     const arr = await docsArr(db, 'groups')
    //     console.log(arr)
    //   })()

    // const unsubscribe = db.collection('groups').onSnapshot((snapshot) => 
    //     snapshot.docs.map(doc => ({
    //     id: doc.id, // the group id, second column
    //     data: doc.data() // the third column
    //     }))
    // );

    // const updateLah = () => {
    //     console.log('-----------'),
    //     groups.map(({id, data: { member } }) =>
    //         (
    //             memberList = member.setMemberList(memberList),
    //             console.log(memberList)
    //         )
    //     )
    // }


    /// TRYING THIS OUTTTTTTTT MAINLY
    // db.collection("groups").doc('LeiwPA6DqVtHKB2lPrKK')
    // .get()
    // .then(function(doc) {
    //   if (doc.exists) {
    //     // setMemberList(memberList => {
    //     //     return [
    //     //         (doc.data().member),
    //     //         ...memberList
    //     //     ];
    //     // });
    //     // console.log("Document data:", memberList);

    //     // const data = () => doc.data().member,
    //     // setMemberList(data => {
    //     //     return [
    //     //         memberList,
    //     //         ...data
    //     //     ];
    //     // });
    //     // console.log("Document data:", memberList);

    //     console.log("Document data:", doc.data().member);
    //   } else {
    //     // doc.data() will be undefined in this case
    //     console.log("No such document!");
    //   }
    // }).catch(function(error) {
    //   console.log("Error getting document:", error);
    // });

    // const docsArr = (db, collection) => {
    //     return db
    //       .collection(collection)
    //       .get()
    //       .then((snapshot) => {
    //           const doc = snapshot.docs[0];
    //           const docid = doc.id;
    //           const docdata = doc.data();

    //           console.log(docid);
    //           console.log(docdata);

    //       }).catch((error) => console.log(error.message));
    //     }

    //       async () => {
    //             const arr = await docsArr(db, 'groups')
    //             console.log('asdjfkanskjdf ETESTING')
    //             console.log(arr)}

    // sini update groups.id with member
    const joinGroup = async () => {
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
        await db.collection('groups').doc(input).update({
            member: firebase.firestore.FieldValue.arrayUnion(memberList)
        }).then(() => {
            navigation.goBack()
        })
            .catch((error) => alert(error.message));
    }


    return (
        console.log('--------------'),
        // console.log(profile),
        console.log('[This is joinGroup.js]'),
        console.log(memberList),
        <View style={globalStyles.container}>
            <Header text='Join Group' />
            <ScrollView>
                <Card>
                    <Input
                        placeholder="Enter the group ID"
                        value={input}
                        onChangeText={(text) => setInput(text)}
                        leftIcon={
                            <FontAwesome style={{ marginRight: 5 }} name="users" size={24} color="black" />
                        }
                    />
                </Card>
                <CenterButton text='Submit' onPress={joinGroup} />
            </ScrollView>
        </View>
    )
}

export default joinGroup

const styles = StyleSheet.create({

})
