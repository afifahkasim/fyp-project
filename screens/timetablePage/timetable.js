import React, {useState, useContext} from 'react';
import Apikey from "../../database/apiKey";
import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';
import { AuthContext } from "../../routes/authProvider";
import Header from '../../shared/header';
import { StyleSheet, 
    Text, 
    View, 
    TouchableOpacity,
    Button,
    Modal,
    TextInput,
    FlatList,
   ScrollView,
   LogBox,

  } from 'react-native';
//import {addCourseTT}from '../screens/timetablePage/editTimetable';
import {Icon} from 'react-native-elements';

if (!firebase.apps.length) { firebase.initializeApp(Apikey.firebaseConfig); }

const db = firebase.firestore();
LogBox.ignoreLogs(['Setting a timer for a long period of time'])
export default function Timetable (){

const { user, Logout, profile } = useContext(AuthContext);

const [modalOpenz, setModalOpensz] = useState(false);

const item = ({item}) =>{
  return(
    <View style={{flexDirection:'row'}}>
      <View style={style.tabletimecontainer}>
        <Text>{item.time}</Text>
      </View>
      <View style={style.tablecontainer}>
        <Text>{item.mon}</Text>
      </View>
      <View style={style.tablecontainer}>
        <Text>{item.tue}</Text>
      </View>
      <View style={style.tablecontainer}>
        <Text>{item.wed}</Text>
      </View>
      <View style={style.tablecontainer}>
        <Text>{item.thu}</Text>
      </View>
      <View style={style.tablecontainer}>
        <Text>{item.fri}</Text>
      </View>
    </View>
  )
}

      return (
<View style={{flex:1}}>
  <Header text="Timetable"/>
    <View style={{flex:1, justifyContent:'center', alignItems:'center', marginTop:10}}> 
        <View style={{marginBottom:10}} >
            <View  style={style.infocontainer}>
                <Button 
                color="skyblue"
                title="Current Semester Details"
                onPress ={() =>  setModalOpensz (true)}
                > 
                </Button>
            </View> 

            <Modal
              transparent ={true}
              visible={modalOpenz}
            >
              <View style={{ backgroundColor:'#000000aa', flex: 1}}>
                <View style={{backgroundColor:'white', margin:40, height:550, borderRadius: 10}}> 
                    <Text style={style.textDetail}>
                      CREDIT HOUR
                    </Text>

                    <View
                      style={{
                        borderBottomColor: 'lightgrey',
                        borderBottomWidth: 1,
                        marginTop: 15,
                        width: 380,
                        alignSelf: 'center',
                      }}
                    />

                    <Text style={style.textDetail}>
                      Total for current semester: 20
                    </Text>
                    <Text style={style.textDetail}>
                      Total cumulative: 119
                    </Text>
                    <Text style={style.textDetail}>
                      Total remaining credit hours left to take: 0 
                    </Text>
                    <View  style={style.closeinfocontainer}>
                        <Button 
                        color="skyblue"
                        title="Close"
                          onPress ={() =>  setModalOpensz (false)}
                        > 
                        </Button>
                    </View>
                </View>
              </View>
            </Modal>
        </View>
<View>
        <View style={{flexDirection:'row',position:'relative'}}>
            <View style={style.timecontainer}>
              <Text></Text>
            </View>
            <View style={style.daycontainer}>
              <Text>Mon</Text>
            </View>
            <View style={style.daycontainer}>
              <Text>Tue</Text>
            </View>
            <View style={style.daycontainer}>
              <Text>Wed</Text>
            </View>
            <View style={style.daycontainer}>
              <Text>Thu</Text>
            </View>
            <View style={style.daycontainer}>
              <Text>Fri</Text>
            </View>
        </View>

        <TouchableOpacity >
          <View style={style.tclass}>
           <Text>WIE3009 Group 1 MM2</Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity >
          <View style={style.tclass2}>
           <Text>WIE3001 Group 1 MM3</Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity >
          <View style={style.tclass3}>
           <Text>WIE3002 Group 2 BS2</Text>
          </View>
        </TouchableOpacity>
    </View>

            <FlatList
              data={data}
              renderItem={item}
              keyExtractor={(item,index) => index.toString()}
            />


  </View>
</View> 
  
      )
  }

  const data=[
    {time: 8, mon: '', tue: '', wed:'', thu:'', fri:''},
    {time: 9, mon: '', tue: '', wed:'', thu:'', fri:''},
    {time: 10, mon: '', tue: '', wed:'', thu:'', fri:''},
    {time: 11, mon: '', tue: '', wed:'', thu:'', fri:''},
    {time: 12, mon: '', tue: '', wed:'', thu:'', fri:''},  
    {time: 1, mon: '', tue: '', wed:'', thu:'', fri:''},  
    {time: 2, mon: '', tue: '', wed:'', thu:'', fri:''},  
    {time: 3, mon: '', tue: '', wed:'', thu:'', fri:''},
              
  ]


  const style = StyleSheet.create({

    closeinfocontainer:{
      width:200,
      height: 40,
      alignSelf: 'center',
      marginTop: 30
    },
    
    infocontainer: {
      width:370,
      height: 40,
    },

    textDetail:{
      fontSize: 15, 
      paddingTop: 20, 
      paddingLeft: 20,
      fontWeight: 'bold',
    },

    daycontainer:{
      width: 70, 
      alignItems:'center',
      borderWidth:0.5,
      borderColor:'skyblue',
      position:'relative'
    },

    timecontainer:{
      width: 30, 
      borderWidth:0.5,
      borderColor:'skyblue',
      //alignItems:'center',
      //position:'relative'
    },

    tablecontainer:{
      width: 70,  
      height:60, 
      borderWidth:0.5,
      borderColor:'skyblue',
      alignItems:'center',
      position:'relative'
    },

    tabletimecontainer:{
      width: 30,  
      height:60, 
      borderWidth:0.5,
      borderColor:'skyblue',
      alignItems:'flex-end',
      paddingRight:5,
      position:'relative'
    },

    tclass:{
      height:120,
      width:70,
      marginLeft:30,
      backgroundColor:'lime',
      opacity:0.9,
      position:'absolute'
    },

    tclass2:{
      height:120,
      width:70,
      marginLeft:100,
      marginTop:60,
      backgroundColor:'pink',
      opacity:0.9,
      position:'absolute'
    },

    tclass3:{
      height:180,
      width:70,
      marginLeft:240,
      marginTop:180,
      backgroundColor:'lightblue',
      opacity:0.9,
      position:'absolute'
    },

  })
