// E:\study\worker_inventory\worker_inventory_app\screens\LoginScreen.js
import React, { useState } from "react";
import { View, Text, TextInput, Button, Alert } from "react-native";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { API_BASE_URL } from "../config/api";

export default function LoginScreen({ navigation }) {

  console.log("API URL:", API_BASE_URL);  // <-- MOVE HERE

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    console.log("Calling:", `${API_BASE_URL}/api/login/`);

    try {
      const response = await axios.post(`${API_BASE_URL}/api/login/`, {
        username,
        password
      });

      console.log("LOGIN RESPONSE:", response.data);

      const token = response.data.access;
      const isAdmin = response.data.is_staff;

      await AsyncStorage.setItem("token", token);
      await AsyncStorage.setItem("isAdmin", isAdmin ? "true" : "false");

      if (isAdmin) {
        navigation.replace("AdminDashboard");
      } else {
        navigation.replace("AssignedItems");
      }

    } catch (error) {
      console.log("LOGIN ERROR:", error?.response?.data);
      console.log("DETAIL:", error?.message);
      Alert.alert("Login Failed", "Invalid username or password");
    }
  };

  return (
    <View style={{ padding: 30 }}>
      <Text style={{ fontSize: 26, fontWeight: "bold", marginBottom: 20 }}>
        Worker Login
      </Text>

      <TextInput
        placeholder="Username"
        value={username}
        onChangeText={setUsername}
        style={{
          borderColor: "#aaa",
          borderWidth: 1,
          padding: 12,
          borderRadius: 8,
          marginBottom: 15,
        }}
      />

      <TextInput
        placeholder="Password"
        value={password}
        secureTextEntry
        onChangeText={setPassword}
        style={{
          borderColor: "#aaa",
          borderWidth: 1,
          padding: 12,
          borderRadius: 8,
          marginBottom: 20,
        }}
      />

      <Button title="Login" onPress={handleLogin} />
    </View>
  );
}
