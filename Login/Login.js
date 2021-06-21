import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  useWindowDimensions,
  TextInput,
  TouchableOpacity,
  Alert,
} from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Home from "../Home/Home";
import LoginImage from "../assets/login.png";

export default function Login({ navigation }) {
  const { width, height } = useWindowDimensions();
  const [Email, setEmail] = useState(null);
  const [Password, setPassword] = useState(null);
  const [userAuth, setuserAuth] = useState(null);
  const [isLogged, setisLogged] = useState(null);

  const [validator, setvalidator] = useState({
    validuserName: true,
    validPassword: true,
  });

  const handleValidEmail = (val) => {
    if (
      val.nativeEvent.text.includes("@") &&
      val.nativeEvent.text.includes(".")
    ) {
      setvalidator({ ...validator, validuserName: true });
    } else {
      setvalidator({ ...validator, validuserName: false });
    }
  };

  const handleValidPassword = (val) => {
    if (val.nativeEvent.text.trim().length >= 8) {
      setvalidator({ ...validator, validPassword: true });
    } else {
      setvalidator({ ...validator, validPassword: false });
    }
  };

  const getData = async () => {
    try {
      const value = await AsyncStorage.getItem("userAuth");
      const isLogged = await AsyncStorage.getItem("isLogged");
      setisLogged(isLogged);

      if (value !== null) {
        setuserAuth(JSON.parse(value));
      }
    } catch (e) {
      console.log("null");
    }
  };

  const handleLogin = async () => {
    if (validator.validuserName && validator.validPassword) {
      if (Email === userAuth.userEmail && Password === userAuth.userPassword) {
        navigation.replace("Home");
        await AsyncStorage.setItem("isLogged", "01");
      } else {
        Alert.alert("User not registered ", "Please create an account", [
          {
            text: "Register",
            onPress: () => navigation.navigate("Register"),
            style: "cancel",
          },
        ]);
      }
    } else {
      Alert.alert(
        "Invalid Email or Password",
        "Please check email and password"
      );
    }
  };

  useEffect(() => {
    getData();
  }, []);

  if (isLogged === "02") {
    return (
      <View style={{ backgroundColor: "white", flex: 1 }}>
        <View style={{ padding: 20.0 }}>
          <Text style={style.loginFont}>Welcome</Text>
          <Image
            source={LoginImage}
            style={{
              width: width * 0.9,
              height: height * 0.4,
              marginTop: 20.0,
            }}
          />
          <View style={{ paddingTop: 30.0 }}>
            <View style={style.textInputView}>
              <Icon name="account-circle" color="gray" size={25} />
              <TextInput
                placeholder="Email"
                height="100%"
                width="100%"
                style={{ fontWeight: "bold", marginLeft: 5.0 }}
                onEndEditing={(val) => handleValidEmail(val)}
                onChangeText={(val) => setEmail(val.trim())}
              />
            </View>
            {validator.validuserName ? null : (
              <View style={{ marginLeft: 22.0, marginTop: 3.0 }}>
                <Text
                  style={{ color: "red", fontSize: 11.0, fontWeight: "bold" }}
                >
                  enter a valid email
                </Text>
              </View>
            )}
            <View style={style.textInputView}>
              <Icon name="lock" color="gray" size={25} />
              <TextInput
                placeholder="Password"
                secureTextEntry
                height="100%"
                width="100%"
                style={{ fontWeight: "bold", marginLeft: 5.0 }}
                onEndEditing={(val) => handleValidPassword(val)}
                onChangeText={(val) => setPassword(val.trim())}
              />
            </View>
            {validator.validPassword ? null : (
              <View style={{ marginLeft: 22.0, marginTop: 3.0 }}>
                <Text
                  style={{ color: "red", fontSize: 11.0, fontWeight: "bold" }}
                >
                  password must be 8 characters long
                </Text>
              </View>
            )}
          </View>
          <View style={{ alignItems: "center" }}>
            <TouchableOpacity onPress={() => handleLogin()}>
              <View
                style={{
                  backgroundColor: "#4760F0",
                  width: width * 0.4,
                  marginTop: 20.0,
                  alignItems: "center",
                  borderRadius: 5.0,
                }}
              >
                <Text
                  style={{
                    color: "white",
                    margin: 10.0,
                    fontWeight: "bold",
                    fontSize: 18.0,
                  }}
                >
                  Login
                </Text>
              </View>
            </TouchableOpacity>
          </View>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "center",
              marginTop: 60.0,
              alignItems: "center",
            }}
          >
            <Text style={{ color: "gray", fontWeight: "bold" }}>
              Don't have an account ?{" "}
            </Text>
            <TouchableOpacity onPress={() => navigation.navigate("Register")}>
              <View
                style={{
                  backgroundColor: "#25D5A6",
                  width: width * 0.2,

                  alignItems: "center",
                  borderRadius: 5.0,
                }}
              >
                <Text
                  style={{
                    color: "white",
                    margin: 2.0,
                    fontWeight: "bold",
                    fontSize: 14.0,
                  }}
                >
                  Create
                </Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  } else {
    return <Home />;
  }
}

const style = StyleSheet.create({
  loginFont: {
    fontWeight: "bold",
    fontSize: 30.0,
    color: "gray",
    marginTop: 60.0,
  },
  textInputView: {
    borderRadius: 5.0,
    borderWidth: 1,
    borderColor: "gray",
    padding: 10.0,
    marginTop: 10.0,
    marginHorizontal: 15.0,
    flexDirection: "row",
    alignItems: "center",
  },
});
