import React from 'react';
import { StyleSheet, TouchableOpacity, Text, View } from 'react-native';

export default function BlueButton({ text, onPress }) {
  return (
    <View style={styles.container}>
    <TouchableOpacity onPress={onPress}>
      <View style={styles.button}>
        <Text style={styles.buttonText}>{text}</Text>
      </View>
    </TouchableOpacity>
    </View>
  );
}


const styles = StyleSheet.create({
  button: {
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 5,
    backgroundColor: '#6F8FAF',
  },
  buttonText: {
    color: 'white',
    fontFamily: "nunito-bold",
    fontSize: 14,
    textAlign: 'center',
  },
  container: {
    marginTop: 10,
    marginHorizontal: 5,
    alignContent: 'center'
  }
});