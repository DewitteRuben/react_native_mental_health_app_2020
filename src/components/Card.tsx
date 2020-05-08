import React from "react";
import { View, StyleSheet, ViewProps } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";

const cardStyles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    flexDirection: "row",
    padding: 20,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
});

export default class Card extends React.Component<ViewProps> {
  render() {
    const { children, style, ...other } = this.props;

    return (
      <TouchableOpacity style={[cardStyles.container, style]} {...other}>
        {children}
      </TouchableOpacity>
    );
  }
}
