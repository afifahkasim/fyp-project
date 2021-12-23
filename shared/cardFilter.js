import React from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';

export default function FilterCard({label, value}) {
  return (
    <View style={styles.card}>
      
      {/* Label & Value */}
      <View
        style={{
          flex: 1,
          marginLeft: 12
        }}
      >
        {label &&
          <Text
            style={{
              color: "#BEC1D2",
              fontFamily: "nunito-bold", fontSize: 16, lineHeight: 22
            }}
          >
            {label}
          </Text>
        }

        <Text
          style={{
            fontFamily: "nunito-bold", fontSize: 16, lineHeight: 22
          }}
        >
          {value}
        </Text>
      </View>

      {/* Icon */}
      <View
        style={{
          width: 40,
          height: 40,
          alignItems: 'center',
          justifyContent: 'center',
          borderRadius: 20,
          // backgroundColor: '#95A9B8'
        }}
      >
        <Image
          source={down_arrow}
          resizeMode="contain"
          style={{
            width: 13,
            height: 13 ,
          }}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    flexDirection: 'row',
    borderRadius: 6,
    elevation: 3,
    shadowOffset: { width: 1, height: 1 },
    shadowColor: '#333',
    shadowOpacity: 0.3,
    shadowRadius: 2,
    marginHorizontal: 4,
    marginTop: 12,
    padding: 6,
    width: "50%",
    alignItems: 'center'
  },
  cardContent: {
  },
});

const down_arrow = require("../assets/icons/down-arrow.png");