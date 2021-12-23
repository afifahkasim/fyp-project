import React, {useState} from 'react';
import { Icon } from 'react-native-elements';
import { StyleSheet, 
    Text, 
    View, 
    TouchableOpacity,
    Modal,
    Button,
    ScrollView,
    Image
   
  } from 'react-native';

  export default function CGPA(){

    const [modalOpen,  setModalOpenz] = useState(false);

    const [squares, setSquares] = useState([<Square />]);

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

          <View style={style.Calcontainer}>  
              <Text style={{fontSize: 25, paddingLeft: 27, paddingTop: 15}}>4.00</Text>
          </View> 

          <ScrollView>
          <View style={style.playingSpace}>
              {
              squares.map(elem => elem)
              }
          </View>
          </ScrollView>
            <View style={style.controlButton}>
              <View style={style.buttonViewPlus}>
              <Icon
                    raised
                    name='plus'
                    type='font-awesome-5'
                    color='steelblue' 
                    size={25}
                    onPress={() => setSquares([...squares, <Square/>])}
                    />
              </View>

              <View style={style.buttonViewMinus}>
              <Icon
                    raised
                    name='minus'
                    type='font-awesome-5'
                    color='steelblue' 
                    size={25}
                    onPress={() => setSquares(squares.filter((v, i) => i != squares.length - 1))}
                    />
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
               CGPA = Sum of Total grade point / Sum of total credit hours
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
      marginLeft:280,
      height: 40,
   },

   Calbox:{
      flex: 1,
      flexDirection: 'row',
      justifyContent: 'center',  
      marginTop: 10,
    },

    Calboxsemester:{
      height: 40, 
      width: 280,
      borderRadius: 20,
      backgroundColor: 'powderblue'
    },
    
    Calboxgrade:{ 
      height: 40, 
      width: 80,
      borderRadius: 20,
      marginLeft:10,
      backgroundColor: 'skyblue',
      alignItems:'center',
    },

    calbackbox:{
      height: 60, 
      width: 390,
      borderRadius: 20,
      marginLeft: 10,
    },

    controlButton: {
      flexDirection: 'row',
      backgroundColor:'transparent'
    },
    buttonViewPlus: {
      paddingLeft: 250,
      paddingBottom:10,
    },

    buttonViewMinus: {
      paddingLeft: 10,
      paddingBottom:10,
    },

  });

  const Square = () => (
  <View style={style.calbackbox}> 
    <View style={style.Calbox}>
        <View style={style.Calboxsemester} >
            <Text style={{fontSize: 15, paddingLeft: 27, paddingTop: 10}}>Semester 1</Text>
        </View>

        <View style={style.Calboxgrade} >
            <Text style={{fontSize: 15, paddingTop: 10}}> 4.0</Text>
        </View>
    </View>
  </View>
);