import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  Image,
} from "react-native";
import colors from "./Colors";

const WelcomeScreen = ({ navigation }) => {
  const OnPress = () => {
    navigation.push("Pokedex");
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.row}>
        <View
          style={[
            styles.circles,
            {
              backgroundColor: colors.waterBlue,
              borderColor: colors.white,
              marginRight: 10,
              padding: 30,
              borderRadius: 35,
              borderWidth: 5,
            },
          ]}
        />
        <View
          style={[
            styles.circles,
            {
              backgroundColor: colors.red,
            },
          ]}
        />
        <View
          style={[
            styles.circles,
            {
              backgroundColor: colors.goldenYellow,
            },
          ]}
        />
        <View style={styles.circles} />
      </View>
      <View style={styles.imageContainer}>
        <Image source={require("./img/pokedexImg.png")}></Image>
      </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button} onPress={() => OnPress()} />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.red,
    flex: 1,
  },
  row: {
    flexDirection: "row",
    marginTop: 40,
    marginLeft: 20,
  },
  circles: {
    backgroundColor: colors.leafGreen,
    borderRadius: 10,
    width: 20,
    height: 20,
    borderWidth: 2,
    marginLeft: 10,
  },
  imageContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
  },
  buttonContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  button: {
    backgroundColor: colors.bostonRed,
    padding: 60,
    borderRadius: 60,
  },
});

export default WelcomeScreen;
