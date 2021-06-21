import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  Platform,
  StatusBar,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import TopTiles from "./TopTiles";
import PlayList from "./PlayList";

export default function SongList({ navigation }) {
  const [userDetails, setuserDetails] = useState(null);
  const [isDataLoaded, setisDataLoaded] = useState(false);

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
          <TouchableOpacity
            onPress={() => navigation.openDrawer()}
            style={{
              backgroundColor: "#d8f3dc",
              width: 50.0,
              height: 50.0,
              marginTop: 15.0,
              borderRadius: 50.0,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <View>
              <Icon name="menu" color="black" size={30.0} />
            </View>
          </TouchableOpacity>
          <View style={{ marginTop: 30.0, marginLeft: 10.0 }}>
            <Text style={{ fontSize: 20.0 }}>Hello</Text>
            <Text style={{ fontSize: 30.0, fontWeight: "bold" }}>
              {userDetails.userName}
            </Text>
          </View>
          <View
            style={{ marginTop: 20.0, marginLeft: 10.0, alignItems: "center" }}
          >
            <TopTiles />
          </View>
          <View
            style={{
              marginLeft: 20.0,
              marginTop: 20.0,
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            <Icon name="music-note" size={20.0} />
            <Text style={{ fontWeight: "bold", fontSize: 15.0 }}>
              recently played
            </Text>
          </View>
          <ScrollView
            style={{ marginHorizontal: 10.0, marginTop: 20.0 }}
            showsVerticalScrollIndicator={false}
          >
            <PlayList navigation={navigation} />
          </ScrollView>
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
