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
  Button,
} from "react-native";

const NewTeam = ({ navigation }) => {
  const [pokemon, setPokemon] = useState([]);

  const [filteredSearch, setFilteredSearch] = useState("");

  const [selectedPokemon, setSelectedPokemon] = useState([]);

  useEffect(() => {
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
          setPokemon((prevPokemon) => [
            ...prevPokemon,
            { name, sprite, id, types },
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
    if (selectedPokemon.length < 6) {
      setSelectedPokemon((prevSelectedPokemon) => [
        ...prevSelectedPokemon,
        item,
      ]);
    } else {
      alert("You have reached the maximum number of Pokemon allowed (6)!"); // NEW
    }
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
      <FlatList
        horizontal={true}
        data={selectedPokemon} // CHANGED
        renderItem={({ item }) => (
          <View style={listStyles.horizontalContainer}>
            <View key={item.name} style={listStyles.horizontalInfoCard}>
              <Image
                source={{ uri: item.sprite }}
                style={{ width: 75, height: 75 }}
              />
            </View>
          </View>
        )}
        keyExtractor={(item) => item.id}
      />
      <Button
        title="Save"
        onPress={() => {
          navigation.push("Current Team", { selectedPokemon });
        }}
      >
        Save
      </Button>
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
              <Button title="Add to Team" onPress={() => OnPress(item)} />
            </View>
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
  horizontalContainer: {
    flex: 1,
    marginTop: 50,
    marginBottom: 70,
    marginLeft: 15,
  },
  horizontalInfoCard: {
    backgroundColor: colors.bostonRed,
    borderRadius: 10,
    marginRight: 15,
  },
});

export default NewTeam;
