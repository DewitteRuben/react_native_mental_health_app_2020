import React from "react";
import Card from "./Card";
import SmileyButton, { SmileyType } from "./SmileyButton";
import { View, Text, StyleSheet, ViewProps } from "react-native";
import { IMoodEntry } from "../api/moodApi";
import _ from "lodash";
import { useNavigation } from "@react-navigation/native";
import { RouteProp } from "@react-navigation/native";

const moodEntryListItemStyles = StyleSheet.create({
  container: {
    justifyContent: "space-between",
  },
});

interface IMoodEntryListItemProps extends ViewProps, Omit<IMoodEntry, "experiences" | "sleep" | "thoughts"> {}

const MoodEntryListItem: React.FC<IMoodEntryListItemProps> = ({ entryId, style, mood, date, emotions }) => {
  const navigation = useNavigation();

  const viewDetail = React.useCallback(() => {
    navigation.navigate("EntryDetail", { entryId });
  }, [navigation]);

  return (
    <Card onPress={viewDetail} style={[moodEntryListItemStyles.container, style]}>
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
};

export default MoodEntryListItem;
