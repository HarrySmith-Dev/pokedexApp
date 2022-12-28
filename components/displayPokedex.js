import axios from "axios";
import React, { useState, useEffect } from "react";
import colors from "./Colors";
import SearchInput from "./Search";
import {
  View,
  Text,
  Image,
  FlatList,
  SafeAreaView,
  StyleSheet,
} from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";

const DisplayPokedex = ({ navigation, route }) => {
  const [pokemon, setPokemon] = useState([]);

  const [filteredSearch, setFilteredSearch] = useState("");

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

  const handleSearchInput = (text) => {
    setFilteredSearch(text);
  };

  const filteredPokemon = sortPokemonData.filter((pokemon) => {
    return pokemon.name.toLowerCase().includes(filteredSearch.toLowerCase());
  });

  const OnPress = (item) => {
    let pokemonName = item.name;
    navigation.push("Pokemon Details", { data: item, name: pokemonName });
  };

  const typeColors = {
    fire: colors.fireRed,
    water: colors.waterBlue,
    grass: colors.leafGreen,
    electric: colors.electricYellow,
    psychic: colors.psychicPink,
    flying: colors.flyingLilac,
    poison: colors.poisonPurple,
    bug: colors.bugGreen,
    normal: colors.normal,
    ground: colors.groundBeige,
    fairy: colors.fairyPink,
    fighting: colors.fightingMaroon,
    rock: colors.rockGold,
    steel: colors.steelGrey,
    ice: colors.iceTurquoise,
    dragon: colors.ultraViolet,
    ghost: colors.ghostViolet,
    dark: colors.lightBlack,
  };

  return (
    <SafeAreaView style={listStyles.container}>
      <View style={listStyles.buttonContainer}>
        <TouchableOpacity
          style={listStyles.button}
          onPress={() => {
            navigation.pop();
          }}
        >
          <Text>Close</Text>
        </TouchableOpacity>
      </View>

      <SearchInput
        icon="search"
        placeholder="Search for a Pokemon..."
        onChangeText={handleSearchInput}
        value={filteredSearch}
      />

      <FlatList
        data={filteredPokemon}
        numColumns={1}
        renderItem={({ item }) => (
          <View style={listStyles.flatListContainer}>
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
          </View>
        )}
        keyExtractor={(item) => item.id}
      />
    </SafeAreaView>
  );
};

const listStyles = StyleSheet.create({
  container: {
    backgroundColor: colors.red,
    flex: 1,
  },
  flatListContainer: {
    flex: 1,
    justifyContent: "space-between",
    alignItems: "center",
  },
  buttonContainer: {
    justifyContent: "center",
    alignItems: "center",
    marginTop: 50,
  },
  button: {
    backgroundColor: colors.ceruleanBlue,
    borderRadius: 15,
    padding: 30,
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
    color: colors.white,
  },
});

export default DisplayPokedex;
