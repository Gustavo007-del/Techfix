// E:\study\worker_inventory\worker_inventory_app\screens\AssignedItemsScreen.js
import React, { useEffect, useState } from "react";
import { View, Text, FlatList, Button, Alert } from "react-native";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { API_BASE_URL } from "../config/api";

export default function AssignedItemsScreen({ navigation }) {
  const [items, setItems] = useState([]);

  const loadAssignedItems = async () => {
    try {
      const token = await AsyncStorage.getItem("token");

      const response = await axios.get(
        `${API_BASE_URL}/api/assigned-items/`,
        { headers: { Authorization: `Bearer ${token}` } }
      );

      setItems(response.data);

    } catch (error) {
      console.log("Assigned Items Error:", error.response?.data || error.message);
      Alert.alert("Error", "Could not load assigned items.");
    }
  };

  useEffect(() => {
    loadAssignedItems();
  }, []);

  return (
    <View style={{ padding: 20 }}>
      <Text style={{ fontSize: 24, fontWeight: "bold" }}>
        Assigned Items
      </Text>
      

      <FlatList
        data={items}
        keyExtractor={item => item.id.toString()}
        renderItem={({ item }) => (
          <View
            style={{
              padding: 15,
              borderWidth: 1,
              borderRadius: 10,
              marginTop: 10,
            }}
          >
            <Text style={{ fontSize: 18 }}>
              Item: {item.item.name}
            </Text>
            <Text>Quantity Assigned: {item.assigned_quantity}</Text>

            <Button
              title="Use Item"
              onPress={() => navigation.navigate("SubmitUsage", { item })}
            />
          </View>
        )}
      />
    </View>
  );
}
