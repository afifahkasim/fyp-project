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
    paddingVertical: 20,
    backgroundColor: '#6F8FAF',
    paddingHorizontal: 1,
    elevation: 3,
    shadowOffset: { width: 1, height: 1 },
    shadowColor: '#333',
    shadowOpacity: 0.3,
    shadowRadius: 2,
  },
  buttonText: {
    color: 'black',
    fontFamily: "nunito-bold",
    fontSize: 20,
    textAlign: 'center',
  },
  container: {
    marginTop: 10,
    marginBottom: 20,
    marginHorizontal: 20,
    alignContent: 'center'
  }
});