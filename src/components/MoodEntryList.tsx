import React, { Component, Children } from "react";
import { View, StyleSheet, FlatList } from "react-native";
import MoodEntryListItem from "./MoodEntryListItem";
import moodEntries from "../data/moodentries.json";
import { SmileyType } from "./SmileyButton";

const moodEntryListStyles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
  },
  item: {
    marginVertical: 8,
  },
});

interface IMoodEntryListProps {
  children?: React.ReactElement[];
}

export default class MoodEntryList extends Component<IMoodEntryListProps> {
  render() {
    return (
      <FlatList
        contentContainerStyle={moodEntryListStyles.container}
        data={moodEntries}
        keyExtractor={item => item.entryId}
        renderItem={({ item }) =>
          React.cloneElement(
            <MoodEntryListItem
              date={new Date(item.date)}
              emotions={item.emotions}
              entryId={item.entryId}
              mood={item.mood as SmileyType}
            />,
            { style: moodEntryListStyles.item }
          )
        }
      ></FlatList>
    );
  }
}
