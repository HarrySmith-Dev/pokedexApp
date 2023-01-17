/**
 * @fileoverview This component displays the bottom navigation bar which is where DisplayPokedex and NewTeam can be accessed from.
 */
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";
import DisplayPokedex from "./DisplayPokedex";
import colors from "./Colors";
import NewTeam from "./NewTeam";

const BottomTab = createBottomTabNavigator();

export const Tabs = () => {
  return (
    <BottomTab.Navigator
      initialRouteName="Display Pokedex"
      screenOptions={{
        headerShown: false,
        tabBarStyle: { backgroundColor: colors.ceruleanBlue },
      }}
    >
      <BottomTab.Screen
        name="Display Pokedex"
        component={DisplayPokedex}
        options={{
          tabBarLabel: "Pokedex",
          tabBarLabelStyle: { color: colors.goldenYellow, fontSize: 13 },
          tabBarIcon: () => (
            <Ionicons name="cube" size={26} color={colors.goldenYellow} />
          ),
        }}
      />
      <BottomTab.Screen
        name="New Team"
        component={NewTeam}
        options={{
          tabBarLabel: "New Team",
          tabBarLabelStyle: { color: colors.goldenYellow, fontSize: 13 },
          tabBarIcon: () => (
            <Ionicons name="add-circle" size={26} color={colors.goldenYellow} />
          ),
        }}
      />
    </BottomTab.Navigator>
  );
};
