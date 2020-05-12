import React from "react";
import { StyleSheet, View } from "react-native";

const getSizeStyle = (size: number, vertical?: boolean) => {
  return {
    container: {
      [vertical ? "width" : "height"]: size,
    },
  };
};

interface ISpacerProps {
  size?: number;
  vertical?: boolean;
}

export default class Spacer extends React.Component<ISpacerProps> {
  render() {
    const { size, vertical } = this.props;
    return <View style={size ? getSizeStyle(size, vertical).container : getSizeStyle(16, vertical).container} />;
  }
}
