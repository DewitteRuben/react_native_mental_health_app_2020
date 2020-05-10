import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import Container from "../components/Container";
import MoodEntryList from "../components/MoodEntryList";
import { AntDesign } from "@expo/vector-icons";
import { HeaderButton, HeaderButtons, Item } from "react-navigation-header-buttons";

const Stack = createStackNavigator();

class MainComponent extends React.Component {
  render() {
    return (
      <Container>
        <MoodEntryList />
      </Container>
    );
  }
}

const HeaderAntDesignButton = (props: any) => (
  <HeaderButton {...props} IconComponent={AntDesign} iconSize={24} color="black" />
);

export default class Main extends React.Component {
  render() {
    return (
      <Stack.Navigator>
        <Stack.Screen
          options={{
            headerRight: (props) => (
              <HeaderButtons HeaderButtonComponent={HeaderAntDesignButton}>
                <Item title="add" iconName="plus" />
              </HeaderButtons>
            ),
          }}
          name="Main"
          component={MainComponent}
        />
      </Stack.Navigator>
    );
  }
}
