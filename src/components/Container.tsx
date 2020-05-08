import React from "react";
import { View, StyleSheet } from "react-native";

const containerStyles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    flex: 1,
  },
});

const Container: React.FC = ({ children }) => <View style={containerStyles.container}>{children}</View>;

export default Container;
