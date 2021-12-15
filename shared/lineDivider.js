import React from 'react';
import { View } from 'react-native';

export default function LineDivider({ lineStyle }) {
    return (
        <View
            style={{
                height: 2,
                width: "100%",
                backgroundColor: '#898C95',
                ...lineStyle
            }}
        />
    )
}
