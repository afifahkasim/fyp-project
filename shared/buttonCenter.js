import React from 'react';
import { StyleSheet, TouchableOpacity, Text, View } from 'react-native';

export default function CenterButton({ text, onPress }) {
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
    borderColor: "black",
    borderWidth: 1,
    paddingVertical: 20,
    paddingHorizontal: 1
  },
  buttonText: {
    color: 'black',
    fontFamily: "nunito-regular",
    fontSize: 18,
    textAlign: 'center',
  },
  container: {
    marginTop: 10,
    marginHorizontal: 20,
    alignContent: 'center'
  }
});