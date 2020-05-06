import React from "react";

import { View, Text, StyleSheet } from "react-native";
import SwitchButton from "../components/SwitchButton";
import { createStackNavigator } from "@react-navigation/stack";

const mainStyles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    flex: 1,
  },
});

const Stack = createStackNavigator();

class MainComponent extends React.Component {
  render() {
    return (
      <View style={mainStyles.container}>
        <SwitchButton></SwitchButton>
      </View>
    );
  }
}

export default class Main extends React.Component {
  render() {
    return (
      <Stack.Navigator>
        <Stack.Screen name="Main" component={MainComponent} />
      </Stack.Navigator>
    );
  }
}
