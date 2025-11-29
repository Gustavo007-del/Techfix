// E:\study\worker_inventory\worker_inventory_app\navigation\AppNavigator.js
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SubmitUsageScreen from '../screens/SubmitUsageScreen';
import UsageHistoryScreen from '../screens/UsageHistoryScreen';
import AdminApprovalsScreen from "../screens/AdminApprovalsScreen";


import LoginScreen from '../screens/LoginScreen';
import AssignedItemsScreen from '../screens/AssignedItemsScreen';
import AdminDashboard from "../screens/AdminDashboard";


const Stack = createNativeStackNavigator();

export default function AppNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: true }}/>
        <Stack.Screen name="AssignedItems" component={AssignedItemsScreen} />
        <Stack.Screen name="SubmitUsage" component={SubmitUsageScreen} />
        <Stack.Screen name="History" component={UsageHistoryScreen} />
        <Stack.Screen name="AdminDashboard" component={AdminDashboard} />
        <Stack.Screen name="AdminApprovals" component={AdminApprovalsScreen} />

      </Stack.Navigator>
    </NavigationContainer>
  );
}
