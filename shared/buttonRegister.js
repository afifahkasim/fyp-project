import React from 'react';
import { StyleSheet, TouchableOpacity, Text, View } from 'react-native';

export default function RegisterButton({ text, onPress }) {
    return (
      <View style={styles.containerButtonRegister}>
      <TouchableOpacity onPress={onPress}>
        <View style={styles.buttonRegister}>
          <Text style={styles.buttonText}>{text}</Text>
        </View>
      </TouchableOpacity>
      </View>
    );
  }

  const styles = StyleSheet.create({
    buttonRegister: {
      width: 160,
      borderRadius: 10,
      borderColor: "white",
      borderWidth: 1,
      padding: 15,
  },

    buttonText: {
      color: 'white',
      fontFamily: "nunito-regular",
      fontSize: 18,
      textAlign: 'center',
    },

    containerButtonRegister: {
      marginTop: 15,
      alignSelf: "flex-end",
  },

  });