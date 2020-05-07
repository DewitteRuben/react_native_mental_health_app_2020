import React from "react";
import { View, StyleSheet } from "react-native";
import SmileyButton, { smileyArray, SmileyType } from "../components/SmileyButton";

interface ISmileySelectorState {
  currentSmiley?: SmileyType;
}

interface ISmileySelectorProps {
  onChange?: (smiley: SmileyType) => void;
}

const smileySelectorStyles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
  },
});

export default class SmileySelector extends React.Component<ISmileySelectorProps, ISmileySelectorState> {
  state: ISmileySelectorState = {
    currentSmiley: undefined,
  };

  handleSmileyPress = (smiley: SmileyType) => {
    const { onChange } = this.props;
    this.setState({ currentSmiley: smiley }, () => {
      if (onChange) {
        onChange(smiley);
      }
    });
  };

  render() {
    const { currentSmiley } = this.state;

    return (
      <View style={smileySelectorStyles.container}>
        {smileyArray.map((smiley, index) => (
          <SmileyButton
            selected={currentSmiley === smiley}
            onPress={this.handleSmileyPress}
            key={`SmileyButton-${index}`}
            type={smiley}
          />
        ))}
      </View>
    );
  }
}
