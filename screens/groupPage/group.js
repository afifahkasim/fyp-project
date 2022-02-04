import React, { useEffect, useState, useContext } from 'react'
import { StyleSheet, Text, View, ScrollView, Button, TouchableOpacity, Alert, Dimensions } from 'react-native'
import CenterButton from '../../shared/buttonCenter'
import BlueButton from '../../shared/buttonBlue'
import Card from '../../shared/card'
import Header from '../../shared/header'
import { globalStyles } from '../../styles/global'
import Apikey from "../../database/apiKey";
import { FontAwesome } from '@expo/vector-icons';
import { Formik } from 'formik';
import { MaterialIcons } from '@expo/vector-icons';
import * as Clipboard from 'expo-clipboard';
import { AuthContext } from '../../routes/authProvider';
import LineDivider from '../../shared/lineDivider';
import GroupCard from '../../shared/cardGroup';
import GroupCard2 from '../../shared/cardGroup2';
import FilterCard from '../../shared/cardFilter';
import RNPickerSelect, { defaultStyles } from 'react-native-picker-select';
import { Ionicons } from '@expo/vector-icons';
import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';


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
        Alert.alert("Copy successful.", "Group ID copied to clipboard.");
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

    const [displayStatus, setDisplayStatus] = useState(1)

    const listTab = [
        {
            Status: 1,
            Name: "All"
        },
        {
            Status: 2,
            Name: "Available"
        },
        {
            Status: 3,
            Name: "Joined"
        }
    ]

    function renderAllGroup() {

    }

    return (
        <View style={globalStyles.container}>
            <Header text='Group' />
            {/* [Group] All Groups, Available & Joined */}
            <View style={{ paddingHorizontal: 24, paddingRight: 30, width: Dimensions.get('window').width }}>
                <View style={styles.listTab}>

                    {
                        listTab.map((e, index) => (
                            <TouchableOpacity
                                key={index}
                                style={[
                                    styles.btnTab,
                                    {
                                        width: Dimensions.get('window').width / listTab.length - 29
                                    },
                                    displayStatus === e.Status && styles.btnTabActive]}
                                onPress={() => setDisplayStatus(e.Status)}
                            >

                                {/* If unselected, normal tab style, if selected, active tab style */}
                                <Text style={[styles.textTab, displayStatus === e.Status && styles.textTabActive]}>
                                    {e.Name}
                                </Text>

                                {/* If selected, display icon */}
                                {displayStatus === e.Status ?
                                    <Ionicons name="checkmark-circle-sharp" size={20} color="black" style={{ alignContent: 'flex-end' }} />
                                    :
                                    <View></View>}
                            </TouchableOpacity>
                        ))
                    }
                </View>
            </View>
            <ScrollView
                contentContainerStyle={{
                    paddingHorizontal: 24,
                    paddingBottom: 150
                }}
            >
                {/* <View style={styles.filterContainer}>
                    <FilterCard
                        value="Display"
                    />

                    <FilterCard
                        value="Search"
                    />
                </View> */}


                {/* displayStatus 1 for All, displayStatus 2 for Available, else for Joined */}
                {/* For every group, want to render something. Destructure group into id & data */}
                {displayStatus === 1 ?
                    groups.map(({ id, data: { groupName, member } }) => (
                        <View key={id} style={styles.groupSectionContainer}>
                            <GroupCard
                                icon={group}
                                label="Group"
                                value={groupName}
                            />
                            {/* {groups.map(({id, data: { member }}) =>  */}
                            <LineDivider lineStyle={{ marginVertical: 8 }} />

                            <GroupCard
                                icon={admin}
                                label="Admin"
                                value={member[0].memberName}
                            />

                            <GroupCard
                                icon={group_member}
                                label="Group Members"
                                value={member.length + " people"}
                            />
                            {
                                member.some(user => user.memberID === profile.userid) !== true ?
                                    <View>
                                        <GroupCard
                                            icon={not_member}
                                            value="You're not in this group."
                                        />
                                    </View>
                                    :
                                    <View>
                                        <GroupCard
                                            icon={is_member}
                                            value="You're in this group."
                                        />
                                    </View>
                            }

                            {
                                profile.userid == member[0].memberID ?
                                    <View>
                                        <LineDivider lineStyle={{ marginVertical: 8 }} />

                                        <GroupCard2
                                            icon={copy}
                                            value="Copy Group ID"
                                            onPress={() => copyToClipboard(id)}
                                        />

                                        <GroupCard2
                                            icon={view}
                                            value="View Group Members"
                                            onPress={() => {
                                                Alert.alert("UI not available yet.", "We apologize for the inconvenience."),
                                                console.log(member.map(user => user.memberName))}}
                                        />

                                        <GroupCard2
                                            icon={delete_group}
                                            value="Delete Group"
                                            onPress={() => Alert.alert(
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
                                        />

                                    </View>

                                    :

                                    <View></View>
                            }
                            {console.log("---")}
                            {console.log(member.map(user => user.memberName))}
                            {console.log(member.some(user => user.memberID === profile.userid))}
                            {
                                member.some(user => user.memberID === profile.userid) !== true ?
                                    <View>
                                        <LineDivider lineStyle={{ marginVertical: 8 }} />
                                        <GroupCard2
                                            icon={join_by_id}
                                            value="Join Group by ID"
                                            onPress={pressJoinGroup}
                                        />

                                        <GroupCard2
                                            icon={join_by_id}
                                            value="Join Group by Request Access"
                                            onPress={() => 
                                                Alert.alert("UI not available yet.", "We apologize for the inconvenience.")
                                                }
                                        />
                                    </View>
                                    :
                                    <View>

                                    </View>
                            }

                        </View>
                    ))
                    : displayStatus === 2 ?
                        groups.map(({ id, data: { groupName, member } }) => (
                            <View>

                                {
                                    member.some(user => user.memberID === profile.userid) !== true ?
                                        <View key={id} style={styles.groupSectionContainer}>
                                            <View>
                                                <GroupCard
                                                    icon={group}
                                                    label="Group"
                                                    value={groupName}
                                                />
                                                <LineDivider lineStyle={{ marginVertical: 8 }} />

                                                <GroupCard
                                                    icon={admin}
                                                    label="Admin"
                                                    value={member[0].memberName}
                                                />

                                                <GroupCard
                                                    icon={group_member}
                                                    label="Group Members"
                                                    value={member.length + " people"}
                                                />


                                                <GroupCard
                                                    icon={not_member}
                                                    value="You're not in this group."
                                                />

                                                {console.log("---")}
                                                {console.log(member.map(user => user.memberName))}
                                                {console.log(member.some(user => user.memberID === profile.userid))}

                                                <View>
                                                    <LineDivider lineStyle={{ marginVertical: 8 }} />
                                                    <GroupCard2
                                                        icon={join_by_id}
                                                        value="Join Group by ID"
                                                        onPress={pressJoinGroup}
                                                    />

                                                    <GroupCard2
                                                        icon={join_by_id}
                                                        value="Join Group by Request Access"
                                                        onPress={() => copyToClipboard(id)}
                                                    />
                                                </View>

                                            </View>
                                        </View>
                                        : <View></View>}
                            </View>
                        ))
                        :
                        groups.map(({ id, data: { groupName, member } }) => (
                            <View>
                                {
                                    member.some(user => user.memberID === profile.userid) === true ?
                                        <View key={id} style={styles.groupSectionContainer}>
                                            <View>
                                                <GroupCard
                                                    icon={group}
                                                    label="Group"
                                                    value={groupName}
                                                />
                                                <LineDivider lineStyle={{ marginVertical: 8 }} />

                                                <GroupCard
                                                    icon={admin}
                                                    label="Admin"
                                                    value={member[0].memberName}
                                                />

                                                <GroupCard
                                                    icon={group_member}
                                                    label="Group Members"
                                                    value={member.length + " people"}
                                                />


                                                <GroupCard
                                                    icon={is_member}
                                                    value="You're in this group."
                                                />

                                                {console.log("---")}
                                                {console.log(member.map(user => user.memberName))}
                                                {console.log(member.some(user => user.memberID === profile.userid))}

                                                {
                                                    profile.userid == member[0].memberID ?
                                                        <View>
                                                            <LineDivider lineStyle={{ marginVertical: 8 }} />

                                                            <GroupCard2
                                                                icon={copy}
                                                                value="Copy Group ID"
                                                                onPress={() => copyToClipboard(id)}
                                                            />

                                                            <GroupCard2
                                                                icon={view}
                                                                value="View Group Members"
                                                                onPress={() => console.log(member.map(user => user.memberName))}
                                                            />

                                                            <GroupCard2
                                                                icon={delete_group}
                                                                value="Delete Group"
                                                                onPress={() => Alert.alert(
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
                                                            />

                                                        </View>

                                                        :

                                                        <View></View>
                                                }

                                            </View>
                                        </View>
                                        : <View></View>}
                            </View>
                        ))}



                <CenterButton text='Add Group' onPress={pressAddGroup} />
            </ScrollView>
        </View>
    )
}

const group = require("../../assets/icons/group.png");
const admin = require("../../assets/icons/admin.png");
const group_member = require("../../assets/icons/group-member.png");
const copy = require("../../assets/icons/copy.png");
const delete_group = require("../../assets/icons/delete-group.png");
const view = require("../../assets/icons/view.png");
const is_member = require("../../assets/icons/is-member.png");
const not_member = require("../../assets/icons/not-member.png");
const join_by_id = require("../../assets/icons/join-by-id.png");


export default Group

const styles = StyleSheet.create({
    groupSectionContainer: {
        marginTop: 24,
        paddingTop: 8,
        paddingBottom: 18,
        paddingHorizontal: 24,
        borderWidth: 1,
        borderRadius: 12,
        borderColor: "#BEC1D2",
        backgroundColor: "white",
        elevation: 3,
        shadowOffset: { width: 1, height: 1 },
        shadowColor: '#333',
        shadowOpacity: 0.3,
        shadowRadius: 2,
    },


    listTab: {
        flexDirection: 'row',
        width: '100%',
        margin: 5,
        alignItems: 'center',
        backgroundColor: 'white',
        borderRadius: 20,
        elevation: 3,
        shadowOffset: { width: 1, height: 1 },
        shadowColor: '#333',
        shadowOpacity: 0.3,
        shadowRadius: 2,
    },
    listIcon: {
        marginLeft: 20,
        marginHorizontal: 10,
    },
    btnTab: {
        backgroundColor: 'white',
        flexDirection: 'row',
        alignItems: 'center',
        // borderWidth: 1,
        // borderColor: '#444',
        padding: 10,
        borderRadius: 20,
        margin: 5,
        height: 45,
    },
    textTab: {
        fontFamily: 'nunito-regular',
        fontWeight: '900',
        fontSize: 14,
        textAlign: 'center',
        color: "black",
        flex: 1,

    },
    btnTabActive: {
        backgroundColor: 'steelblue',
        flexDirection: 'row',
        alignItems: 'center',
        // borderWidth: 1,
        // borderColor: '#444',
        padding: 10,
        borderRadius: 20,
        margin: 5,
        height: 45,
    },
    textTabActive: {
        fontFamily: 'nunito-bold',
        fontWeight: '900',
        fontSize: 14,
        textAlign: 'center',
        color: "black",
        flex: 1,

    },

    filterContainer: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-evenly'
    }

})
const pickerSelectStyles = StyleSheet.create({
    inputIOS: {
        fontSize: 16,
        paddingVertical: 12,
        paddingHorizontal: 10,
        borderWidth: 1,
        borderColor: 'gray',
        borderRadius: 4,
        color: 'black',
        paddingRight: 30, // to ensure the text is never behind the icon
    },
    inputAndroid: {
        marginBottom: 18,
        fontSize: 16,
        paddingHorizontal: 10,
        paddingVertical: 8,
        borderWidth: 0.5,
        borderColor: 'black',
        borderRadius: 8,
        color: 'black',
        paddingRight: 30, // to ensure the text is never behind the icon
    },
    avatar: {
        width: 130,
        height: 130,
        borderRadius: 63,
        borderWidth: 4,
        borderColor: "white",
        marginBottom: 10,
        alignSelf: 'center',
        position: 'absolute',
        marginTop: 130
    },
});