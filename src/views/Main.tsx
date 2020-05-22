import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import Container from "../components/Container";
import { AntDesign } from "@expo/vector-icons";
import { HeaderButton, HeaderButtons, Item } from "react-navigation-header-buttons";
import AddMoodEntry from "./AddMoodEntry";
import { StackNavigationProp } from "@react-navigation/stack";
import MoodEntryFeed from "../components/MoodEntryFeed";
import MoodEntryDetail from "./MoodEntryDetail";

const Stack = createStackNavigator();

class MainComponent extends React.Component<StackNavigationProp<{}>> {
  render() {
    return (
      <Container>
        <MoodEntryFeed />
      </Container>
    );
  }
}

const HeaderAntDesignButton = (props: any) => (
  <HeaderButton {...props} IconComponent={AntDesign} iconSize={24} color="black" />
);

const navigate = (navigation: any) => (route: string) => () => navigation.navigate(route);

export default class Main extends React.Component {
  render() {
    return (
      <Stack.Navigator>
        <Stack.Screen
          options={({ navigation }) => ({
            headerRight: (props) => (
              <HeaderButtons HeaderButtonComponent={HeaderAntDesignButton}>
                <Item title="add" onPress={navigate(navigation)("AddEntry")} iconName="plus" />
              </HeaderButtons>
            ),
          })}
          name="Main"
          component={MainComponent}
        />
        <Stack.Screen
          options={{
            headerTitle: "Create a new entry",
          }}
          name="AddEntry"
          component={AddMoodEntry}
        />
        <Stack.Screen
          options={{
            headerTitle: "Entry details",
          }}
          name="EntryDetail"
          component={MoodEntryDetail}
        />
      </Stack.Navigator>
    );
  }
}
