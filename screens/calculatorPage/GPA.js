import React, {useState, Component} from 'react';
import { render } from 'react-dom';
import RNPickerSelect from 'react-native-picker-select';
import { StyleSheet, 
    Text, 
    View, 
    Modal,
    Button,
    TextInput,
    Picker,
  } from 'react-native';

  export default function GPA(){

    const [modalOpen,  setModalOpenz] = useState(false);

    const [selectedValue, setSelectedValue] = useState("semester 1")

      return(
          <View style={{flex: 1, marginTop: 10}}>
          
            <View  style={style.infocontainer}>
               <Button 
               color="skyblue"
               title=" List of grade and method to calculate"
               onPress ={() =>  setModalOpenz (true)}
               > 
               </Button>
            </View>

            <View style={style.containerCS}>
              <Text style={style.fontCS}>Semesters:</Text>
                <View style={style.containerCS2}>
                  <Picker
                    selectedValue={selectedValue}
                    style={style.dropdowncontainer}
                    onValueChange={(itemValue, itemIndex) => setSelectedValue(itemValue)}
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

            <View style={style.Calcontainer}>  
                <Text style={{fontSize: 25, paddingLeft: 27, paddingTop: 15}}>4.00</Text>
            </View> 

            <View style={style.Calbox}>
                <View style={style.Calboxsubject} >
                    <Text style={{fontSize: 15, paddingLeft: 27, paddingTop: 15}}>Course Code,   3 credit</Text>
                </View>

                <View style={style.Calboxgrade} >
                    <Text style={{fontSize: 15, paddingLeft: 15, paddingTop: 15}}> Grade</Text>
                </View>
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

          </View>
      )
  }
  
  const style = StyleSheet.create({

      dropdowncontainer: {
        height: 34, 
        width: 255
      },

      infocontainer: {
        width:370,
        height: 40,
        marginLeft:20
      },
      closeinfocontainer:{
        width:200,
        height: 40,
        alignSelf: 'center',
        
      },

      Calcontainer: {
        backgroundColor: 'darkgrey',
        width:100,
        height: 60,
        marginTop: 10,
        borderRadius: 20,
        alignSelf: 'center'
      },

      Calbutton:{
        backgroundColor: 'lightblue',
        width: 100,
        borderRadius: 30,
        marginLeft:24,
        marginTop: 250,
        height: 40,
     },

     Calbox:{
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',  
        marginTop: 20,
      },

      Calboxsubject:{
        height: 50, 
        width: 280,
        borderRadius: 20,
        backgroundColor: 'powderblue'
      },
      
      Calboxgrade:{
        height: 50, 
        width: 80,
        borderRadius: 20,
        marginLeft:10,
        backgroundColor: 'skyblue'
      },

      containerCS:{
        paddingLeft: 40,
        flexDirection: 'row',
      },

      containerCS2:{
        width: 260,
        marginLeft: 10,
        marginTop: 15,
        borderRadius: 15,
        height: 35,
        borderWidth: 1,
        borderColor: 'steelblue',
        alignItems:'center'
      },

      fontCS:{
        fontSize: 15,
        paddingTop: 23,
         
      },

      fontInput:{
        paddingLeft: 20,
        paddingTop:2
        
      },

    })