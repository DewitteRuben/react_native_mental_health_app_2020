import React from "react";
import { StyleSheet, Text, TouchableOpacity, TouchableOpacityProps } from "react-native";

const buttonStyles = StyleSheet.create({
  block: {
    justifyContent: "center",
    alignSelf: "stretch",
  },
  iconMargin: {
    marginHorizontal: 8,
  },
  text: {
    textTransform: "uppercase",
    fontWeight: "700",
    textAlign: "center",
  },
  square: {
    borderRadius: 0,
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

export type ButtonColor = "gray" | "blue" | "green" | "darkBlue" | "orange";

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
  ...createColorStyle("orange", "#eb9b49", "#ffffff", "#ffffff", "#eb9b49"),
};

export interface IButtonProps extends TouchableOpacityProps {
  text: string;
  active?: boolean;
  block?: boolean;
  square?: boolean;
  iconComponent?: React.ReactElement;
  iconPosition?: "left" | "right";
  type?: ButtonColor;
  disabled?: boolean;
}

export default class Button extends React.Component<IButtonProps, {}> {
  render() {
    const { active, iconComponent, text, type, block, style, square, iconPosition, disabled, ...props } = this.props;
    const defaultType = "gray";
    const right = iconPosition === "right";

    const backgroundHighlighted = typeMap[type || defaultType].background.highlighted;
    const backgroundNormal = typeMap[type || defaultType].background.normal;

    const textHighlighted = typeMap[type || defaultType].text.highlighted;
    const textNormal = typeMap[type || defaultType].text.normal;

    const textStyles = [buttonStyles.text, active ? textHighlighted : textNormal];
    const toggleBorderRadius = square && buttonStyles.square;
    const toggleBlock = block && buttonStyles.block;

    const containerStyles = [
      buttonStyles.container,
      active ? backgroundHighlighted : backgroundNormal,
      toggleBlock,
      toggleBorderRadius,
    ];

    const IconComponent = iconComponent && React.cloneElement(iconComponent, { style: textStyles });

    return (
      <TouchableOpacity disabled={disabled} style={[containerStyles, style]} {...props}>
        {!right && IconComponent}
        <Text style={[textStyles, iconComponent && buttonStyles.iconMargin]}>{text}</Text>
        {right && IconComponent}
      </TouchableOpacity>
    );
  }
}
