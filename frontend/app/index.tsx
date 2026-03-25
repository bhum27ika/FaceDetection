import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { AuthProvider } from "../src/context/AuthContext";
import { AppProvider } from "../src/context/AppContext"; // ✅ ADD THIS
import RootNavigator from "../src/navigation/RootNavigator";

export default function App() {
  return (
    <AuthProvider>
      <AppProvider> {/* ✅ WRAP HERE */}
        <NavigationContainer>
          <RootNavigator />
        </NavigationContainer>
      </AppProvider>
    </AuthProvider>
  );
}