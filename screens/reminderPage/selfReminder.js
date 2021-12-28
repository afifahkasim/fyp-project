import React,{useState, useContext} from 'react';
import Apikey from "../../database/apiKey";
import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';
import { AuthContext } from "../../routes/authProvider";
import Header from '../../shared/header';
import { 
  StyleSheet, 
  View, 
  Text, 
  KeyboardAvoidingView, 
  Platform, 
  TextInput, 
  TouchableOpacity, 
  Keyboard,
  Alert,
  ScrollView,
  LogBox,
} from 'react-native';
import Taskreminder from '../../screens/reminderPage/taskReminder';
import { Icon } from 'react-native-elements';
import {Calendar} from 'react-native-calendars';

if (!firebase.apps.length) { firebase.initializeApp(Apikey.firebaseConfig); }

const db = firebase.firestore();
LogBox.ignoreLogs(['Setting a timer for a long period of time'])

  export default function Selfreminder(){
    const { user, Logout, profile } = useContext(AuthContext);
  
    const[task, setTask] = useState();
    const[taskItems, setTaskItems] = useState([]);

    const handleAddTask= () => {

      if (task == null){
        Alert.alert(
          "Error", 
          "Please input your reminder",
          [
            { text: "OK", onPress: () => console.log("OK Pressed") }
          ]
          );

      }else
      {
        //     const newTask ={                            //generate random id kat database ahhh tapi ni nanti lah settle
        //       id: Math.random()
        //    };
        Keyboard.dismiss();                                //lepas click add button keyboard will dismiss
        setTaskItems([...taskItems, task])                 //...taskItems => put everythings taskItems in array lepas tu dia append new "task" to it
        setTask(null);                                     //utk empty kan placeholder dari ada text
      }
    };
  
    const completeTask = (index) =>{
    let itemsCopy = [...taskItems];
    itemsCopy.splice(index, 1);                          //remove one item in the array and store back in itemsCopy
    setTaskItems(itemsCopy);
    Alert.alert("Confirm", "confirm delete?")
    }

  
      return(

        <View style= {{flex:1}}>
            <Header text="Self-Reminder"/>
           <Calendar
           style={{
            borderRadius:10,
            borderColor:'lightgrey',
            borderWidth:1,
            width:400,
            alignSelf:'center',
            marginTop: 5,
            marginBottom:5,
            }}
           /> 
                
        <View style={style.container}>
    <ScrollView>
          <View style={style.tasksWrapper}>
    
            <View style={style.items}>
              {/*this is task will go*/}
              {
                taskItems.map((item, index) => {
                  return(
                    <TouchableOpacity key={index} onPress={() => completeTask(index)}>
                     <Taskreminder text ={item} />
                    </TouchableOpacity>
                  ) 
                  
                })
              }
  
            </View>
          </View>
    </ScrollView>
          {/* write a task*/ }
          <KeyboardAvoidingView
            behaviour={Platform.OS === "ios" ? "padding" :"height"}
            style ={style.writeTaskWrapper}
          >
              <TextInput style={style.input} placeholder ={'write a reminder'} value={task} onChangeText={text => setTask (text)}/>
  
              <TouchableOpacity onPress={() => handleAddTask()}>
                <View style={style.addWrapper}>
                <Icon
                    raised
                    name='plus'
                    type='font-awesome-5'
                    color='steelblue' 
                    size={25}
                    />
                </View>
              </TouchableOpacity>
          </KeyboardAvoidingView>
  
        </View>

        </View>

 
      )
  }
  
    const style = StyleSheet.create({
      container:{
          flex: 1
        },
      tasksWrapper:{
        paddingHorizontal: 20,
      },
  
      sectionTitle:{},
  
      items:{
        marginTop:5,
        marginBottom:90,
      },
  
      writeTaskWrapper:{
        position:'absolute',
        bottom:20,
        width:'100%',
        flexDirection:'row',
        justifyContent:'space-around',
        alignItems:'center',
      },
  
      input:{
        paddingVertical:10,
        width:290,
        paddingHorizontal:15,
        backgroundColor:'white',
        borderRadius:60,
        borderColor:'lightgrey',
        borderWidth:1,
      },
      addWrapper:{
        width:60,
        height:60,
        justifyContent:'center',
        alignItems:'center',
      },

      calendarcontainer:{
        borderRadius:20,
      },
      
    });
