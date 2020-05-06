import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";


const switchButtonStyles = StyleSheet.create({
  normalContainer: {
    backgroundColor: "#F4F4F4",
  },
  highlightedContainer: {
    backgroundColor: "#7A7977",
  },
  text: {
    textTransform: "uppercase",
    fontWeight: "700",
    textAlign: "center",
  },
  normalText: {
    color: "#000000",
  },
  highlightedText: {
    color: "#ffffff",
  },
  container: {
    alignSelf: "flex-start",
    paddingHorizontal: 40,
    paddingVertical: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    elevation: 2,
    borderRadius: 25,
  },
});

interface ISwitchButtonProps {
  active?: boolean;
}

export default class SwitchButton extends React.Component<ISwitchButtonProps, {}> {
  render() {
    const { active } = this.props;

    const textStyles = [
      switchButtonStyles.text,
      active ? switchButtonStyles.highlightedText : switchButtonStyles.normalText,
    ];

    const containerStyles = [
      switchButtonStyles.container,
      active ? switchButtonStyles.highlightedContainer : switchButtonStyles.normalContainer,
    ];

    return (
      <TouchableOpacity style={containerStyles}>
        <Text style={textStyles}>Button</Text>
      </TouchableOpacity>
    );
  }
}
