import React from "react";
import { View, StyleSheet } from "react-native";
import Button from "./Button";

interface ISwitchButtonProps {
  children?: React.ReactElement[];
  values?: string[];
  onChange?: (text: string, index: number, value?: string) => void;
}

interface ISwitchButtonState {
  activeButtonIndex?: number;
}

const switchButtonStyles = StyleSheet.create({
  container: {
    display: "flex",
    justifyContent: "space-between",
    flexDirection: "row",
  },
});

export default class SwitchButton extends React.PureComponent<ISwitchButtonProps, ISwitchButtonState> {
  state: ISwitchButtonState = {};

  handleOnPress = (text: string, index: number) => () => {
    const { onChange, values } = this.props;
    this.setState({ activeButtonIndex: index }, () => {
      if (onChange) {
        onChange(text, index, values && values[index]);
      }
    });
  };

  render() {
    const { children } = this.props;
    const { activeButtonIndex } = this.state;
    const btnChildren = children?.filter((child) => child.type === Button);

    if (!btnChildren) {
      return null;
    }

    if (btnChildren.length > 2 || btnChildren.length === 1) {
      throw new Error("Need exactly 2 button components to function.");
    }

    return (
      <View style={switchButtonStyles.container}>
        {btnChildren?.map((child, index) =>
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
