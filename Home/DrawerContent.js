import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  useWindowDimensions,
  TouchableOpacity,
} from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";
import { DrawerContentScrollView, DrawerItem } from "@react-navigation/drawer";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function DrawerContent({ ...props }) {
  const { height } = useWindowDimensions();
  const [isLoggedIn, setisLoggedIn] = useState(null);

  useEffect(() => {
    getLogState();
  }, []);

  const getLogState = async () => {
    let state = await AsyncStorage.getItem("isLogged");
    setisLoggedIn(state);
    console.log(state);
  };

  const handleSignOut = async () => {
    await AsyncStorage.setItem("isLogged", "02");
    console.log("done");
    props.navigation.replace("Login");
  };
  return (
    <DrawerContentScrollView {...props}>
      <DrawerItem
        onPress={() => {
          props.navigation.navigate("Home");
        }}
        label="Home"
        labelStyle={{ fontWeight: "bold", color: "white" }}
        icon={() => <Icon name="home" size={25} color="white" />}
        style={{
          backgroundColor: "#4760F0",
          borderRadius: 10.0,
          width: 200,
        }}
      />
      <DrawerItem
        onPress={() => {
          props.navigation.closeDrawer();
          props.navigation.navigate("Profile");
        }}
        label="Profile"
        labelStyle={{ fontWeight: "bold", color: "white" }}
        icon={() => <Icon name="person" size={25} color="white" />}
        style={{
          backgroundColor: "#4760F0",
          borderRadius: 10.0,
          width: 200,
        }}
      />

      <TouchableOpacity
        style={{ flex: 1, alignItems: "flex-end", paddingRight: 40.0 }}
        onPress={() => {
          handleSignOut();
        }}
      >
        <View
          style={{
            marginTop: height * 0.6,
            justifyContent: "center",
            borderRadius: 100.0,
            backgroundColor: "#4760F0",
            width: 50.0,
            height: 50.0,
            alignItems: "center",
          }}
        >
          <Icon name="logout" size={25} color="white" />
        </View>
      </TouchableOpacity>
    </DrawerContentScrollView>
  );
}
