import { View, Text } from 'react-native';
import React from 'react';
import { Tabs } from 'expo-router';
import Colors from '@/constants/Colors';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { FontAwesome6 } from '@expo/vector-icons';

const Layout = () => {
    return (
        <Tabs screenOptions={{
            tabBarActiveTintColor: Colors.primary,
            tabBarLabelStyle: {
                fontFamily: 'mont-sb',
            },
        }}>
            <Tabs.Screen name="index" options={{
                tabBarLabel: 'Explore',
                tabBarIcon: ({ color, size }) => (
                    <MaterialCommunityIcons name="magnify" size={size} color={color} />
                ),
            }} />
            <Tabs.Screen name="wishlist" options={{
                tabBarLabel: 'Wishlist',
                tabBarIcon: ({ color, size }) => (
                    <MaterialCommunityIcons name="heart-outline" size={size} color={color} />
                ),
            }} />
            <Tabs.Screen name="trips" options={{
                tabBarLabel: 'Trips',
                tabBarIcon: ({ color, size }) => (
                    <FontAwesome6 name="airbnb" size={size} color={color} />
                ),
            }} />
            <Tabs.Screen name="inbox" options={{
                tabBarLabel: 'Inbox',
                tabBarIcon: ({ color, size }) => (
                    <MaterialCommunityIcons name="message-outline" size={size} color={color} />
                ),
            }} />
            <Tabs.Screen name="profile" options={{
                tabBarLabel: 'Profile',
                tabBarIcon: ({ color, size }) => (
                    <FontAwesome6 name="user-circle" size={size} color={color} />
                ),
            }} />
        </Tabs>
    )
};

export default Layout;