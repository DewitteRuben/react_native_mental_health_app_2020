import React from "react";
import { TouchableOpacity } from "react-native-gesture-handler";
import { Image, StyleSheet, Text, View } from "react-native";
import _ from "lodash";

export const smileyArray = ["veryBad", "bad", "moderate", "good", "veryGood"] as const;

export type SmileyType = typeof smileyArray[number];

interface ISmileyButtonProps {
  type: SmileyType;
  onPress?: (pressed: SmileyType) => void;
  selected?: boolean;
  disabled?: boolean;
}

const smileyButtonStyles = StyleSheet.create({
  container: {
    display: "flex",
    alignItems: "center",
    alignSelf: "flex-start",
  },
  imageContainer: {
    padding: 3,
  },
  imageSelected: {
    borderColor: "black",
    borderWidth: 1,
    padding: 2,
    borderRadius: 50 / 2,
  },
  image: {
    width: 50,
    height: 50,
  },
});

export const smileyImageSrcMap: Record<SmileyType, any> = {
  veryBad: require("../images/smiley_verybad.png"),
  bad: require("../images/smiley_bad.png"),
  moderate: require("../images/smiley_moderate.png"),
  good: require("../images/smiley_good.png"),
  veryGood: require("../images/smiley_verygood.png"),
};

export default class SmileyButton extends React.Component<ISmileyButtonProps, {}> {
  handleOnPress = () => {
    const { onPress, type } = this.props;
    if (onPress) {
      onPress(type);
    }
  };

  render() {
    const { type, selected, disabled } = this.props;

    const smileyName = (type as string)
      .replace(/([a-z])([A-Z])/g, "$1 $2")
      .split(" ")
      .map((str) => _.capitalize(str))
      .join(" ");

    return (
      <TouchableOpacity disabled={disabled} onPress={this.handleOnPress} style={smileyButtonStyles.container}>
        <View style={[smileyButtonStyles.imageContainer, selected && smileyButtonStyles.imageSelected]}>
          <Image style={smileyButtonStyles.image} source={smileyImageSrcMap[type]} />
        </View>
        <Text>{smileyName}</Text>
      </TouchableOpacity>
    );
  }
}
