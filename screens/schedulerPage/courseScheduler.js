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
    Button,
    Modal, 
    TouchableOpacity,
    Animated,
    ScrollView,
    Picker,
    KeyboardAvoidingView,
    TextInput,
    LogBox
   
  } from 'react-native';

  if (!firebase.apps.length) { firebase.initializeApp(Apikey.firebaseConfig); }

  const db = firebase.firestore();
  LogBox.ignoreLogs(['Setting a timer for a long period of time'])

  export default function Coursescheduler({navigation}){
  const { user, Logout, profile } = useContext(AuthContext);

  const [modalOpen,  setModalOpenz] = useState(false);

  const pressHendlers = () => {  
    navigation.navigate('Mycourse');  
  }

  const press = () => {  
    navigation.navigate('Profile');  
  }

  const pressHome = () => {  
    navigation.navigate('Data-U');  
  }
  const [ambilValue, setAmbilValue] = useState("2021/2022")

  const [pilihValue, setPilihValue] = useState("semester 1")

  const [selectedzValue, setSelectedzValue] = useState("WIE 3009")

    return(
      <View style={{flex:1}}>
        <Header text="Course Scheduler"/>
      <ScrollView>
      <View style={{flex: 1, marginTop: 10}}>
      
        <View  style={style.infocontainer}>
           <Button 
           color="skyblue"
           title="Available courses"
           onPress ={() =>  setModalOpenz (true)}
           > 
           </Button>
        </View> 

      <KeyboardAvoidingView
      style={style.containerKB}
      behaviour = 'padding'
      >
        <View style={style.containerCS}>
          <Text style={style.fontCS1}>Year:</Text>
            <View style={style.containerCS1}>
            <Picker
                    selectedValue={ambilValue}
                    style={style.dropdowncontainerCS}
                    onValueChange={(itemValue, itemIndex) => setAmbilValue(itemValue)}
                  >
                    <Picker.Item label="2020/2021" value="2020/2021" />
                    <Picker.Item label="2021/2022" value="2021/2022" />

                  </Picker>
            </View>
         </View>

         <View style={style.containerCS}>
          <Text style={style.fontCS}>Semester:</Text>
            <View style={style.containerCS2}>
            <Picker
                    selectedValue={pilihValue}
                    style={style.dropdowncontainerCS}
                    onValueChange={(itemValue, itemIndex) => setPilihValue(itemValue)}
                  >
                    <Picker.Item label="Semester 1" value="semester 1" />
                    <Picker.Item label="Semester 2" value="semester 2" />
                    <Picker.Item label="Semester 3" value="semester 3" />
                    <Picker.Item label="Semester 4" value="semester 4" />
                    <Picker.Item label="Semester 5" value="semester 5" />
                    <Picker.Item label="Semester 6" value="semester 6" />
                    <Picker.Item label="Semester 7" value="semester 7" />
                  </Picker>
            </View>
         </View>

         <View style={style.containerCS}>
          <Text style={style.fontCS}>Course Code:</Text>
            <View style={style.containerCS3}>
            <Picker
                    selectedValue={selectedzValue}
                    style={style.dropdowncontainerCS}
                    onValueChange={(itemValue, itemIndex) => setSelectedzValue(itemValue)}
                  >
                    <Picker.Item label="GIG" value="gig" />
                    <Picker.Item label="GIW" value="giw" />
                    <Picker.Item label="WIA" value="wia" />
                    <Picker.Item label="WIB" value="wib" />
                    <Picker.Item label="WIC" value="wic" />
                    <Picker.Item label="WID" value="wid" />
                    <Picker.Item label="WIE" value="wie" />
                    <Picker.Item label="WIF" value="wif" />
                    <Picker.Item label="WIG" value="wig" />
                    <Picker.Item label="WIH" value="wih" />
                    <Picker.Item label="WIX" value="wix" />
                  </Picker>
            </View>
         </View>

         <View>
            <TouchableOpacity
            onPress= {() => {}}
            style={style.buttonFilter}>
                <Text style={style.buttonFilter} style={style.buttonText}>Filter</Text>
            </TouchableOpacity>
          </View>
      </KeyboardAvoidingView>

      <View>
      
        <Text style = {style.textCC}>
          WIE3009
        </Text>
        <Text style = {style.textCC1}>
          Enterprise System Design and Implementation
        </Text>
        <Text style = {style.textCC1}>
          Time: Thursday, 10.00 - 1.00 
        </Text>
        <Text style = {style.textCC1}>
          Tutorial Group: K 
        </Text>
        <Text style = {style.textCC1}>
          Lecturer: SUH 
        </Text>
        <Text style = {style.textCC1}>
          Location: online 
        </Text>

        <View style = {style.addButton}>
            <Icon
              name='plus'
              type='evilicon'
              color='#517fa4' 
              size={30}
              onPress={() => console.log('hello')} 
            />         
        </View>

          <View
              style={{
                borderBottomColor: 'lightgrey',
                borderBottomWidth: 1,
                marginTop: 5,
                width: 380,
                alignSelf: 'center',
              }}
          />

      <View>
            <TouchableOpacity
                 onPress= {pressHendlers}
                 style={style.buttonMC}>
                <Text style={style.buttonMC} style={style.buttonText}>My Course</Text>
            </TouchableOpacity>
          </View>
      </View>

        <Modal
        transparent ={true}
        visible={modalOpen}
        >
          <View style={{ backgroundColor:'#000000aa', flex: 1}}>
            <View style={{backgroundColor:'white', margin:40, height:550, borderRadius: 10}}> 

            <Text style={{ fontSize: 15, color: 'black', paddingTop: 20, paddingLeft: 20 }}>
              Available courses:
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

      </View>
      </ScrollView>
      
  
      </View>
    )
  }

  const style = StyleSheet.create({
    
      closeinfocontainer:{
        width:200,
        height: 40,
        alignSelf: 'center',
      },

      infocontainer: {
        width:370,
        height: 40,
        marginLeft:20
      },

      containerCS:{
        paddingLeft: 40,
        flexDirection: 'row',
      
      },

      containerCS1:{
        width: 230,
        marginLeft: 83,
        marginTop: 20,
        borderRadius: 20,
        height: 35,
        borderWidth:1,
        borderColor: 'steelblue'
      },

      containerCS2:{
        width: 230,
        marginLeft: 50,
        marginTop: 15,
        borderRadius: 20,
        height: 35,
        borderWidth:1,
        borderColor: 'steelblue'
      },

      containerCS3:{
        width: 230,
        marginLeft: 28,
        marginTop: 15,
        borderRadius: 20,
        height: 35,
        borderWidth:1,
        borderColor: 'steelblue'
      },

      fontCS:{
        fontSize: 15,
        paddingTop: 23 
      },

      fontCS1:{
        fontSize: 15,
        paddingTop: 27
        
      },

      fontInput:{
        paddingLeft: 20,
      },

      buttonFilter:{
        backgroundColor: 'skyblue',
        marginTop: 20,
        width: 100,
        height: 35,
        alignSelf: 'center',
        borderRadius: 20,
        alignSelf:'flex-end',
        marginRight: 25
      },

      buttonText:{
          alignSelf: 'center',
          paddingTop: 7,
          fontSize: 15
      },

      textCC:{
      marginLeft: 50,
      marginTop: 20,
      fontSize: 13,
      fontWeight: 'bold'
      },

      textCC1:{
        marginLeft: 50,
        marginTop: 5,
        fontSize: 12,
      },

      addButton:{
        alignSelf:'flex-end',
        marginRight: 25
      },

      buttonMC:{
        backgroundColor: 'skyblue',
        marginTop: 20,
        width: 100,
        height: 35,
        alignSelf: 'center',
        borderRadius: 20,
        alignSelf:'flex-end',
        marginRight: 25
      },

      buttomNavCont:{
        height: 60,
        backgroundColor:'lavender',
        flexDirection:'row',
        borderTopRightRadius: 20,
        borderTopLeftRadius:20,
        position:'absolute',
        marginTop: 533,
        width:412,
        
      },
      buttonNavHome:{
        marginLeft: 210,
        alignSelf:'center'
      },
    
      buttonNav:{
        marginLeft: 50,
        alignSelf:'center'
      },

      dropdowncontainerCS: {
        height: 34, 
        width: 230,
        fontSize:15,
      },

      });
