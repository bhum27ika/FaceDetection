import { NavigatorScreenParams } from '@react-navigation/native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { BottomTabScreenProps } from '@react-navigation/bottom-tabs';

// Auth Navigator Types
export type AuthStackParamList = {
  Onboarding: undefined;
  Login: undefined;
  SignUp: undefined;
};

// Main Navigator - Home Stack
export type HomeStackParamList = {
  HomeScreen: undefined;
  Questionnaire: undefined;
};

// Main Navigator - Analyze Stack
export type AnalyzeStackParamList = {
  AnalyzeScreen: undefined;
};

// Main Navigator - Recommendations Stack
export type RecommendationsStackParamList = {
  RecommendationsScreen: undefined;
};

// Main Navigator - Dermatologists Stack
export type DermatologistsStackParamList = {
  DermatologistsScreen: undefined;
};

// Main Navigator - Dashboard Stack
export type DashboardStackParamList = {
  DashboardScreen: undefined;
};

// Main Tab Navigator
export type MainTabParamList = {
  Home: NavigatorScreenParams<HomeStackParamList>;
  Analyze: NavigatorScreenParams<AnalyzeStackParamList>;
  Recommendations: NavigatorScreenParams<RecommendationsStackParamList>;
  Dermatologists: NavigatorScreenParams<DermatologistsStackParamList>;
  Dashboard: NavigatorScreenParams<DashboardStackParamList>;
};

// Root Navigator
export type RootParamList = {
  Auth: NavigatorScreenParams<AuthStackParamList>;
  Main: NavigatorScreenParams<MainTabParamList>;
};

// Screen Props
export type AuthScreenProps<T extends keyof AuthStackParamList> = NativeStackScreenProps<
  AuthStackParamList,
  T
>;

export type MainScreenProps<T extends keyof MainTabParamList> = BottomTabScreenProps<
  MainTabParamList,
  T
>;
