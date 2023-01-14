import React from "react";
import { View, TextInput, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import colors from "./Colors";

const SearchInput = ({ icon, ...props }) => {
  return (
    <View style={styles.inputSection}>
      <TextInput
        {...props}
        style={styles.input}
        placeholderTextColor={colors.white}
      />
      {icon && (
        <Ionicons
          name={icon}
          color={colors.goldenYellow}
          size={30}
          style={styles.icon}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  icon: {
    marginRight: 5,
  },
  inputSection: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    height: 50,
    borderBottomColor: colors.bostonRed,
    borderBottomWidth: 2,
    marginTop: 40,
    paddingLeft: 5,
  },
  input: {
    flex: 1,
    fontSize: 22,
    paddingTop: 10,
    paddingBottom: 10,
  },
});

export default SearchInput;
