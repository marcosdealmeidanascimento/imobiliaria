import { useWarmUpBrowser } from '@/hooks/useWarmUpBrowser';
import React from 'react';
import { View, Text } from 'react-native';
import { StyleSheet } from 'react-native';

const Page = () => {
    useWarmUpBrowser();

    return (
        <View style={styles.container}>
            <Text>Login Page</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        padding: 26,
    },
});

export default Page;