import React from "react";
import Card from "./Card";
import SmileyButton, { SmileyType } from "./SmileyButton";
import { View, Text, StyleSheet, ViewProps } from "react-native";
import { IMoodEntry } from "../api/moodApi";
import _ from "lodash";

const moodEntryListItemStyles = StyleSheet.create({
  container: {
    justifyContent: "space-between",
  },
});

interface IMoodEntryListItemProps extends ViewProps, Omit<IMoodEntry, "experiences" | "sleep" | "thoughts"> {}

export default class MoodEntryListItem extends React.Component<IMoodEntryListItemProps> {
  render() {
    const { style, mood, date, emotions } = this.props;
    return (
      <Card style={[moodEntryListItemStyles.container, style]}>
        <SmileyButton type={mood as SmileyType} />
        <View>
          <Text>{date.toLocaleString()}</Text>
          <Text>{emotions.map((emotion) => _.capitalize(emotion)).join(", ")}</Text>
        </View>
        <View>
          <Text>Icon</Text>
          <Text>Icon</Text>
        </View>
      </Card>
    );
  }
}
