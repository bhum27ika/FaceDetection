import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useAuth } from '../context/AuthContext';
import { RootParamList } from '../types/navigation';
import AuthNavigator from './AuthNavigator';
import MainNavigator from './MainNavigator';
import { ActivityIndicator, View } from 'react-native';

const Stack = createNativeStackNavigator<RootParamList>();

export default function RootNavigator() {
  const { user, isLoading } = useAuth();

  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color="#6B5FD9" />
      </View>
    );
  }

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      {!user?.id ? (
        <Stack.Screen 
          name="Auth" 
          component={AuthNavigator}
          options={{ animation: 'none' }}
        />
      ) : (
        <Stack.Screen 
          name="Main" 
          component={MainNavigator}
          options={{ animation: 'none' }}
        />
      )}
    </Stack.Navigator>
  );
}
