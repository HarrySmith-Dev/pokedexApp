import axios from "axios";
import React, { useState, useEffect } from "react";
import colors from "./Colors";
import {
  View,
  Text,
  Image,
  FlatList,
  SafeAreaView,
  StyleSheet,
  TouchableHighlight,
} from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";

const DisplayPokedex = ({ navigation, route }) => {
  const [pokemon, setPokemon] = useState([]);

  useEffect(() => {
    for (let i = 1; i <= 151; i++) {
      axios
        .get(`https://pokeapi.co/api/v2/pokemon/${i}/`)
        .then((response) => {
          // The name can be found in response.data.name
          // The sprite can be found in response.data.sprites.front_default
          const name = response.data.name;
          const sprite = response.data.sprites.front_default;
          const id = response.data.id;
          const types = response.data.types.map((type) => type.type.name);
          setPokemon((prevPokemon) => [
            ...prevPokemon,
            { name, sprite, id, types },
          ]);
        })
        .catch((error) => {
          console.error(error);
        });
    }
  }, []);

  const sortPokemonData = pokemon.sort((a, b) => {
    if (a.id < b.id) return -1;
    if (a.id > b.id) return 1;
    return 0;
  });

  const OnPress = (item) => {
    let pokemonName = item.name;
    navigation.push("Pokemon Details", { data: item, name: pokemonName });
  };

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
    <FlatList
      data={sortPokemonData}
      numColumns={1}
      renderItem={({ item }) => (
        <SafeAreaView style={listStyles.container}>
          <TouchableOpacity onPress={() => OnPress(item)}>
            <View key={item.name} style={listStyles.infoCard}>
              <Image
                source={{ uri: item.sprite }}
                style={{ width: 150, height: 150 }}
              />
              <Text style={listStyles.font}>{item.name}</Text>
              {item.types.map((type, index) => (
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
          </TouchableOpacity>
        </SafeAreaView>
      )}
      keyExtractor={(item) => item.name}
    />
  );
};

const listStyles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: colors.red,
  },
  infoCard: {
    marginTop: 50,
    backgroundColor: colors.bostonRed,
    borderRadius: 10,
    padding: 25,
  },
  font: {
    textAlign: "center",
    fontSize: 20,
  },
});

export default DisplayPokedex;
