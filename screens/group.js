import React, { useEffect, useState, useContext } from 'react'
import { StyleSheet, Text, View, ScrollView, Button, TouchableOpacity, Alert } from 'react-native'
import CenterButton from '../shared/buttonCenter'
import Card from '../shared/card'
import { globalStyles } from '../styles/global'
import Apikey from "../database/apiKey";
import { FontAwesome } from '@expo/vector-icons';
import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';
import { Formik } from 'formik';
import { MaterialIcons } from '@expo/vector-icons';
import * as Clipboard from 'expo-clipboard';
import { AuthContext } from '../routes/authProvider'


//check if firebase not init,so init from config file
if (!firebase.apps.length) { firebase.initializeApp(Apikey.firebaseConfig); }
const db = firebase.firestore();

const Group = ({ navigation }) => {
    const [groups, setGroups] = useState([]);
    const { user, profile } = useContext(AuthContext);

    const pressAddGroup = () => {
        navigation.navigate('AddGroup')
    }

    const pressJoinGroup = () => {
        navigation.navigate('JoinGroup')
    }

    const copyToClipboard = (id) => {
        Clipboard.setString(id);
    };



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

    const deletedata = (id) => {
        console.log(id)
        const temp = groups.filter(item => {
            return item.id != id
        })
        setGroups(temp)
        db.collection('groups').doc(id).delete().then(() => {
            console.log("sakzesful delete")
        }).catch(err => {
            console.log(err)
        })

    }

    return (
        <View style={globalStyles.container}>
            <View style={styles.header}>
                <View style={styles.headerContainer}>
                    <Text style={styles.headerText}>Groups</Text>
                </View>
            </View>
            <ScrollView>

                {/* For every group, want to render something. Destructure group into id & data */}
                {groups.map(({ id, data: { groupName, member } }) => (
                    <Card key={id}>
                        <View style={{ flexDirection: 'row', padding: 6, marginBottom: 5 }}>
                            <FontAwesome style={{ marginRight: 5 }} name="users" size={24} color="black" />
                            <Text style={{ marginLeft: 5 }}>Group {groupName}</Text>
                        </View>
                        {/* {groups.map(({id, data: { member }}) =>  */}
                        <Card>
                            <View>
                                <Text style={{textAlign: "center"}}>Admin | {member[0].memberName}</Text>
                            </View>

                            {
                                profile.userid == member[0].memberID ?


                                    <View>

                                        <TouchableOpacity onPress={() => copyToClipboard(id)}>
                                            <View style={{ flexDirection: 'row', padding: 6, marginTop: 10 }}>
                                                <MaterialIcons name="content-copy" size={24} color="black" />
                                                <Text style={{ marginLeft: 5, marginTop: 3 }}>Copy Group ID</Text>
                                            </View>
                                        </TouchableOpacity>
                                        <TouchableOpacity onPress={() => Alert.alert(
                                            'Confirmation',
                                            'Are you sure you want to delete your group?',
                                            [
                                                {
                                                    text: 'Cancel',
                                                    onPress: () => console.log('Cancel Pressed'),
                                                    style: 'cancel'
                                                },
                                                { text: 'OK', onPress: () => deletedata(id) }
                                            ],
                                            { cancelable: false }
                                        )}
                                        >
                                            <View style={{ flexDirection: 'row', padding: 6, marginTop: 10 }}>
                                                <MaterialIcons name='delete' size={24} />
                                                <Text style={{ marginLeft: 5, marginTop: 3 }}>Delete Group</Text>
                                            </View>
                                        </TouchableOpacity>
                                    </View>

                                    :

                                    <View></View>
                            }


                        </Card>
                        {/* )} */}

                    </Card>
                ))}



                <CenterButton text='Add Group' onPress={pressAddGroup} />
                <CenterButton text='Join Group' onPress={pressJoinGroup} />
            </ScrollView>
        </View>
    )
}

export default Group

const styles = StyleSheet.create({
    header: {
        backgroundColor: "#C4C4C4",
        height: 80,
    },
    headerContainer: {
        padding: 40,
        alignContent: 'center',
        alignItems: 'center'
    },
    headerText: {
        fontFamily: 'nunito-bold',
        fontWeight: '900',
        fontSize: 20,
        color: "black"
    }
})
