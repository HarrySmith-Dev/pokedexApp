import React from "react";
import { SafeAreaView, Text, View, Image, Button } from "react-native";

const CurrentTeam = ({ navigation, route }) => {
  try {
    let item = route.params.data;
    const { name, sprite } = item;
    return (
      <SafeAreaView>
        <View key={name}>
          <Image soure={{ uri: { sprite } }}></Image>
          <Text>{name}</Text>
        </View>
      </SafeAreaView>
    );
  } catch (error) {
    alert(" Team not found!");
  }
};

export default CurrentTeam;
