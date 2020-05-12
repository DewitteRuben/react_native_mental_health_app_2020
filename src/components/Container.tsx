import React from "react";
import { View, StyleSheet } from "react-native";
import { ScrollView } from "react-native-gesture-handler";

interface IContainerProps {
  padded?: boolean;
}

const containerStyles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    flex: 1,
  },
  padding: {
    paddingHorizontal: 20,
  },
});

const Container: React.FC<IContainerProps> = ({ children, padded }) => (
  <View style={[containerStyles.container, padded && containerStyles.padding]}>{children}</View>
);

export default Container;
