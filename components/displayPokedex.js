import axios from "axios";
import React, { useState, useEffect } from "react";
import { View, Text, Image, FlatList, SafeAreaView } from "react-native";

const DisplayPokedex = () => {
  const [pokemonData, setPokemonData] = useState([]);

  useEffect(() => {
    async function fetchPokemonData() {
      await axios
        .get("https://pokeapi.co/api/v2/pokemon")
        .then((response) => {
          setPokemonData(response.data.results);
        })
        .catch((erorr) => {
          console.warn(erorr);
        });
    }
    fetchPokemonData();
  }, []);

  return (
    <FlatList
      data={pokemonData}
      renderItem={({ item }) => (
        <SafeAreaView>
          <Text>{item.name}</Text>
        </SafeAreaView>
      )}
      keyExtractor={(item) => item.name}
    />
  );
};

export default DisplayPokedex;
