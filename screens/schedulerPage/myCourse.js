import React,{useState, useContext}  from 'react';
import { Icon } from 'react-native-elements';
import Apikey from "../../database/apiKey";
import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';
import { AuthContext } from "../../routes/authProvider";
import Header from '../../shared/header';
import { StyleSheet, 
    Text, 
    View, 
    ScrollView,
    FlatList, 
    TouchableOpacity,
    LogBox
   
  } from 'react-native';

  if (!firebase.apps.length) { firebase.initializeApp(Apikey.firebaseConfig); }

  const db = firebase.firestore();
  LogBox.ignoreLogs(['Setting a timer for a long period of time'])

  export default function Mycourse(){

    const { user, Logout, profile } = useContext(AuthContext);

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
      return(
<View style={{flex:1}}>
        <Header text="My Course" />
          <View style={{flex:1, justifyContent:'center', alignItems:'center', marginTop:'10%'}}>  
            <View style= {style.containerMC}>
              <View style={style.subcontainer}>
                <Text style = {style.textCC}>
                  WIE3009 Enterprise System Design and Implementation
                </Text>
                <View style = {style.trashButton}>
                    <Icon
                    name='trash'
                    type='evilicon'
                    color='#517fa4' 
                    size={25}
                    onPress={() => console.log('trash')} 
                    />         
                </View>
              </View>
            </View>

            <View
              style={{
                borderBottomColor: 'lightgrey',
                borderBottomWidth: 1,
                marginTop: 5,
                width: 380,
                alignSelf: 'center',
                marginBottom:15
                }}
            />
      <View>
            <View style={{flexDirection:'row', position: 'relative'}}>
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
              <Text>WIE3009 Group K Online</Text>
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
  };

  const data=[
    {time: 8, mon: '', tue: '', wed:'', thu:'', fri:''},
    {time: 9, mon: '', tue: '', wed:'', thu:'', fri:''},
    {time: 10, mon: '', tue: '', wed:'', thu:'', fri:''},
    {time: 11, mon: '', tue: '', wed:'', thu:'', fri:''},
    {time: 12, mon: '', tue: '', wed:'', thu:'', fri:''},  
    {time: 1, mon: '', tue: '', wed:'', thu:'', fri:''},  
    {time: 2, mon: '', tue: '', wed:'', thu:'', fri:''},  
    {time: 3, mon: '', tue: '', wed:'', thu:'', fri:''},
    {time: 4, mon: '', tue: '', wed:'', thu:'', fri:''},      
  ]

  const style = StyleSheet.create({

      daycontainer:{
        width: 70, 
       // backgroundColor:'white',
        alignItems:'center',
        borderWidth:1,
        borderWidth:0.5,
        borderColor:'skyblue',
        position:'relative'
      },

      timecontainer:{
        width: 30, 
        //backgroundColor:'white',
        borderWidth:1,
        borderWidth:0.5,
        borderColor:'skyblue',
        alignItems:'center',
        position:'relative'
      },

      tablecontainer:{
        width: 70,  
        height:60, 
        //backgroundColor:'white',
        borderWidth:1,
        borderWidth:0.5,
        borderColor:'skyblue',
        alignItems:'center',
        position:'relative'
      },

      tabletimecontainer:{
        width: 30,  
        height:60, 
        //backgroundColor:'white',
        borderWidth:1,
        borderWidth:0.5,
        borderColor:'skyblue',
        alignItems:'flex-end',
        //paddingTop:48,
        paddingRight:5,
        position:'relative'
      },

      subcontainer:{
        flexDirection:'row',
        alignItems:'center',
        flexWrap:'wrap',
        justifyContent:'space-between'
      },

      textCC:{
        maxWidth:'80%',
        },

     trashButton:{},

      containerMC:{
        backgroundColor:'white',
        padding:15,
        borderRadius:10,
        flexDirection:'row',
        alignItems:'center',
        marginBottom: 20,
      },

      tclass:{
        height:180,
        width:70,
        marginLeft:240,
        marginTop:120,
        backgroundColor:'pink',
        opacity:0.9,
        position:'absolute'
      },
  })