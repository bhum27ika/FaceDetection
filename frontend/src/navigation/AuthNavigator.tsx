import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from '../screens/auth/LoginScreen';
import SignUpScreen from '../screens/auth/SignUpScreen';
import OnboardingScreen from '../screens/auth/OnboardingScreen';
import { AuthStackParamList } from '../types/navigation';

const Stack = createNativeStackNavigator<AuthStackParamList>();

export default function AuthNavigator() {
  return (
    <Stack.Navigator
        screenOptions={{
          headerShown: false,
          contentStyle: { backgroundColor: '#FFFFFF' },
          animation: 'slide_from_right',
        }}
      >
      <Stack.Screen 
        name="Onboarding" 
        component={OnboardingScreen}
        options={{ animation: 'none' }}
      />
      <Stack.Screen 
        name="Login" 
        component={LoginScreen}
        options={{ animation: 'none' }}
      />
      <Stack.Screen 
        name="SignUp" 
        component={SignUpScreen}
      />
    </Stack.Navigator>
  );
}
