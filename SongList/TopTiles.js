import React from "react";
import {
  View,
  Text,
  useWindowDimensions,
  TouchableOpacity,
} from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";

export default function TopTiles() {
  const { width, height } = useWindowDimensions();

  return (
    <View>
      <View style={{ flexDirection: "row" }}>
        <TouchableOpacity>
          <View
            style={{
              height: height * 0.1,
              width: width * 0.4,
              backgroundColor: "#ee6c4d",
              borderRadius: 10.0,
              justifyContent: "center",
              alignItems: "center",
              marginHorizontal: 5.0,
            }}
          >
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <Icon
                name="pan-tool"
                color="white"
                size={30.0}
                style={{ marginRight: 8.0 }}
              />

              <Text
                style={{ fontWeight: "bold", color: "white", fontSize: 15.0 }}
              >
                Hit List
              </Text>
            </View>
          </View>
        </TouchableOpacity>
        <TouchableOpacity>
          <View
            style={{
              height: height * 0.1,
              width: width * 0.4,
              backgroundColor: "#ffcb77",
              borderRadius: 10.0,
              justifyContent: "center",
              alignItems: "center",
              marginHorizontal: 5.0,
            }}
          >
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <Icon
                name="music-note"
                color="white"
                size={30.0}
                style={{ marginRight: 8.0 }}
              />

              <Text
                style={{ fontWeight: "bold", color: "white", fontSize: 15.0 }}
              >
                New Songs
              </Text>
            </View>
          </View>
        </TouchableOpacity>
      </View>
      <TouchableOpacity>
        <View
          style={{
            height: height * 0.1,
            width: width * 0.6,
            backgroundColor: "#227c9d",
            borderRadius: 10.0,
            justifyContent: "center",
            alignItems: "center",
            marginHorizontal: 5.0,
            marginTop: 10.0,
          }}
        >
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <Icon
              name="album"
              color="white"
              size={40.0}
              style={{ marginRight: 8.0 }}
            />

            <Text
              style={{ fontWeight: "bold", color: "white", fontSize: 18.0 }}
            >
              Discover Weekly
            </Text>
          </View>
        </View>
      </TouchableOpacity>
    </View>
  );
}
