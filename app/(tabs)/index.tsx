import React from 'react';
import { View, Text } from 'react-native';
import { Link } from 'expo-router';

const Page = () => {
    let i = 0;
    i++;
    console.log(i);
    return (
        <View>
            <Link href={'/(modals)/login'}>Login</Link>
            <Link href={'/(modals)/booking'}>Booking</Link>
            <Link href={'/listing/:id'}>Listing details</Link>
        </View>
    );
};

export default Page;
