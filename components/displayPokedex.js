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
import { Ionicons } from "@expo/vector-icons";

const DisplayPokedex = ({ navigation, route }) => {
  const [pokemon, setPokemon] = useState([]);

  const [filteredSearch, setFilteredSearch] = useState("");

  useEffect(() => {
    // Fetch Pokemon data from API
    async function fetchData() {
      for (let i = 1; i <= 151; i++) {
        try {
          const response = await axios.get(
            `https://pokeapi.co/api/v2/pokemon/${i}/`
          );
          const name = response.data.name;
          const sprite = response.data.sprites.front_default;
          const id = response.data.id;
          const types = response.data.types.map((type) => type.type.name);
          const height = response.data.height;
          const weight = response.data.weight;
          const stats = response.data.stats.map((stat) => {
            return { name: stat.stat.name, baseStat: stat.base_stat };
          });

          setPokemon((prevPokemon) => [
            ...prevPokemon,
            { name, sprite, id, types, height, weight, stats },
          ]);
        } catch (error) {
          console.error(error);
        }
      }
    }
    fetchData();
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
          <Ionicons name="arrow-back" size={40} color={colors.goldenYellow} />
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
            <View style={listStyles.triangle} />
            <TouchableOpacity onPress={() => OnPress(item)}>
              <View key={item.name} style={listStyles.infoCard}>
                <Image
                  source={{ uri: item.sprite }}
                  style={{ width: 200, height: 200 }}
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
                      fontSize: 17,
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
    padding: 20,
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
  triangle: {
    backgroundColor: "transparent",
    borderStyle: "solid",
    borderTopWidth: 25,
    borderRightWidth: 25,
    borderLeftWidth: 25,
    borderTopColor: colors.electricYellow,
    borderRightColor: "transparent",
    borderLeftColor: "transparent",
    transform: [{ rotate: "270deg" }],
    marginRight: 10,
    position: "absolute",
    top: 200,
    marginLeft: 30,
    left: 0,
  },
});

export default DisplayPokedex;
