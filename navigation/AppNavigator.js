// E:\study\worker_inventory\worker_inventory_app\navigation\AppNavigator.js
import React from 'react';
import {
  DrawerContentScrollView,
  DrawerItemList,
  DrawerItem,
} from '@react-navigation/drawer';
import { Alert, ActivityIndicator, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createDrawerNavigator } from '@react-navigation/drawer';

// Context
import { AuthProvider, useAuth } from '../context/AuthContext';

// Screens
import LoginScreen from '../screens/LoginScreen';
import AdminDashboard from '../screens/AdminDashboard';
import AssignedItemsScreen from '../screens/AssignedItemsScreen';
import SubmitUsageScreen from '../screens/SubmitUsageScreen';
import UsageHistoryScreen from '../screens/UsageHistoryScreen';
import AdminApprovalsScreen from '../screens/AdminApprovalsScreen';
import StockScreen from '../screens/StockScreen';
import MembersListScreen from '../screens/MembersListScreen';
import MemberDetailScreen from '../screens/MemberDetailScreen';
import StockListScreen from '../screens/StockListScreen';
import StockEditScreen from '../screens/StockEditScreen';
import CreateCourierScreen from '../screens/CreateCourierScreen';
import CourierReceiveScreen from '../screens/CourierReceiveScreen';
import ReceivedCourierScreen from '../screens/ReceivedCourierScreen';
import WorkerLocationScreen from '../screens/WorkerLocationScreen';
import AttendanceScreen from '../screens/AttendanceScreen';

const Stack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();



function CustomDrawerContent(props) {
  const { signOut } = useAuth();

  const handleLogout = () => {
    Alert.alert(
      'Logout',
      'Are you sure you want to logout?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Logout',
          onPress: async () => {
            await signOut();
          },
          style: 'destructive',
        },
      ]
    );
  };

  return (
    <DrawerContentScrollView {...props}>
      <DrawerItemList {...props} />
      <DrawerItem
        label="Logout"
        onPress={handleLogout}
        labelStyle={{ color: '#FF3B30', fontWeight: 'bold' }}
      />
    </DrawerContentScrollView>
  );
}

// Member Screens (Drawer)
function MemberDrawer() {
  return (
    <Drawer.Navigator
      screenOptions={{
        headerShown: true,
      }}
      drawerContent={(props) => <CustomDrawerContent {...props} />}
    >
      <Drawer.Screen 
        name="Attendance" 
        component={AttendanceScreen} 
        options={{ title: "Attendance" }}
      />

      <Drawer.Screen 
        name="AssignedItems" 
        component={AssignedItemsScreen}
        options={{ drawerLabel: 'My Items', title: 'My Items' }}
      />
      <Drawer.Screen 
        name="SubmitUsage" 
        component={SubmitUsageScreen}
        options={{ drawerLabel: 'Submit Usage', title: 'Submit Usage' }}
      />
      <Drawer.Screen 
        name="History" 
        component={UsageHistoryScreen}
        options={{ drawerLabel: 'Usage History', title: 'Usage History' }}
      />
      <Drawer.Screen 
        name="StockView" 
        component={StockScreen}
        options={{ drawerLabel: 'View Stock', title: 'Stock' }}
      />
      <Drawer.Screen
        name="MembersList"
        component={MembersListScreen}
        options={{ drawerLabel: 'Members', title: 'Members' }}
      />
      <Drawer.Screen 
        name="MemberDetail" 
        component={MemberDetailScreen}
        options={({ route }) => ({
          drawerLabel: 'My Profile',
          title: 'My Profile',
          drawerItemStyle: { display: 'none' } // Hide from drawer, only accessible from MembersList
        })}
      />
      <Drawer.Screen 
        name="StockList" 
        component={StockListScreen}
        options={{ drawerLabel: 'Stock List', title: 'Stock List' }}
      />
      <Drawer.Screen 
        name="CreateCourier" 
        component={CreateCourierScreen}
        options={{ drawerLabel: 'Create Courier', title: 'Create Courier' }}
      />
      <Drawer.Screen 
        name="WorkerLocation" 
        component={WorkerLocationScreen}
        options={{ drawerLabel: 'Worker Locations', title: 'Worker Locations' }}
      />
    </Drawer.Navigator>
  );
}

// Admin Screens (Drawer)
function AdminDrawer() {
  return (
    <Drawer.Navigator
      screenOptions={{
        headerShown: true,
      }}
      drawerContent={(props) => <CustomDrawerContent {...props} />}
    >
      <Drawer.Screen 
        name="Dashboard" 
        component={AdminDashboard}
        options={{ drawerLabel: 'Dashboard', title: 'Admin Dashboard' }}
      />
      <Drawer.Screen 
        name="StockView" 
        component={StockScreen}
        options={{ drawerLabel: 'View Stock', title: 'Stock' }}
      />
      <Drawer.Screen 
        name="AdminApprovals" 
        component={AdminApprovalsScreen}
        options={{ drawerLabel: 'Approve Usage', title: 'Approve Usage' }}
      />
      <Drawer.Screen
        name="MembersList"
        component={MembersListScreen}
        options={{ drawerLabel: 'Members', title: 'Members' }}
      />
      <Drawer.Screen 
        name="MemberDetail" 
        component={MemberDetailScreen}
        options={({ route }) => ({ 
          drawerLabel: 'Member Profile',
          title: route.params?.memberName || 'Member Profile',
          drawerItemStyle: { display: 'none' } // Hide from drawer, only accessible from MembersList
        })}
      />
      <Drawer.Screen 
        name="StockList" 
        component={StockListScreen}
        options={{ drawerLabel: 'Stock List', title: 'Stock List' }}
      />
      <Drawer.Screen 
        name="StockEdit" 
        component={StockEditScreen}
        options={{
          drawerLabel: 'Edit Stock',
          title: 'Edit Stock',
          drawerItemStyle: { display: 'none' } // Hide from drawer, only accessible from StockList
        }}
      />
      <Drawer.Screen 
        name="CreateCourier" 
        component={CreateCourierScreen}
        options={{ drawerLabel: 'Create Courier', title: 'Create Courier' }}
      />
      <Drawer.Screen 
        name="CourierReceive" 
        component={CourierReceiveScreen}
        options={{ drawerLabel: 'Receive Courier', title: 'Receive Courier' }}
      />
      <Drawer.Screen 
        name="ReceivedCourier" 
        component={ReceivedCourierScreen}
        options={{ drawerLabel: 'Received Couriers', title: 'Received Couriers' }}
      />
      <Drawer.Screen 
        name="WorkerLocation" 
        component={WorkerLocationScreen}
        options={{ drawerLabel: 'Worker Locations', title: 'Worker Locations' }}
      />
    </Drawer.Navigator>
  );
}

// Navigation Component
function Navigation() {
  const { state } = useAuth();

  console.log('Navigation state:', state); // Debug log

  if (state.isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color="#007AFF" />
      </View>
    );
  }

  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
          animationEnabled: false,
        }}
      >
        {state.userToken == null ? (
          <Stack.Screen 
            name="Login" 
            component={LoginScreen}
            options={{ animationEnabled: false }}
          />
        ) : state.isAdmin ? (
          <>
          <Stack.Screen name="AdminApp" component={AdminDrawer} options={{ animationEnabled: false }}/>
          <Stack.Screen name="MemberDetailNav" component={MemberDetailScreen} />
          </>
        ) : (
          <Stack.Screen 
            name="MemberApp" 
            component={MemberDrawer}
            options={{ animationEnabled: false }}
          />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}

// Root Component
export default function AppNavigator() {
  return (
    <AuthProvider>
      <Navigation />
    </AuthProvider>
  );
}