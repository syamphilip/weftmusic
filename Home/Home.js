import React from "react";
import {} from "react-native";
import { createDrawerNavigator } from "@react-navigation/drawer";
import SongList from "../SongList/SongList";
import DrawerContent from "./DrawerContent";
const Drawer = createDrawerNavigator();

export default function Home({ navigation }) {
  return (
    <Drawer.Navigator
      initialRouteName={SongList}
      drawerStyle={{
        width: 250,
        paddingTop: 20.0,
      }}
      drawerContent={(props) => <DrawerContent {...props} />}
    >
      <Drawer.Screen name="Home" component={SongList} />
    </Drawer.Navigator>
  );
}
