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

const DisplayPokedex = () => {
  const [pokemon, setPokemon] = useState([]);

  useEffect(() => {
    for (let i = 1; i <= 100; i++) {
      axios
        .get(`https://pokeapi.co/api/v2/pokemon/${i}?sort=`)
        .then((response) => {
          // The name can be found in response.data.name
          // The sprite can be found in response.data.sprites.front_default
          const name = response.data.name;
          const sprite = response.data.sprites.front_default;
          const id = response.data.id;
          setPokemon((prevPokemon) => [...prevPokemon, { name, sprite, id }]);
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
    navigation.push("Pokemon Details", { pokemon: item, name: pokemonName });
  };

  return (
    <FlatList
      data={sortPokemonData}
      numColumns={1}
      renderItem={({ item }) => (
        <SafeAreaView style={listStyles.container}>
          <TouchableHighlight>
            <View style={listStyles.infoCard}>
              <Image
                source={{ uri: item.sprite }}
                style={{ width: 150, height: 150 }}
              />
              <Text style={listStyles.font}>{item.name}</Text>
            </View>
          </TouchableHighlight>
        </SafeAreaView>
      )}
      keyExtractor={(item, index) => index.toString()}
    />
  );
};

const listStyles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: colors.bostonRed,
  },
  infoCard: {
    marginTop: 50,
    backgroundColor: colors.lightGrey,
    borderRadius: 10,
    padding: 25,
  },
  font: {
    textAlign: "center",
    fontSize: 20,
  },
});

export default DisplayPokedex;
