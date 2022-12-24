import { Ionicons } from "@expo/vector-icons";
import React from "react";
import {
  SafeAreaView,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  View,
} from "react-native";
import colors from "./Colors";

const PokemonDetails = ({ navigation, route }) => {
  let item = route.params.data;
  const { name, sprite, id, types } = item;
  const typeColors = {
    fire: "red",
    water: "blue",
    grass: "green",
    electric: "yellow",
    psychic: "purple",
    flying: "lightblue",
    poison: "purple",
    bug: "darkgreen",
    normal: "white",
    ground: "brown",
    fairy: "pink",
    fighting: "black",
    rock: "gold",
    steel: "grey",
    ice: "white",
    dragon: "blue",
    ghost: "lightgrey",
  };

  return (
    <SafeAreaView style={{ backgroundColor: colors.bostonRed, flex: 1 }}>
      <View style={styles.container}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => {
            navigation.pop();
          }}
        >
          <Ionicons name="arrow-back" size={30} color={colors.ceruleanBlue} />
        </TouchableOpacity>

        <Image
          source={{ uri: sprite }}
          style={{ width: 250, height: 250 }}
        ></Image>
        <Text style={styles.titleFont}>{name}</Text>
        {id >= 100 ? (
          <Text style={styles.smallFont}>#{id}</Text>
        ) : id <= 99 && id >= 10 ? (
          <Text style={styles.smallFont}>#0{id}</Text>
        ) : (
          <Text style={styles.smallFont}>#00{id}</Text>
        )}
        {types.map((type, index) => (
          <Text
            key={index}
            style={{
              backgroundColor: typeColors[type],
              color: colors.white,
              borderWidth: 1,
              overflow: "hidden",
              borderRadius: 10,
              borderColor: typeColors[type],
              textAlign: "center",
              marginTop: 5,
            }}
          >
            {type}
          </Text>
        ))}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  button: {
    paddingVertical: 12,
    paddingHorizontal: 20,
    position: "absolute",
    top: 0,
    left: 0,
    alignItems: "center",
    marginTop: 20,
  },
  titleFont: {
    fontSize: 30,
    color: colors.white,
  },
  smallFont: {
    font: 12,
    color: colors.white,
  },
  typeFont: {
    fontSize: 15,
    color: colors.white,
  },
  buttonText: {
    fontSize: 16,
    color: colors.white,
  },
});

export default PokemonDetails;
