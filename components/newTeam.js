/**
 * @fileoverview This component displays a list of Pokemon with an add symbol under each, for users to add up to 6 Pokemon to a seperate list which can then be saved and
 * move them onto the CurrentTeam component. This component is accessed through the Tabs component.
 */
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
  TouchableOpacity,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

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

  /*onPress which checks if user has already added a Pokemon to a list based on ID or if the user has gone over the amount(6)
    This is triggered when the user selects the plus icon to add a Pokemon to the horizontal list
  */

  const onPress = (item) => {
    if (selectedPokemon.find((p) => p.id === item.id)) {
      alert(
        "You've already selected this pokemon, kindly choose another option"
      );
    } else if (selectedPokemon.length < 6) {
      setSelectedPokemon((prevSelectedPokemon) => [
        ...prevSelectedPokemon,
        item,
      ]);
    } else {
      alert("You have reached the maximum number of Pokemon allowed (6)");
    }
  };

  //onPress which pushes user to the CurrentTeam component
  const saveOnPress = () => {
    navigation.push("Current Team", { data: selectedPokemon });
  };

  //clear function which is triggered when user selects the clear button
  const clearFlatList = () => {
    setSelectedPokemon([]);
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
      <View style={listStyles.columnContainer}>
        <TouchableOpacity
          style={[
            selectedPokemon.length > 0
              ? { display: "flex" }
              : { display: "none" },
            listStyles.saveButton,
          ]}
          onPress={saveOnPress}
        >
          <Ionicons
            name="archive"
            size={30}
            color={colors.goldenYellow}
          ></Ionicons>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            selectedPokemon.length > 0
              ? { display: "flex" }
              : { display: "none" },
            listStyles.clearButton,
          ]}
          onPress={clearFlatList}
        >
          <Text
            style={{
              color: colors.white,
              fontSize: 20,
            }}
          >
            Clear
          </Text>
        </TouchableOpacity>
      </View>
      <FlatList
        horizontal={true}
        data={selectedPokemon}
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
              <View style={listStyles.addButtonContainer}>
                <TouchableOpacity
                  style={listStyles.button}
                  onPress={() => {
                    onPress(item);
                  }}
                >
                  <Ionicons name="add" size={50} color={colors.goldenYellow} />
                </TouchableOpacity>
              </View>
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
    marginTop: 40,
    marginBottom: 70,
    marginLeft: 15,
  },
  horizontalInfoCard: {
    backgroundColor: colors.bostonRed,
    borderRadius: 10,
    marginRight: 15,
  },
  buttonContainer: {
    flex: 1,
  },
  saveButton: {
    paddingVertical: 12,
    paddingHorizontal: 20,
    position: "absolute",
    top: 0,
    right: 0,
    alignItems: "center",
  },
  clearButton: {
    position: "absolute",
    top: 0,
    left: 0,
    alignItems: "center",
    paddingVertical: 12,
    paddingHorizontal: 20,
  },
  addButtonContainer: {
    alignItems: "center",
  },
  columnContainer: {
    marginTop: 20,
    marginBottom: 50,
  },
});

export default NewTeam;
