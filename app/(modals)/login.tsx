import { defaultStyles } from '@/constants/styles';
import { useWarmUpBrowser } from '@/hooks/useWarmUpBrowser';
import React from 'react';
import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import { StyleSheet } from 'react-native';
import Colors from '@/constants/Colors';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useOAuth } from '@clerk/clerk-expo';
import { useRouter } from 'expo-router';

enum Strategy {
    Google = 'oauth_google',
}

const Page = () => {
    useWarmUpBrowser();
    const router = useRouter();

    const { startOAuthFlow: googleAuth } = useOAuth({ strategy: 'oauth_google' });

    const onSelectAuth = async (strategy: Strategy) => {
        const selectedAuth = {
            [Strategy.Google]: googleAuth,
        }[strategy];

        try {
            const { createdSessionId, setActive } = await selectedAuth();
            console.log("🚀 ~ onSelectAuth ~ createSessionId:", createdSessionId)
            console.log(router.canGoBack())
            if (createdSessionId) {
                setActive!({ session: createdSessionId })
                router.push('/(tabs)/');
            }

        } catch (error) {
            console.error("OAuth Error:", error)
        }
    }

    return (
        <View style={styles.container}>
            <TextInput autoCapitalize='none' placeholder='E-mail' style={[defaultStyles.inputField, { marginBottom: 30 }]} />
            <TouchableOpacity style={[defaultStyles.btn]}>
                <Text style={[defaultStyles.btnText]}>Login</Text>
            </TouchableOpacity>
            <View style={styles.separatorView}>
                <View style={
                    {
                        flex: 1,
                        borderBottomColor: Colors.darkGrey,
                        borderBottomWidth: StyleSheet.hairlineWidth,
                    }
                } />
                <Text style={styles.separator}>
                    or
                </Text>
                <View style={
                    {
                        flex: 1,
                        borderBottomColor: Colors.darkGrey,
                        borderBottomWidth: StyleSheet.hairlineWidth,
                    }
                } />
            </View>
            <View style={{ gap: 20 }}>
                <TouchableOpacity style={styles.btnOutline}>
                    <MaterialCommunityIcons name='cellphone' size={24} style={defaultStyles.btnIcon} color={Colors.grey} />
                    <Text style={styles.btnOutlineText}>
                        Continue with Phone
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.btnOutline} onPress={() => onSelectAuth(Strategy.Google)}>
                    <MaterialCommunityIcons name='google' size={24} style={defaultStyles.btnIcon} color={Colors.grey} />
                    <Text style={styles.btnOutlineText}>
                        Continue with Google
                    </Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        padding: 26,
    },
    separatorView: {
        flexDirection: 'row',
        gap: 10,
        alignItems: 'center',
        marginVertical: 30,
    },
    separator: {
        fontFamily: 'mont-sb',
        color: Colors.darkGrey,
    },
    btnOutline: {
        backgroundColor: '#fff',
        borderWidth: 1,
        borderColor: Colors.grey,
        height: 50,
        borderRadius: 8,
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
        paddingHorizontal: 10,
    },
    btnOutlineText: {
        color: Colors.grey,
        fontSize: 16,
        fontFamily: 'mont-b'
    },

});

export default Page;