import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

export default function DashboardCard(props) {
  return (
    <View style={styles.card}>
      <View style={styles.cardContent}>{props.children}</View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    borderRadius: 8,
    elevation: 3,
    backgroundColor: '#B6D0E2',
    shadowOffset: { width: 4, height: 10 },
    shadowColor: '#000000',
    shadowOpacity: 0.6,
    shadowRadius: 10,
    marginHorizontal: 4,
    marginVertical: 6,
    padding: 12,
  },
  cardContent: {},
});
