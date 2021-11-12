import React from 'react';
import { StyleSheet, TouchableOpacity, Text, View } from 'react-native';

export default function FlatButton({ text, onPress }) {
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
    borderWidth: 1,
    paddingVertical: 20,
    paddingHorizontal: 1
  },
  buttonText: {
    color: 'white',
    fontFamily: "nunito-regular",
    fontSize: 18,
    textAlign: 'center',
  }
});