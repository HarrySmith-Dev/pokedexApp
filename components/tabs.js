import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";
import NewTeam from "./NewTeam";
import CurrentTeam from "./CurrentTeam";
import DisplayPokedex from "./DisplayPokedex";

const BottomTab = createBottomTabNavigator();

export const Tabs = () => {
  return (
    <BottomTab.Navigator
      initialRouteName="Display Pokedex"
      screenOptions={{
        headerShown: false,
      }}
    >
      <BottomTab.Screen
        name="Display Pokedex"
        component={DisplayPokedex}
        options={{ tabBarLabel: "Pokedex" }}
      />
      <BottomTab.Screen
        name="New Team"
        component={NewTeam}
        options={{
          tabBarLabel: "New Team",
          tabBarIcon: () => <Ionicons name="add-circle-outline" size={26} />,
        }}
      />
      <BottomTab.Screen
        name="Current Team"
        component={CurrentTeam}
        options={{
          tabBarLabel: "Current Team",
          tabBarIcon: () => <Ionicons name="person" size={26} />,
        }}
      />
    </BottomTab.Navigator>
  );
};
