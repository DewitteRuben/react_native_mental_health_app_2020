import React from "react";
import { StyleSheet, View } from "react-native";

const getSizeStyle = (size: number) => {
  return {
    container: {
      height: size,
    },
  };
};

const spacerStyles = StyleSheet.create({
  ...getSizeStyle(16),
});

interface ISpacerProps {
  size?: number;
}

export default class Spacer extends React.Component<ISpacerProps> {
  render() {
    const { size } = this.props;
    return <View style={size ? getSizeStyle(size).container : spacerStyles.container} />;
  }
}
