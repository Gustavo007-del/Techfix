// E:\study\worker_inventory\worker_inventory_app\screens\AdminDashboard.js
import { View, Text, Button } from "react-native";

export default function AdminDashboard({ navigation }) {
  return (
    <View style={{ padding: 20 }}>
      <Text style={{ fontSize: 24, fontWeight: "bold" }}>Admin Dashboard</Text>

      <Button
        title="View Pending Approvals"
        onPress={() => navigation.navigate("AdminApprovals")}
      />
      
    </View>
  );
}
