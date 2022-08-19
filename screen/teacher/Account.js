import React from "react";
import { View, Text, TouchableOpacity, ScrollView } from "react-native";
import { Avatar } from "react-native-paper";

const Account = ({navigation}) => {
  const accountdetails = [
    {
      id: "1",
      icon: "account",
      name: "Profile",
      routes: "Profile",
    },
    {
      id: "2",
      icon: "account-edit",
      name: "Edit profile",
      routes: "",
    },
    {
      id: "3",
      icon: "heart-multiple",
      name: "Likes",
      routes: "",
    },
    {
      id: "4",
      icon: "notebook",
      name: "Notebook",
      routes: "",
    },
    {
      id: "5",
      icon: "download",
      name: "Download",
      routes: "",
    },
    {
      id: "6",
      icon: "cog",
      name: "Settings",
      routes: "Setting",
    },
    {
      id: "7",
      icon: "weather-night",
      name: "Night mode",
      routes: "",
    },
    {
      id: "8",
      icon: "power",
      name: "Logout",
      routes: "Login",
    },
  ];

  return (
    <View>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View
          style={{
            backgroundColor: "lightgray",
            paddingBottom: 25,
            marginBottom: 3,
          }}
        >
          <Text style={{ fontWeight: "700", margin: 15 }}>Profile Image</Text>
          <TouchableOpacity>
            <Avatar.Image
              style={{ alignSelf: "center" }}
              source={require("../assets/icon.png")}
              size={130}
            />
          </TouchableOpacity>
        </View>

        {accountdetails.map(({ id, icon, name, routes }) => (
          <TouchableOpacity key={id} onPress={() => navigation.navigate(routes) }>
          <View
            style={{
              flexDirection: "row",
              display: "flex",
              alignItems: "baseline",
              marginBottom: 3,
              paddingHorizontal: 5,
              paddingVertical: 5,
              backgroundColor: "lightgray",
            }}
          >
            <Avatar.Icon
              style={{ backgroundColor: "darkgreen", margin: 5 }}
              icon={icon}
              size={40}
            />
            <Text
              style={{ fontSize: 15, fontWeight: "700", marginHorizontal: 15 }}
            >
              {name}
            </Text>
          </View>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
};

export default Account;
