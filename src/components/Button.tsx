import React from "react";
import { StyleSheet, Text, TouchableOpacity, TouchableOpacityProps } from "react-native";

const buttonStyles = StyleSheet.create({
  normalContainer: {
    backgroundColor: "#F4F4F4",
  },
  highlightedContainer: {
    backgroundColor: "#7A7977",
  },
  iconMargin: {
    marginLeft: 8,
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
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    alignSelf: "flex-start",
    paddingHorizontal: 25,
    paddingVertical: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,
    elevation: 4,
    borderRadius: 25,
  },
});

interface IButtonProps extends TouchableOpacityProps {
  text: string;
  active?: boolean;
  icon?: React.ReactElement;
}

export default class Button extends React.Component<IButtonProps, {}> {
  render() {
    const { active, icon, text, ...props } = this.props;

    const textStyles = [buttonStyles.text, active ? buttonStyles.highlightedText : buttonStyles.normalText];

    const containerStyles = [
      buttonStyles.container,
      active ? buttonStyles.highlightedContainer : buttonStyles.normalContainer,
    ];

    return (
      <TouchableOpacity {...props} style={containerStyles}>
        {icon && React.cloneElement(icon, { style: textStyles })}
        <Text style={[textStyles, icon ? buttonStyles.iconMargin : null]}>{text}</Text>
      </TouchableOpacity>
    );
  }
}
