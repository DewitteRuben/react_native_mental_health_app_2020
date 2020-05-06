import React from "react";
import "react-native-gesture-handler";
import { NavigationContainer } from "@react-navigation/native";
import {  renderMainNavigationTabs } from "./src/navigation/navigation";

export default function App() {
  return <NavigationContainer>{renderMainNavigationTabs()}</NavigationContainer>;
}
