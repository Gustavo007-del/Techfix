// E:\study\worker_inventory\worker_inventory_app\screens\SubmitUsageScreen.js
import React, { useState } from "react";
import { View, Text, Button, Image, TextInput, Alert } from "react-native";
import * as ImagePicker from "expo-image-picker";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { API_BASE_URL } from "../config/api";

export default function SubmitUsageScreen({ route, navigation }) {
  const { item } = route.params;
  const [photo, setPhoto] = useState(null);
  const [quantity, setQuantity] = useState("");

  const openCamera = async () => {
    const permission = await ImagePicker.requestCameraPermissionsAsync();
    if (!permission.granted) {
      Alert.alert("Permission required", "Enable camera permission.");
      return;
    }

    const result = await ImagePicker.launchCameraAsync({
      quality: 0.7,
    });

    if (!result.canceled) {
      setPhoto(result.assets[0]);
    }
  };

  const uploadUsage = async () => {
    if (!photo || !quantity) {
      Alert.alert("Error", "Please fill quantity and take a photo.");
      return;
    }

    const token = await AsyncStorage.getItem("token");

    let formData = new FormData();
    formData.append("item_id", item.item.id.toString());
    formData.append("quantity_used", quantity.toString());
    formData.append("photo", {
      uri: photo.uri,
      name: "usage.jpg",
      type: "image/jpeg",
    });

    try {
      const response = await axios.post(
        `${API_BASE_URL}/api/submit-usage/`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      Alert.alert("Success", "Usage submitted!");
      navigation.goBack();
    } catch (error) {
      console.log("UPLOAD ERROR:", error.response?.data || error.message);
      Alert.alert("Failed", "Could not submit usage.");
    }
  };

  return (
    <View style={{ padding: 20 }}>
      <Text style={{ fontSize: 22, fontWeight: "bold" }}>
        Use Item: {item.item.name}
      </Text>

      <TextInput
        placeholder="Quantity Used"
        keyboardType="numeric"
        value={quantity}
        onChangeText={setQuantity}
        style={{
          borderWidth: 1,
          padding: 12,
          borderRadius: 8,
          marginVertical: 10,
        }}
      />

      <Button title="Capture Photo" onPress={openCamera} />

      {photo && (
        <>
          <Image
            source={{ uri: photo.uri }}
            style={{
              width: 250,
              height: 250,
              marginVertical: 20,
              alignSelf: "center",
            }}
          />

          <Button title="Submit Usage" onPress={uploadUsage} />
        </>
      )}
    </View>
  );
}
