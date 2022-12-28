import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
} from "react-native";
import colors from "./Colors";

const WelcomeScreen = ({ navigation }) => {
  const OnPress = () => {
    navigation.push("Pokedex");
  };

  return (
    <SafeAreaView style={styles.container}>
      <TouchableOpacity
        style={styles.button}
        onPress={() => OnPress()}
      ></TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.red,
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  button: {
    backgroundColor: colors.bostonRed,
    padding: 40,
    borderRadius: 40,
  },
});

export default WelcomeScreen;
