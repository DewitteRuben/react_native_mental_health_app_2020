import React from "react";
import Main from "../views/Main";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";
import Start from "../views/Start";

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

const MAIN_TAB_NAVIGATION: Record<string, React.ComponentType<any>> = {
  Home: Main,
  Mood: Main,
  Tasks: Main,
};

const getTabKey = (name: string) => {
  return `MAIN_TAB_NAVIGATION-${name}`;
};

function renderStartSplash() {
  return (
    <Stack.Navigator>
      <Stack.Screen component={Start} name="Welcome" />
    </Stack.Navigator>
  );
}

function renderMainNavigationTabs() {
  return (
    <Tab.Navigator>
      {Object.keys(MAIN_TAB_NAVIGATION).map((key) => (
        <Tab.Screen key={getTabKey(key)} name={key} component={MAIN_TAB_NAVIGATION[key]} />
      ))}
    </Tab.Navigator>
  );
}

export { renderMainNavigationTabs, renderStartSplash };
