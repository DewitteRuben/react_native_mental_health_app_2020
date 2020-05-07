import React from "react";
import { View, StyleSheet } from "react-native";
import Button from "./Button";

interface ISwitchButtonProps {
  children?: React.ReactElement[];
  onChange?: (text: string, index: number) => void;
}

interface ISwitchButtonState {
  activeButtonIndex?: number;
}

const switchButtonStyles = StyleSheet.create({
  container: {
    flex: 1,
    display: "flex",
    justifyContent: "space-between",
    flexDirection: "row",
  },
});

export default class SwitchButton extends React.PureComponent<ISwitchButtonProps, ISwitchButtonState> {
  state: ISwitchButtonState = {};

  handleOnPress = (text: string, index: number) => () => {
    const { onChange } = this.props;
    this.setState({ activeButtonIndex: index }, () => {
      if (onChange) {
        onChange(text, index);
      }
    });
  };

  render() {
    const { children } = this.props;
    const { activeButtonIndex } = this.state;
    const validChildren = children?.filter((child) => child.type === Button).length === 2;

    if (!validChildren || !children) {
      throw new Error("Need exactly 2 button components to function.");
    }

    return (
      <View style={switchButtonStyles.container}>
        {children.map((child, index) =>
          React.cloneElement(child, {
            key: `SwitchButton-${child.props.text}-${index}`,
            active: activeButtonIndex === index,
            onPress: this.handleOnPress(child.props.text, index),
          })
        )}
      </View>
    );
  }
}
