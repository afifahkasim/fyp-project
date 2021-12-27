import React,{useState, useContext} from 'react';
import { Icon } from 'react-native-elements';
import Apikey from "../../database/apiKey";
import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';
import { AuthContext } from "../../routes/authProvider";
import Header from '../../shared/header';

import { StyleSheet, 
    Text, 
    View, 
    Pressable,
    LogBox,
    TextInput,
    Button,
    Modal,
    ScrollView,

  } from 'react-native';
    
if (!firebase.apps.length) { firebase.initializeApp(Apikey.firebaseConfig); }

const db = firebase.firestore();
LogBox.ignoreLogs(['Setting a timer for a long period of time'])

  export default function Calculator({navigation}){

  const { user, Logout, profile } = useContext(AuthContext);

  const [modalOpen,  setModalOpenz] = useState(false);

  const [target, setTarget] = useState(null);

  const GPAPressHandler = () => {  
    navigation.navigate('GPA');  
  }
  const CGPAPressHandler = () => {  
    navigation.navigate('CGPA');  
  }

      return(
    <View style={{flex:1}}> 
          <Header text="Calculator" />
      <ScrollView>
          <View  style={style.infocontainer}>
             <Button 
             color="skyblue"
             title=" List of grade and method to calculate"
             onPress ={() =>  setModalOpenz (true)}
             > 
             </Button>
          </View>

          <Modal
          transparent ={true}
          visible={modalOpen}
          >
            <View style={{ backgroundColor:'#000000aa', flex: 1}}>
              <View style={{backgroundColor:'white', margin:40, height:550, borderRadius: 10}}> 

              <Text style={{ fontSize: 15, paddingTop: 20, paddingLeft: 20 }}>
                University of Malaya's grade and grade point list:
              </Text>
              <Text style={{ fontSize: 15, paddingTop: 20, paddingLeft: 30}}>
               A+      100-90       4.0
              </Text>
              <Text style={{ fontSize: 15, paddingLeft: 30}}>
               A         89-80         4.0
              </Text>
              <Text style={{ fontSize: 15, paddingLeft: 30}}>
               A-        79-75         3.7
              </Text>
              <Text style={{ fontSize: 15, paddingLeft: 30}}>
               B+       74-70         3.3
              </Text>
              <Text style={{ fontSize: 15, paddingLeft: 30}}>
               B         69-65         3.0
              </Text>
              <Text style={{ fontSize: 15, paddingLeft: 30}}>
               B-        64-60         2.7
              </Text>
              <Text style={{ fontSize: 15, paddingLeft: 30}}>
               C+       59-55         2.3
              </Text>
              <Text style={{ fontSize: 15, paddingLeft: 30}}>
               C         54-50         2.0
              </Text>
              <Text style={{ fontSize: 15, paddingLeft: 30}}>
               C-        49-45        1.7
              </Text>
              <Text style={{ fontSize: 15, paddingLeft: 30}}>
               D+       44-40        1.3
              </Text>
              <Text style={{ fontSize: 15, paddingLeft: 30}}>
               D         39-35        1.0
              </Text>
              <Text style={{ fontSize: 15, paddingLeft: 30, marginBottom: 20 }}>
               F         34-00         0.0
              </Text>

              <Text style={{ fontSize: 15, paddingTop: 20, paddingLeft: 20 }}>
              Formula:
              </Text>
              <Text style={{ fontSize: 15, paddingLeft: 30, marginBottom: 50 }}>
              GPA = Sum of grade point / Sum of credit hours 
              </Text>

         
              
              <View  style={style.closeinfocontainer}>
                <Button 
                 color="skyblue"
                 title="Close"
                  onPress ={() =>  setModalOpenz (false)}
                > 
                </Button>
              </View>
              </View>
            </View>
         </Modal>
          <View>
          <Pressable onPress={GPAPressHandler}>
              <View style={style.frontcalbutton}>
                <Text style={style.frontcaltext}>Semester Result</Text>
              </View>
          </Pressable>

          <Pressable onPress={CGPAPressHandler}>
              <View style={style.frontcalbutton}>
                <Text style={style.frontcaltext}>GPA calculator</Text>
              </View>
          </Pressable>
          
          </View>

          <View style={style.showCGPA}>
            <Text style={style.CGPAfont}>CGPA</Text>
              <Text style={style.semesterfont}>Semester 1: </Text>
              <Text style={style.semesterfont} >Semester 2: </Text>
              <Text style={style.semesterfont}>Semester 3: </Text>
              <Text style={style.semesterfont}>Semester 4: </Text>
              <Text style={style.semesterfont}>Semester 5: </Text>
              <Text style={style.semesterfont}>Semester 6: </Text>
              <Text style={style.semesterfont}>Semester 7: </Text>
            <Text style={style.targetfont}>GPA to achieve target:</Text>
          </View>

          <View style={style.calculateTarget}>
            <View style={style.subcontainer}>
              <Text style={style.calfont}>CGPA Target for this semester:</Text>
                <View>
                  <TextInput       
                        style={style.gradeinput}
                        onChangeText={setTarget}
                        placeholder="4.00"
                        keyboardType="numeric"
                        value={target}/>   
                </View>
                <View style={style.caltarget}>
                        <Icon
                        raised
                        name='calculator'
                        type='font-awesome-5'
                        color='steelblue' 
                        size={15}
                        //onPress={() => }
                        />
                </View>
            </View>
          </View>
          </ScrollView>
        </View>
      )
  }

  const style = StyleSheet.create({
    
    infocontainer: {
      width:370,
      height: 40,
      marginLeft:10,
      marginTop: 10,
    },
    closeinfocontainer:{
      width:200,
      height: 40,
      alignSelf: 'center',  
    },
    
    frontcalbutton:{
      width: 300,
      height: 50,
      borderRadius: 20,
      alignSelf: 'center',
      backgroundColor: 'white',
      marginTop: 20,
      borderWidth:1,
      borderColor:'steelblue'
    },
 
    frontcaltext:{
      textAlign: 'center',
      fontSize: 15,
      paddingTop: 15
    },

    showCGPA:{
      height: 330,
      width:380,
      backgroundColor:'white',
      alignSelf:'center',
      borderRadius:20,
      borderWidth:0.5,
      borderColor:'steelblue',
      marginTop: 30,

    },

    CGPAfont:{
      fontWeight:'bold',
      paddingHorizontal: 40,
      paddingVertical:15,
      fontSize:20
    },

    semesterfont:{
      paddingLeft:60,
      paddingVertical:5
    },

    targetfont:{
      fontSize:20,
      fontStyle:'italic',
      paddingLeft:50,
      paddingVertical:20,
    },

    calculateTarget:{
      width: 370,
      alignSelf:'center',
      marginTop: 10,
      borderRadius:20,
      flexDirection:'row',
      marginBottom:20
    },
    calfont:{
      fontWeight:'bold',
      paddingVertical:20,
      paddingLeft:20,
    },
    gradeinput:{
      alignItems:'center',
      borderWidth: 1,
      borderColor:'steelblue',
      height:40,
      width: 60,
      backgroundColor: 'white',
      borderRadius:15,
      paddingLeft: 15,
      marginLeft:30,
    },

    subcontainer:{
      flexDirection:'row',
      alignItems:'center',
      flexWrap:'wrap',
      //justifyContent:'space-between'
    },

    caltarget:{
      marginLeft:10
    }
    })
