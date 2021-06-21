import axios from "axios";
import React, { useState, useEffect } from "react";
import { View, Text, Image, TouchableOpacity } from "react-native";
import Thumb from "../assets/thumb.png";
import Icon from "react-native-vector-icons/MaterialIcons";

export default function PlayList({ navigation }) {
  const [SongList, setSongList] = useState(null);
  const [isLoading, setisLoading] = useState(false);
  useEffect(() => {
    try {
      axios
        .get(
          "https://6006c4d63698a80017de1f20.mockapi.io/songs?page=2&limit=20"
        )
        .then((response) => response.data)
        .then((data) => {
          setSongList(data);
          setisLoading(true);
        });
    } catch (e) {
      console.log(e);
    }
  }, []);

  const handleNavigation = (title, date, album) => {
    navigation.navigate("SongDetails", {
      title,
      date,
      album,
    });
  };
  if (isLoading && SongList != null) {
    return (
      <View style={{ marginHorizontal: 10.0 }}>
        {SongList.map((SongList) => {
          return (
            <TouchableOpacity
              onPress={() =>
                handleNavigation(
                  SongList.title,
                  SongList.createdAt,
                  SongList.album
                )
              }
              key={SongList.id}
              style={{
                borderRadius: 8,
                backgroundColor: "white",
                padding: 10.0,
                marginVertical: 5.0,
                elevation: 0.8,
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              <View>
                <Image
                  source={Thumb}
                  style={{ borderRadius: 10.0, height: 70.0, width: 70.0 }}
                />
              </View>
              <View style={{ marginHorizontal: 10.0 }}>
                <Text style={{ fontWeight: "bold", fontSize: 15.0 }}>
                  {SongList.title}
                </Text>
                <Text style={{ fontSize: 12.0 }}>{SongList.album}</Text>
              </View>
              <View
                style={{
                  marginHorizontal: 10.0,
                  flex: 1,
                  justifyContent: "flex-end",
                  flexDirection: "row",
                }}
              >
                <Icon name="arrow-forward-ios" size={20.0} color="gray" />
              </View>
            </TouchableOpacity>
          );
        })}
      </View>
    );
  } else {
    return (
      <View style={{ alignItems: "center", marginTop: 20.0 }}>
        <Text style={{ fontWeight: "bold" }}>Song List Loading</Text>
      </View>
    );
  }
}
