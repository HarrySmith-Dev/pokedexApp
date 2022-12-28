import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import { Tabs } from "./components/Tabs";
import PokemonDetails from "./components/PokemonDetails";
import WelcomeScreen from "./components/WelcomeScreen";

const Root = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Root.Navigator screenOptions={{ headerShown: false }}>
        <Root.Screen name="Welcome" component={WelcomeScreen} />
        <Root.Screen name="Pokedex" component={Tabs} />
        <Root.Screen
          name="Pokemon Details"
          component={PokemonDetails}
          options={({ route }) => ({ title: route.params.name })}
        />
      </Root.Navigator>
    </NavigationContainer>
  );
}
