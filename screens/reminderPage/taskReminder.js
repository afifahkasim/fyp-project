import React from 'react';
import {StyleSheet, View, Text} from 'react-native';
import { Icon } from 'react-native-elements';
  
  const Taskreminder = (props) => {

    return (
        <View style={style.item}>
            <View style={style.itemLeft}>
                <View style={style.square}>
                    <Icon
                        name='star'
                        type='font-awesome-5'
                        color='steelblue' 
                        size={15}
                        />
                </View>
                <Text style={style.tasktext}>{props.text}</Text>
            </View>
        </View>
    )
  }

  export default Taskreminder;
  
  const style = StyleSheet.create({
    item:{
        backgroundColor:'white',
        padding:15,
        borderRadius:10,
        flexDirection:'row',
        alignItems:'center',
        marginBottom: 20,
    },
    itemLeft:{
        flexDirection:'row',
        alignItems:'center',
        flexWrap:'wrap',
    },

    square:{
        //width:24,
        //height:24,
        //backgroundColor:'lightblue',
        //borderRadius:10,
        marginRight:20,
    },
    tasktext:{
        maxWidth:'80%'
    },
  });
