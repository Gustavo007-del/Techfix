// E:\study\worker_inventory\worker_inventory_app\screens\UsageHistoryScreen.js
import React, { useEffect, useState } from "react";
import { View, Text, Image, FlatList } from "react-native";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { API_BASE_URL } from "../config/api";

export default function UsageHistoryScreen() {
  const [logs, setLogs] = useState([]);

  const loadHistory = async () => {
    const token = await AsyncStorage.getItem("token");

    try {
      const response = await axios.get(
        `${API_BASE_URL}/api/history/`,
        {
          headers: { Authorization: `Bearer ${token}` }
        }
      );
      setLogs(response.data);

    } catch (error) {
      console.log(error.response?.data || error.message);
    }
  };

  useEffect(() => {
    loadHistory();
  }, []);

  return (
    <View style={{ padding: 20 }}>
      <Text style={{ fontSize: 24, fontWeight: "bold" }}>
        Usage History
      </Text>

      <FlatList
        data={logs}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View
            style={{
              padding: 12,
              marginTop: 15,
              borderWidth: 1,
              borderRadius: 10,
            }}
          >
            <Text>Item: {item.item.name}</Text>
            <Text>Quantity: {item.quantity_used}</Text>
            <Text>Status: {item.is_approved ? "Approved" : "Pending"}</Text>

            {item.photo && (
              <Image
                source={{ uri: `${API_BASE_URL}${item.photo}` }}
                style={{
                  width: 200,
                  height: 200,
                  marginTop: 10,
                  alignSelf: "center",
                }}
              />
            )}
          </View>
        )}
      />
    </View>
  );
}
