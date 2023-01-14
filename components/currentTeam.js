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
          }}
        >
          <Ionicons
            name="arrow-back"
            size={40}
            color={colors.goldenYellow}
          ></Ionicons>
        </TouchableOpacity>
      </View>

      <View>
        <FlatList
          data={item}
          numColumns={2}
          renderItem={({ item }) => (
            <View key={item.name} style={styles.flatListContainer}>
              <View style={styles.infoCard}>
                <Image
                  source={{ uri: item.sprite }}
                  style={{ width: 150, height: 150 }}
                ></Image>
                <Text style={styles.font}>{item.name}</Text>
              </View>
            </View>
          )}
          keyExtractor={(item) => item.name}
        />
        <View style={styles.saveContainer}></View>
        <Text style={styles.saveFont}>Would you like to save this team?</Text>
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
  },
  flatListContainer: {
    flex: 1,
    justifyContent: "space-between",
    alignItems: "center",
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
    flex: 1,
    marginBottom: 10,
    backgroundColor: colors.ceruleanBlue,
    justifyContent: "center",
    alignItems: "center",
  },
  saveContainer: {
    marginTop: 30,
  },
  saveFont: {
    textAlign: "center",
    fontSize: 23,
    color: colors.white,
  },
});
export default CurrentTeam;
