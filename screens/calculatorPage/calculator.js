import React from 'react';
import { Icon } from 'react-native-elements';
import { StyleSheet, 
    Text, 
    View, 
    Pressable,
  } from 'react-native';

  export default function Calculator({navigation}){

  const GPAPressHandler = () => {  
    navigation.navigate('GPA');  
  }
  const CGPAPressHandler = () => {  
    navigation.navigate('CGPA');  
  }

  const press = () => {  
    navigation.navigate('Profile');  
  }

  const pressHome = () => {  
    navigation.navigate('Data-U');  
  }

  
  
      return(
        <View>
          <View style={style.frontcalcontainer}>
          <Pressable onPress={GPAPressHandler}>
              <View style={style.frontcalbutton}>
                <Text style={style.frontcaltext}>GPA calculator</Text>
              </View>
          </Pressable>

          <Pressable onPress={CGPAPressHandler}>
              <View style={style.frontcalbutton}>
                <Text style={style.frontcaltext}>CGPA calculator</Text>
              </View>
          </Pressable>
          
          </View>

          <View style= {style.buttomNavCont}>
                <View style={style.buttonNavHome}>
                    <Icon
                    name='home'
                    type='font-awesome-5'
                    color='steelblue' 
                    size={20}
                    onPress={pressHome}
                    />
                </View> 

                <View style={style.buttonNav}>
                    <Icon
                    solid
                    name='user'
                    type='font-awesome-5'
                    color='steelblue' 
                    size={20}
                    onPress={press}
                    />
                </View>

                <View style={style.buttonNav}>
                    <Icon
                    name='cog'
                    type='font-awesome-5'
                    color='steelblue' 
                    size={20}
                    //onPress={press}
                    />
                </View>
            </View>

        </View>
      )
  }

  const style = StyleSheet.create({
    frontcalbutton:{
      width: 300,
      height: 50,
      borderRadius: 20,
      alignSelf: 'center',
      backgroundColor: 'skyblue',
      marginTop: 20
    },
    frontcalcontainer:{
      marginTop: 100
    },
    frontcaltext:{
      textAlign: 'center',
      fontSize: 15,
      paddingTop: 15
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
    })