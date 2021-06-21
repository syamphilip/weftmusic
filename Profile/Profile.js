import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  Platform,
  StatusBar,
  TouchableOpacity,
  Image,
  useWindowDimensions,
} from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";
import Thumb from "../assets/thumb.png";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function Profile({ navigation }) {
  const [userDetails, setuserDetails] = useState(null);
  const [isDataLoaded, setisDataLoaded] = useState(false);
  const { width, height } = useWindowDimensions();
  useEffect(() => {
    getUserDetails();
  }, []);
  const getUserDetails = async () => {
    let data = await AsyncStorage.getItem("userAuth");
    setuserDetails(JSON.parse(data));
    setisDataLoaded(true);
  };
  if (isDataLoaded) {
    return (
      <SafeAreaView style={{ flex: 1 }}>
        <View style={styles.container}>
          <View style={{ marginTop: 10.0 }}>
            <Text style={{ color: "gray", fontWeight: "bold", fontSize: 28.0 }}>
              Profile
            </Text>
          </View>
          <View style={{ alignItems: "center", marginTop: 50.0 }}>
            <View
              style={{
                backgroundColor: "#4760F0",
                height: 100.0,
                width: 100.0,
                borderRadius: 10.0,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <View>
                <Image
                  source={Thumb}
                  style={{ height: 80, width: 80, borderRadius: 10.0 }}
                ></Image>
              </View>
            </View>
            <View>
              <Icon />
              <Text style={{ fontWeight: "bold", fontSize: 25.0 }}>
                {userDetails.userName}
              </Text>
            </View>
            <View
              style={{
                borderRadius: 5.0,
                borderWidth: 1,
                borderColor: "gray",
                padding: 10,
                marginTop: 20.0,
              }}
            >
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <View style={{ alignItems: "center", flexDirection: "row" }}>
                  <Icon name="email" />
                  <Text style={{ fontWeight: "bold", marginLeft: 5.0 }}>
                    {userDetails.userEmail}
                  </Text>
                </View>
                <Icon
                  name="check-circle"
                  color="#4760F0"
                  size={15.0}
                  style={{ marginLeft: 5.0 }}
                />
              </View>
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <View style={{ alignItems: "center", flexDirection: "row" }}>
                  <Icon name="smartphone" />
                  <Text style={{ fontWeight: "bold", marginLeft: 5.0 }}>
                    {userDetails.userMobile}
                  </Text>
                </View>
                <Icon
                  name="check-circle"
                  color="#4760F0"
                  size={15.0}
                  style={{ marginLeft: 5.0 }}
                />
              </View>
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <View style={{ alignItems: "center", flexDirection: "row" }}>
                  <Icon name="vpn-key" />
                  <Text style={{ fontWeight: "bold", marginLeft: 5.0 }}>
                    {userDetails.userPassword}
                  </Text>
                </View>
                <Icon
                  name="check-circle"
                  color="#4760F0"
                  size={15.0}
                  style={{ marginLeft: 5.0 }}
                />
              </View>
            </View>
          </View>

          <TouchableOpacity
            onPress={() => {
              navigation.navigate("Home");
            }}
          >
            <View
              style={{
                borderRadius: 5.0,
                backgroundColor: "#4760F0",

                width: width * 0.28,
                flexDirection: "row",
                alignItems: "center",
                padding: 10.0,
                marginTop: 30.0,
              }}
            >
              <Icon name="chevron-left" size={25.0} color="white" />
              <Text style={{ fontWeight: "bold", color: "white" }}>
                Go back
              </Text>
            </View>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  } else {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text>Loading...</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
    padding: 20.0,
  },
});
