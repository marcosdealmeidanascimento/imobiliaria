import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useFonts } from 'expo-font';
import { Stack, useRouter } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';
import { TouchableOpacity } from 'react-native';
import * as SecureStore from 'expo-secure-store'
import { ClerkProvider, useAuth } from '@clerk/clerk-expo';

const CLERK_PUBLISHABLE_KEY = process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY;

const tokenCache = {
  async getToken(key: string) {
    try {
      return await SecureStore.getItemAsync(key);
    } catch (err) {
      return null;
    }
  },
  async saveToken(key: string, value: string) {
    try {
      await SecureStore.setItemAsync(key, value);
    } catch (err) {
      return;
    }
  }
}

export {
  // Catch any errors thrown by the Layout component.
  ErrorBoundary,
} from 'expo-router';

export const unstable_settings = {
  // Ensure that reloading on `/modal` keeps a back button present.
  initialRouteName: '(tabs)',
};

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [loaded, error] = useFonts({
    'mont': require('@/assets/fonts/Montserrat-Regular.ttf'),
    'mont-b': require('@/assets/fonts/Montserrat-Bold.ttf'),
    'mont-sb': require('@/assets/fonts/Montserrat-SemiBold.ttf'),
  });

  // Expo Router uses Error Boundaries to catch errors in the navigation tree.
  useEffect(() => {
    if (error) throw error;
  }, [error]);

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
    <ClerkProvider publishableKey={CLERK_PUBLISHABLE_KEY!} tokenCache={tokenCache}>
      <RootLayoutNav />
    </ClerkProvider>
  );
}

function RootLayoutNav() {
  const router = useRouter();

  const { isLoaded, isSignedIn } = useAuth();

  useEffect(() => {
    if (isLoaded && !isSignedIn) {
      router.replace('/(modals)/login');
    }

  }, [isLoaded]);

  return (
    <Stack>
      <Stack.Screen
        name="(tabs)" options={{ headerShown: false }}
      />
      <Stack.Screen
        name="(modals)/login"
        options={{
          title: 'Login',
          animation: 'slide_from_bottom',
          headerTitleStyle: { fontFamily: 'mont-sb' },
          presentation: 'modal',
          headerLeft: () =>
            <TouchableOpacity onPress={() => router.push('/')}>
              <MaterialCommunityIcons name="close" size={24} color="black" />
            </TouchableOpacity>
        }}
      />
      <Stack.Screen
        name="listing/[id]"
        options={{
          headerTitle: ''
        }}
      >
      </Stack.Screen>
      <Stack.Screen
        name="(modals)/booking"
        options={{
          presentation: 'transparentModal',
          animation: 'fade',
          headerLeft: () =>
            <TouchableOpacity onPress={() => router.back()}>
              <MaterialCommunityIcons name="close" size={24} color="black" />
            </TouchableOpacity>
        }}
      >
      </Stack.Screen>
    </Stack>
  );
}
