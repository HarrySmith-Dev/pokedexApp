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
        <View style={styles.outerCircle}>
          <View
            style={[
              {
                backgroundColor: colors.waterBlue,
                width: 70,
                height: 70,
                borderRadius: 35,
                borderWidth: 2,
                shadowColor: "black",
                shadowOffset: { width: 0, height: 1 },
                shadowOpacity: 0.8,
                shadowRadius: 2,
              },
            ]}
          >
            <View
              style={[
                styles.innerCircle,
                {
                  width: 20,
                  height: 20,
                  marginLeft: 10,
                  marginTop: 10,
                  borderRadius: 10,
                },
              ]}
            />
          </View>
        </View>
        <View
          style={[
            styles.circles,
            {
              backgroundColor: colors.red,
            },
          ]}
        >
          <View style={styles.innerCircle} />
        </View>
        <View
          style={[
            styles.circles,
            {
              backgroundColor: colors.goldenYellow,
            },
          ]}
        >
          <View style={styles.innerCircle} />
        </View>
        <View style={styles.circles}>
          <View style={styles.innerCircle} />
        </View>
      </View>
      <View style={styles.imageContainer}>
        <Image source={require("./img/pokedexImg.png")}></Image>
      </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button} onPress={() => OnPress()} />
        <View style={styles.triangle} />
      </View>

      <View style={styles.barContainer}>
        <View style={styles.bar} />
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
    width: 15,
    height: 15,
    borderWidth: 2,
    marginLeft: 12,
    shadowColor: "black",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
  },
  outerCircle: {
    backgroundColor: colors.white,
    padding: 10,
    borderRadius: 50,
    borderWidth: 2,
    marginRight: 20,
  },
  innerCircle: {
    width: 5,
    height: 5,
    borderRadius: 5,
    backgroundColor: colors.white,
    marginTop: 1.5,
    marginLeft: 0.5,
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
    flexDirection: "row-reverse",
  },
  button: {
    backgroundColor: colors.bostonRed,
    padding: 60,
    borderRadius: 60,
    marginRight: 60,
  },
  triangle: {
    backgroundColor: "transparent",
    borderStyle: "solid",
    borderTopWidth: 25, // Set the top border width to half the width of the triangle
    borderRightWidth: 25, // Set the right and left border widths to the same value as the top border width
    borderLeftWidth: 25,
    borderTopColor: colors.electricYellow,
    borderRightColor: "transparent",
    borderLeftColor: "transparent",
    transform: [{ rotate: "270deg" }], // Rotate the triangle by 45 degrees
    marginRight: 10,
  },
  barContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  bar: {
    borderWidth: 2,
    borderRadius: 10,
    padding: 5,
    paddingLeft: 80,
    paddingRight: 80,
  },
});

export default WelcomeScreen;
