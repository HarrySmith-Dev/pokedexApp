import React from "react";
import {
  SafeAreaView,
  Text,
  View,
  Image,
  StyleSheet,
  FlatList,
  Button,
} from "react-native";
import colors from "./Colors";
import { Ionicons } from "@expo/vector-icons";

const CurrentTeam = ({ navigation, route }) => {
  let item = route.params.data;

  return (
    <SafeAreaView style={styles.container}>
      <Button
        title="back"
        style={styles.button}
        onPress={() => {
          navigation.pop();
        }}
      >
        <Ionicons name="arrow-back" size={30} color={colors.ceruleanBlue} />
      </Button>
      <View style={styles.imageContainer}>
        <Image source={require("./img/your.png")}></Image>
        <Image source={require("./img/team.png")}></Image>
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
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.red,
    flex: 1,
  },
  button: {
    paddingVertical: 12,
    paddingHorizontal: 20,
    position: "absolute",
    top: 0,
    left: 0,
    alignItems: "center",
    marginTop: 100,
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
    justifyContent: "center",
    alignItems: "center",
  },
});
export default CurrentTeam;
