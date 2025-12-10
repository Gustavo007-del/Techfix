// E:\study\techfix\techfix-app\App.js - Updated version

import React, { useEffect, useContext } from 'react';
import { ActivityIndicator, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { AuthProvider, AuthContext } from './src/context/AuthContext';
import { COLORS } from './src/theme/colors';

// Screens
import LoginChoiceScreen from './src/screens/LoginChoiceScreen';
import TechnicianLoginScreen from './src/screens/TechnicianLoginScreen';
import AdminLoginScreen from './src/screens/AdminLoginScreen';
import AttendanceScreen from './src/screens/AttendanceScreen';
import AdminDashboardScreen from './src/screens/AdminDashboardScreen';
import TechnicianListScreen from './src/screens/TechnicianListScreen';
import ManageTechniciansScreen from './src/screens/ManageTechniciansScreen';
import AdminAttendanceRecordScreen from './src/screens/AdminAttendanceRecordScreen';
import SparePendingScreen from './src/screens/SparePendingScreen';
import AdminSpareApprovalsScreen from './src/screens/AdminSpareApprovalsScreen';
import MyRequestsScreen from './src/screens/MyRequestsScreen';


const Stack = createNativeStackNavigator();


function RootNavigator() {
  const { state } = useContext(AuthContext);

  if (state.isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: COLORS.dark }}>
        <ActivityIndicator size="large" color={COLORS.primary} />
      </View>
    );
  }

  return (
    <NavigationContainer>
      {state.userToken == null ? (
        // Auth Stack
        <Stack.Navigator
          screenOptions={{
            headerShown: false,
          }}
        >
          <Stack.Screen name="LoginChoice" component={LoginChoiceScreen} />
          <Stack.Screen name="TechnicianLogin" component={TechnicianLoginScreen} />
          <Stack.Screen name="AdminLogin" component={AdminLoginScreen} />
        </Stack.Navigator>
      ) : state.role === 'technician' ? (
        <Stack.Navigator
          screenOptions={{
            headerShown: false,
          }}
        >
          <Stack.Screen name="Attendance" component={AttendanceScreen} />
          <Stack.Screen 
            name="SparePending" 
            component={SparePendingScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen 
            name="MyRequests" 
            component={MyRequestsScreen}
            options={{ headerShown: false }}
          />
        </Stack.Navigator>
      ) : (
        <Stack.Navigator
          screenOptions={{
            headerShown: false,
          }}
        >
          <Stack.Screen name="AdminDashboard" component={AdminDashboardScreen} />
          <Stack.Screen
            name="AdminAttendanceRecordScreen"
            component={AdminAttendanceRecordScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="AdminSpareApprovalsScreen"
            component={AdminSpareApprovalsScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="TechnicianList"
            component={TechnicianListScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="ManageTechnicians"
            component={ManageTechniciansScreen}
            options={{ headerShown: false }}
          />
        </Stack.Navigator>
      )}
    </NavigationContainer>
  );
}


export default function App() {
  return (
    <AuthProvider>
      <RootNavigator />
    </AuthProvider>
  );
}