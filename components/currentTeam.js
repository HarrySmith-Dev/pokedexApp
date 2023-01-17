/**
 * @fileoverview This component displays the users current team that they saved from the NewTeam component
 */
import React from "react";
import {
  SafeAreaView,
  Text,
  View,
  Image,
  StyleSheet,
  FlatList,
  TouchableOpacity,
} from "react-native";
import colors from "./Colors";
import { Ionicons } from "@expo/vector-icons";

const CurrentTeam = ({ navigation, route }) => {
  let item = route.params.data;

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => {
            navigation.pop();
            //Utilizing navigation prop to pop the current screen back to the previous screen using a button
          }}
        >
          <Ionicons
            name="arrow-back"
            size={40}
            color={colors.goldenYellow}
          ></Ionicons>
        </TouchableOpacity>
      </View>
      <View style={styles.imageContainer}>
        <Image source={require("./img/your.png")} />
        <Image source={require("./img/team.png")} />
      </View>
      <View>
        <FlatList
          data={item}
          numColumns={3}
          renderItem={({ item }) => (
            <View key={item.name} style={styles.flatListContainer}>
              <View style={styles.infoCard}>
                <Image
                  source={{ uri: item.sprite }}
                  style={{ width: 120, height: 120 }}
                ></Image>
                <Text style={styles.font}>{item.name}</Text>
              </View>
            </View>
          )}
          keyExtractor={(item) => item.id}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.red,
    flex: 1,
  },
  buttonContainer: {
    marginBottom: 70,
    marginLeft: 10,
  },
  button: {
    paddingVertical: 12,
    paddingHorizontal: 20,
    position: "absolute",
    alignItems: "center",
    top: 0,
    left: 0,
    marginTop: 20,
  },
  flatListContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 60,
  },
  infoCard: {
    backgroundColor: colors.bostonRed,
    marginTop: 10,
    borderRadius: 10,
  },
  font: {
    textAlign: "center",
    fontSize: 20,
    color: colors.white,
  },
  imageContainer: {
    marginTop: 20,
    alignItems: "center",
  },
});
export default CurrentTeam;
