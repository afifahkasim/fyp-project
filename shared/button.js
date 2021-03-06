import React from 'react';
import { StyleSheet, TouchableOpacity, Text, View } from 'react-native';

export default function BlueButton({ text, onPress }) {
  return (
    <TouchableOpacity onPress={onPress}>
      <View style={styles.button}>
        <Text style={styles.buttonText}>{text}</Text>
      </View>
    </TouchableOpacity>
  );
}


const styles = StyleSheet.create({
  button: {
    borderRadius: 10,
    borderColor: "white",
    borderWidth: 2,
    paddingVertical: 20,
  },
  buttonText: {
    color: 'white',
    fontFamily: "nunito-bold",
    fontSize: 18,
    textAlign: 'center',
  }
});