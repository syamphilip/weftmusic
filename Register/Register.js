import React, { useState } from "react";
import {
  View,
  Text,
  Image,
  useWindowDimensions,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Icon from "react-native-vector-icons/MaterialIcons";
import RoundedLine from "../assets/roundedline.png";

export default function Register({ navigation }) {
  const { width, height } = useWindowDimensions();
  const [userDetails, setuserDetails] = useState({
    userName: null,
    userEmail: null,
    userMobile: null,
    userPassword: null,
    validEmail: true,
    validMobile: true,
    validPassword: true,
  });
  const handleValidMobile = (val) => {
    if (val.nativeEvent.text.length == 10) {
      setuserDetails({ ...userDetails, validMobile: true });
    } else {
      setuserDetails({ ...userDetails, validMobile: false });
    }
  };
  const handleValidPassword = (val) => {
    if (val.nativeEvent.text.length >= 8) {
      setuserDetails({ ...userDetails, validPassword: true });
    } else {
      setuserDetails({ ...userDetails, validPassword: false });
    }
  };
  const handleValidEmail = (val) => {
    if (
      val.nativeEvent.text.includes("@") &&
      val.nativeEvent.text.includes(".")
    ) {
      setuserDetails({ ...userDetails, validEmail: true });
    } else {
      setuserDetails({ ...userDetails, validEmail: false });
    }
  };
  const handleRegister = async () => {
    if (
      userDetails.validEmail &&
      userDetails.validMobile &&
      userDetails.validPassword
    ) {
      try {
        await AsyncStorage.setItem("userAuth", JSON.stringify(userDetails));
        navigation.navigate("Login");
      } catch (e) {
        console.log(e);
      }
    } else {
      console.log("error");
    }
  };

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: "white",
        justifyContent: "space-between",
      }}
    >
      <View style={{ marginTop: height * 0.1 }}>
        <Text
          style={{
            paddingLeft: 20.0,
            fontWeight: "bold",
            color: "gray",
            fontSize: 25.0,
            marginBottom: 20.0,
          }}
        >
          Sign Up
        </Text>
        <View style={style.textInputView}>
          <Icon name="account-circle" color="gray" size={25} />
          <TextInput
            placeholder="Full Name"
            style={{ fontWeight: "bold", marginLeft: 5.0 }}
            height="100%"
            width="100%"
            onChangeText={(val) =>
              setuserDetails({ ...userDetails, userName: val.trim() })
            }
          />
        </View>
        <View style={style.textInputView}>
          <Icon name="email" color="gray" size={25} />
          <TextInput
            placeholder="Email"
            style={{ fontWeight: "bold", marginLeft: 5.0 }}
            height="100%"
            width="100%"
            onChangeText={(val) =>
              setuserDetails({ ...userDetails, userEmail: val.trim() })
            }
            onEndEditing={(val) => handleValidEmail(val)}
          />
        </View>
        {userDetails.validEmail ? null : (
          <View style={{ marginLeft: 22.0, marginTop: 3.0 }}>
            <Text style={{ color: "red", fontSize: 11.0, fontWeight: "bold" }}>
              enter a valid email
            </Text>
          </View>
        )}
        <View style={style.textInputView}>
          <Icon name="smartphone" color="gray" size={25} />
          <TextInput
            placeholder="Mobile Number"
            style={{ fontWeight: "bold", marginLeft: 5.0 }}
            height="100%"
            width="100%"
            keyboardType="numeric"
            onChangeText={(val) =>
              setuserDetails({ ...userDetails, userMobile: val.trim() })
            }
            onEndEditing={(val) => handleValidMobile(val)}
          />
        </View>
        {userDetails.validMobile ? null : (
          <View style={{ marginLeft: 22.0, marginTop: 3.0 }}>
            <Text style={{ color: "red", fontSize: 11.0, fontWeight: "bold" }}>
              enter a valid mobile number
            </Text>
          </View>
        )}
        <View style={style.textInputView}>
          <Icon name="lock" color="gray" size={25} />
          <TextInput
            placeholder="Password"
            secureTextEntry
            style={{ fontWeight: "bold", marginLeft: 5.0 }}
            height="100%"
            width="100%"
            onChangeText={(val) =>
              setuserDetails({ ...userDetails, userPassword: val.trim() })
            }
            onEndEditing={(val) => handleValidPassword(val)}
          />
        </View>
        {userDetails.validPassword ? null : (
          <View style={{ marginLeft: 22.0, marginTop: 3.0 }}>
            <Text style={{ color: "red", fontSize: 11.0, fontWeight: "bold" }}>
              password must be 8 characters long
            </Text>
          </View>
        )}
        <View style={{ marginLeft: 20.0, marginTop: 8.0 }}>
          <Text style={{ fontSize: 12.0, fontWeight: "bold", color: "gray" }}>
            by creating account you agree with terms and conditions
          </Text>
        </View>
        <TouchableOpacity onPress={() => handleRegister()}>
          <View
            style={{
              backgroundColor: "#4760F0",
              width: width * 0.4,
              marginTop: 10.0,
              alignItems: "center",
              borderRadius: 5.0,
              marginLeft: 20.0,
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
              Create Account
            </Text>
          </View>
        </TouchableOpacity>
      </View>
      <View>
        <Image
          source={RoundedLine}
          style={{ height: height * 0.3, width: width }}
        />
      </View>
    </View>
  );
}

const style = StyleSheet.create({
  textInputView: {
    borderRadius: 5.0,
    borderWidth: 1,
    borderColor: "gray",
    padding: 10.0,
    marginTop: 10.0,
    marginHorizontal: 20.0,
    flexDirection: "row",
    alignItems: "center",
  },
});
