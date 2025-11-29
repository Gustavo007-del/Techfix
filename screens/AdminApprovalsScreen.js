// E:\study\worker_inventory\worker_inventory_app\screens\AdminApprovalsScreen.js
import React, { useEffect, useState } from "react";
import { View, Text, Image, Button, FlatList, Alert } from "react-native";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { API_BASE_URL } from "../config/api";

export default function AdminApprovalsScreen() {
  const [logs, setLogs] = useState([]);

  const loadPending = async () => {
    try {
      const token = await AsyncStorage.getItem("token");

      const response = await axios.get(
        `${API_BASE_URL}/api/pending-usage/`,
        { headers: { Authorization: `Bearer ${token}` } }
      );

      setLogs(response.data);
    } catch (err) {
      console.log(err);
      Alert.alert("Error", "Could not load pending usage");
    }
  };

  const approveUsage = async (id) => {
    try {
      const token = await AsyncStorage.getItem("token");

      await axios.post(
        `${API_BASE_URL}/api/approve-usage/${id}/`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );

      Alert.alert("Approved", "Quantity updated!");
      loadPending(); // refresh list
    } catch (err) {
      console.log(err);
      Alert.alert("Error", "Approval failed");
    }
  };

  useEffect(() => {
    loadPending();
  }, []);

  return (
    <View style={{ padding: 20 }}>
      <Text style={{ fontSize: 26, fontWeight: "bold" }}>
        Pending Approvals
      </Text>

      <FlatList
        data={logs}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View
            style={{
              padding: 15,
              borderWidth: 1,
              borderRadius: 10,
              marginTop: 15,
            }}
          >
            <Text style={{ fontSize: 18, fontWeight: "bold" }}>
              Worker: {item.worker_name}
            </Text>
            <Text>Item: {item.item_name}</Text>
            <Text>Quantity Used: {item.quantity_used}</Text>

            <Image
              source={{ uri: `${API_BASE_URL}${item.photo}` }}
              style={{ width: 150, height: 150, marginTop: 10 }}
            />

            <Button
              title="Approve"
              color="green"
              onPress={() => approveUsage(item.id)}
            />
          </View>
        )}
      />
    </View>
  );
}
