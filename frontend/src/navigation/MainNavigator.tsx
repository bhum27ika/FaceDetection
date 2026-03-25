import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from '../screens/main/HomeScreen';
import AnalyzeScreen from '../screens/main/AnalyzeScreen';
import RecommendationsScreen from '../screens/main/RecommendationsScreen';
import DermatologistsScreen from '../screens/main/DermatologistsScreen';
import DashboardScreen from '../screens/main/DashboardScreen';
import QuestionnaireScreen from '../screens/main/QuestionnaireScreen';
import { Home, Camera, Pill, Users, User } from 'lucide-react-native';
import {
  MainTabParamList,
  HomeStackParamList,
  AnalyzeStackParamList,
  RecommendationsStackParamList,
  DermatologistsStackParamList,
  DashboardStackParamList,
} from '../types/navigation';

const Tab = createBottomTabNavigator<MainTabParamList>();
const HomeStack = createNativeStackNavigator<HomeStackParamList>();
const AnalyzeStack = createNativeStackNavigator<AnalyzeStackParamList>();
const RecommendationsStack = createNativeStackNavigator<RecommendationsStackParamList>();
const DermatologistsStack = createNativeStackNavigator<DermatologistsStackParamList>();
const DashboardStack = createNativeStackNavigator<DashboardStackParamList>();

function HomeStackNavigator() {
  return (
    <HomeStack.Navigator
      screenOptions={{
        headerShown: true,
        headerStyle: { backgroundColor: '#FFFFFF' },
        headerTitleStyle: { fontFamily: 'Geist-Bold', fontSize: 18 },
      }}
    >
      <HomeStack.Screen
        name="HomeScreen"
        component={HomeScreen}
        options={{ title: 'DermaAI', headerShown: false }}
      />
      <HomeStack.Screen
        name="Questionnaire"
        component={QuestionnaireScreen}
        options={{ title: 'Complete Your Profile' }}
      />
    </HomeStack.Navigator>
  );
}

function AnalyzeStackNavigator() {
  return (
    <AnalyzeStack.Navigator
      screenOptions={{
        headerShown: true,
        headerStyle: { backgroundColor: '#FFFFFF' },
        headerTitleStyle: { fontFamily: 'Geist-Bold' },
      }}
    >
      <AnalyzeStack.Screen
        name="AnalyzeScreen"
        component={AnalyzeScreen}
        options={{ title: 'Skin Analysis' }}
      />
    </AnalyzeStack.Navigator>
  );
}

function RecommendationsStackNavigator() {
  return (
    <RecommendationsStack.Navigator
      screenOptions={{
        headerShown: true,
        headerStyle: { backgroundColor: '#FFFFFF' },
        headerTitleStyle: { fontFamily: 'Geist-Bold' },
      }}
    >
      <RecommendationsStack.Screen
        name="RecommendationsScreen"
        component={RecommendationsScreen}
        options={{ title: 'Skincare Plan' }}
      />
    </RecommendationsStack.Navigator>
  );
}

function DermatologistsStackNavigator() {
  return (
    <DermatologistsStack.Navigator
      screenOptions={{
        headerShown: true,
        headerStyle: { backgroundColor: '#FFFFFF' },
        headerTitleStyle: { fontFamily: 'Geist-Bold' },
      }}
    >
      <DermatologistsStack.Screen
        name="DermatologistsScreen"
        component={DermatologistsScreen}
        options={{ title: 'Find Dermatologist' }}
      />
    </DermatologistsStack.Navigator>
  );
}

function DashboardStackNavigator() {
  return (
    <DashboardStack.Navigator
      screenOptions={{
        headerShown: true,
        headerStyle: { backgroundColor: '#FFFFFF' },
        headerTitleStyle: { fontFamily: 'Geist-Bold' },
      }}
    >
      <DashboardStack.Screen
        name="DashboardScreen"
        component={DashboardScreen}
        options={{ title: 'My Profile' }}
      />
    </DashboardStack.Navigator>
  );
}

export default function MainNavigator() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: '#6B5FD9',
        tabBarInactiveTintColor: '#999999',
        tabBarStyle: {
          backgroundColor: '#FFFFFF',
          borderTopColor: '#E5E5E5',
          paddingBottom: 8,
          paddingTop: 8,
        },
        tabBarLabelStyle: {
          fontSize: 12,
          fontFamily: 'Geist',
          marginTop: 4,
        },
      }}
    >
      <Tab.Screen
        name="Home"
        component={HomeStackNavigator}
        options={{
          tabBarLabel: 'Home',
          tabBarIcon: ({ color }) => <Home size={24} color={color} />,
        }}
      />
      <Tab.Screen
        name="Analyze"
        component={AnalyzeStackNavigator}
        options={{
          tabBarLabel: 'Analyze',
          tabBarIcon: ({ color }) => <Camera size={24} color={color} />,
        }}
      />
      <Tab.Screen
        name="Recommendations"
        component={RecommendationsStackNavigator}
        options={{
          tabBarLabel: 'Plan',
          tabBarIcon: ({ color }) => <Pill size={24} color={color} />,
        }}
      />
      <Tab.Screen
        name="Dermatologists"
        component={DermatologistsStackNavigator}
        options={{
          tabBarLabel: 'Doctors',
          tabBarIcon: ({ color }) => <Users size={24} color={color} />,
        }}
      />
      <Tab.Screen
        name="Dashboard"
        component={DashboardStackNavigator}
        options={{
          tabBarLabel: 'Profile',
          tabBarIcon: ({ color }) => <User size={24} color={color} />,
        }}
      />
    </Tab.Navigator>
  );
}
