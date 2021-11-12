import React from 'react';
import { StyleSheet, TouchableOpacity, Text, View } from 'react-native';

export default function SubtitleButton({ text1, text2, onPress }) {
    return (
        <View style={styles.containerRegisterSubtitle}>
        <TouchableOpacity onPress={onPress} >
        <Text style={styles.textRegisterSubtitle}>{text1} 
          <Text style={{fontWeight: "bold"}}> {text2}</Text>
          </Text>
        </TouchableOpacity>
        </View>
    );
  }

  const styles = StyleSheet.create({
    containerRegisterSubtitle: {
        marginTop: 20,
        alignSelf: "center",
      },
  
      textRegisterSubtitle: {
        fontFamily: "nunito-light",
        color: "white",
        fontSize: 18,
      }

  });