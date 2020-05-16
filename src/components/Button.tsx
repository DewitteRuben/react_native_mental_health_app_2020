import React from "react";
import { StyleSheet, Text, TouchableOpacity, TouchableOpacityProps } from "react-native";

const buttonStyles = StyleSheet.create({
  block: {
    justifyContent: "center",
    alignSelf: "stretch",
  },
  iconMargin: {
    marginLeft: 8,
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

export interface IButtonProps extends TouchableOpacityProps {
  text: string;
  active?: boolean;
  block?: boolean;
  square?: boolean;
  iconComponent?: React.ReactElement;
  type?: ButtonColor;
}

export default class Button extends React.Component<IButtonProps, {}> {
  render() {
    const { active, iconComponent, text, type, block, style, square, ...props } = this.props;
    const defaultType = "gray";

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

    return (
      <TouchableOpacity style={[containerStyles, style]} {...props}>
        {iconComponent && React.cloneElement(iconComponent, { style: textStyles })}
        <Text style={[textStyles, iconComponent ? buttonStyles.iconMargin : null]}>{text}</Text>
      </TouchableOpacity>
    );
  }
}
