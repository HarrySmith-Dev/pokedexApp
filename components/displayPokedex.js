import axios from "axios";
import React, { useState, useEffect } from "react";
import { View, Text, Image, FlatList, SafeAreaView } from "react-native";

const DisplayPokedex = () => {
  const [pokemon, setPokemon] = useState([]);

  useEffect(() => {
    for (let i = 1; i <= 50; i++) {
      axios
        .get(`https://pokeapi.co/api/v2/pokemon/${i}/`)
        .then((response) => {
          // The name can be found in response.data.name
          // The sprite can be found in response.data.sprites.front_default
          const name = response.data.name;
          const sprite = response.data.sprites.front_default;
          setPokemon((prevPokemon) => [...prevPokemon, { name, sprite }]);
        })
        .catch((error) => {
          console.error(error);
        });
    }
  }, []);

  return (
    <FlatList
      data={pokemon}
      renderItem={({ item }) => (
        <SafeAreaView>
          <Text>{item.name}</Text>
          <Image
            source={{ uri: item.sprite }}
            style={{ width: 100, height: 100 }}
          />
        </SafeAreaView>
      )}
      keyExtractor={(item) => item.name}
    />
  );
};

export default DisplayPokedex;
