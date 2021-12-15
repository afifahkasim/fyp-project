import React from 'react';
import {
    View,
    Text,
    Image,
    TouchableOpacity
} from 'react-native';

const ProfileCard2 = ({ icon, label, value, onPress }) => {
    return (
        <TouchableOpacity
            style={{
                flexDirection: 'row',
                height: 80,
                alignItems: 'center'
            }}
            onPress={onPress}
        >

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
                    source={icon}
                    resizeMode="contain"
                    style={{
                        width: 30,
                        height: 30,
                        // tintColor: "#194868"
                    }}
                />
            </View>

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
            <Image
                source={right_arrow}
                style={{
                    width: 15,
                    height: 15
                }}
            />
        </TouchableOpacity>
    )
}

export default ProfileCard2;

const right_arrow = require("../assets/icons/right-arrow.png");