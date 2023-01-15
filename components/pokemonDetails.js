import { Ionicons } from "@expo/vector-icons";
import React from "react";
import {
  SafeAreaView,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  View,
  Dimensions,
} from "react-native";
import colors from "./Colors";

const PokemonDetails = ({ navigation, route }) => {
  let item = route.params.data;
  const { name, sprite, id, types, height, weight, stats } = item;
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
  const windowWidth = Dimensions.get("window").width;
  const StatBar = ({ stat, color }) => {
    const barWidth = (stat / 200) * windowWidth; // calculate the width of the bar based on the stat value
    return (
      <View style={[styles.bar, { width: barWidth, backgroundColor: color }]} />
    );
  };
  return (
    <SafeAreaView style={{ backgroundColor: colors.red, flex: 1 }}>
      <View style={styles.container}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => {
            navigation.pop();
          }}
        >
          <Ionicons name="arrow-back" size={40} color={colors.goldenYellow} />
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
              paddingLeft: 30,
              paddingRight: 30,
              paddingTop: 5,
              paddingBottom: 5,
            }}
          >
            {type}
          </Text>
        ))}
        <View style={styles.parent}>
          <View style={styles.rowContainer}>
            <Text style={styles.subTitleFont}>Height</Text>
            <Text style={styles.smallFont}>{height}m</Text>
          </View>
          <View style={styles.rowContainer}>
            <Text style={styles.subTitleFont}>Weight</Text>
            <Text style={styles.smallFont}>{weight}lbs</Text>
          </View>
        </View>

        {stats.map((stat, index) => (
          <View key={index} style={styles.statsContainer}>
            <Text>{stat.name}:</Text>
            <StatBar stat={stat.baseStat} color={colors.goldenYellow} />
          </View>
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
  bar: {
    height: 20,
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
  parent: {
    flexDirection: "row",
  },
  rowContainer: {
    marginTop: 20,
    marginRight: 50,
    marginLeft: 50,
    alignItems: "center",
  },
  subTitleFont: {
    fontSize: 23,
    color: colors.steelGrey,
  },
  typeFont: {
    fontSize: 15,
    color: colors.white,
  },
});

export default PokemonDetails;
