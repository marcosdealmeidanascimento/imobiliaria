import { useLocalSearchParams } from 'expo-router';
import React from 'react';
import { View, Text } from 'react-native';

const Page = () => {
    const { id } = useLocalSearchParams<{ id: string }>();

    return (
        <View>
            <Text>Hello, React Native!</Text>
        </View>
    );
};

export default Page;
