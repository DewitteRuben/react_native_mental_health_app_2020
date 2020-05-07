import React from "react";
import { StyleSheet, Text, TouchableOpacity, TouchableOpacityProps } from "react-native";

const buttonStyles = StyleSheet.create({
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

export type ButtonColor = "gray" | "blue" | "red" | "green" | "darkBlue";

const createColorStyle = (
  name: ButtonColor,
  textNormal: string,
  textHighlight: string,
  backgroundNormal: string,
  backgroundHighlight: string
) => {
  return {
    [name]: {
      background: {
        normal: {
          backgroundColor: backgroundNormal,
        },
        highlighted: {
          backgroundColor: backgroundHighlight,
        },
      },
      text: {
        normal: {
          color: textNormal,
        },
        highlighted: {
          color: textHighlight,
        },
      },
    },
  };
};

const typeMap = {
  ...createColorStyle("gray", "#000000", "#ffffff", "#F4F4F4", "#7A7977"),
  ...createColorStyle("blue", "#77B4E8", "#ffffff", "#ffffff", "#77B4E8"),
  ...createColorStyle("green", "#8DC36D", "#ffffff", "#ffffff", "#8DC36D"),
  ...createColorStyle("darkBlue", "#1F5D84", "#ffffff", "#ffffff", "#1F5D84"),
};

interface IButtonProps extends TouchableOpacityProps {
  text: string;
  active?: boolean;
  icon?: React.ReactElement;
  type?: ButtonColor;
}

export default class Button extends React.Component<IButtonProps, {}> {
  render() {
    const { active, icon, text, type, ...props } = this.props;
    const defaultType = "gray";

    const backgroundHighlighted = typeMap[type || defaultType].background.highlighted;
    const backgroundNormal = typeMap[type || defaultType].background.normal;

    const textHighlighted = typeMap[type || defaultType].text.highlighted;
    const textNormal = typeMap[type || defaultType].text.normal;

    const textStyles = [buttonStyles.text, active ? textHighlighted : textNormal];
    const containerStyles = [buttonStyles.container, active ? backgroundHighlighted : backgroundNormal];

    return (
      <TouchableOpacity {...props} style={containerStyles}>
        {icon && React.cloneElement(icon, { style: textStyles })}
        <Text style={[textStyles, icon ? buttonStyles.iconMargin : null]}>{text}</Text>
      </TouchableOpacity>
    );
  }
}
