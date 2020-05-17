import React from "react";
import { Text as RNText, StyleSheet, TextProperties } from "react-native";

const textStyles = StyleSheet.create({
  primary: {
    marginVertical: 5,
  },
  left: {
    textAlign: "left",
  },
  center: {
    textAlign: "center",
  },
  right: {
    textAlign: "right",
  },
  bold: {
    fontWeight: "bold",
  },
  regular: {
    fontSize: 16,
  },
  small: {
    fontSize: 14,
  },
  large: {
    fontSize: 22,
  },
});

const createColor = (color: string) => {
  return {
    color,
  };
};

interface ITextProps extends TextProperties {
  bold?: boolean;
  size?: "small" | "large";
  align?: "left" | "right" | "center";
  color?: string;
}

export default class Text extends React.Component<ITextProps> {
  render() {
    const { bold, size, align, children, style, color, ...rest } = this.props;

    return (
      <RNText
        style={[
          textStyles.primary,
          textStyles.regular,
          bold && textStyles.bold,
          align && textStyles[align],
          size && textStyles[size],
          color ? createColor(color) : undefined,
          style,
        ]}
      >
        {children}
      </RNText>
    );
  }
}
