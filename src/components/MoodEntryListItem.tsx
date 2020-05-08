import React from "react";
import Card from "./Card";
import SmileyButton, { SmileyType } from "./SmileyButton";
import { View, Text, StyleSheet, ViewProps } from "react-native";

const moodEntryListItemStyles = StyleSheet.create({
  container: {
    justifyContent: "space-between",
  },
});

export interface IMoodEntry {
  entryId: string;
  mood: SmileyType;
  date: Date;
  emotions: string[];
}

interface IMoodEntryListItemProps extends ViewProps, IMoodEntry {}

export default class MoodEntryListItem extends React.Component<IMoodEntryListItemProps> {
  render() {
    const { style } = this.props;
    return (
      <Card style={[moodEntryListItemStyles.container, style]}>
        <SmileyButton type="good" />
        <View>
          <Text>{new Date().toLocaleString()}</Text>
          <Text>Calm, Relaxed</Text>
        </View>
        <View>
          <Text>Icon</Text>
          <Text>Icon</Text>
        </View>
      </Card>
    );
  }
}
