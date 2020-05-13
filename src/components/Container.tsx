import React from "react";
import { View, StyleSheet, ScrollView } from "react-native";

interface IContainerProps {
  padded?: boolean;
  scroll?: boolean;
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

const Container: React.FC<IContainerProps> = ({ children, padded, scroll }) => {
  const Component = scroll ? ScrollView : View;
  return <Component style={[containerStyles.container, padded && containerStyles.padding]}>{children}</Component>;
};

export default Container;
