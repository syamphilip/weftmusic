import React from "react";
import {
  View,
  StatusBar,
  Platform,
  SafeAreaView,
  StyleSheet,
  Image,
  useWindowDimensions,
  Text,
  TouchableOpacity,
} from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import Thumb from "../assets/thumb.png";
import Icon from "react-native-vector-icons/MaterialIcons";

export default function SongDetails() {
  const navigation = useNavigation();
  const route = useRoute();
  const { title, date, album } = route.params;
  const { width, height } = useWindowDimensions();
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.container}>
        <View style={{ marginTop: 30.0 }}>
          <Text style={{ fontSize: 25.0, fontWeight: "bold" }}>
            Song Details
          </Text>
        </View>

        <View style={{ marginTop: 30.0 }}>
          <Text style={{ fontSize: 25.0, fontWeight: "bold", color: "gray" }}>
            {title}
          </Text>
        </View>
        <View style={{ marginVertical: 10.0 }}>
          <Image
            source={Thumb}
            style={{
              borderRadius: 10.0,
              height: height * 0.4,
              width: width * 0.8,
            }}
          />
        </View>
        <View>
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <Icon name="album" size={18.0} color="gray" />
            <Text
              style={{ fontWeight: "bold", marginLeft: 5.0, color: "gray" }}
            >
              Album :
            </Text>
          </View>
          <View>
            <Text
              style={{ fontSize: 15.0, color: "black", fontWeight: "bold" }}
            >
              {album}
            </Text>
          </View>
        </View>

        <View style={{ marginTop: 10.0 }}>
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <Icon name="event" size={18.0} color="gray" />
            <Text
              style={{ fontWeight: "bold", marginLeft: 5.0, color: "gray" }}
            >
              Created at :
            </Text>
          </View>
          <View>
            <Text style={{ fontSize: 15.0, fontWeight: "bold" }}>
              {Date(date)}
            </Text>
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
            <Text style={{ fontWeight: "bold", color: "white" }}>Go back</Text>
          </View>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
    padding: 20.0,
  },
});
