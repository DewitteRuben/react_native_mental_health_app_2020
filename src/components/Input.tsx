import React from "react";
import { TextInput as RNTextInput, StyleSheet } from "react-native";
import Text from "./Text";
import Animated, { Value, timing, Easing } from "react-native-reanimated";
import Button from "./Button";

const textInputStyles = StyleSheet.create({
  input: {
    borderWidth: 1,
    borderColor: "#7a7977",
    borderRadius: 5,
    paddingHorizontal: 5,
  },
  border: {
    borderColor: "#567ab3",
  },
  text: {
    color: "#567ab3",
  },
});

interface ITextInputState {
  focus: boolean;
  value: string;
}

interface ITextInputProps {
  onChangeText?: (value: string) => void;
  label?: string;
}

const createConfig = (duration: number, toValue: number, easing?: Animated.EasingFunction): Animated.TimingConfig => {
  return {
    duration,
    toValue,
    easing: easing || Easing.inOut(Easing.ease),
  };
};

const INITIAL_X = 10;
const INITIAL_Y = 30;

const FINAL_X = 0;
const FINAL_Y = 0;

const ANIMATION_DURATION = 150;

export default class TextInput extends React.Component<ITextInputProps, ITextInputState> {
  state: ITextInputState = {
    focus: false,
    value: "",
  };

  x: Value<number>;
  y: Value<number>;
  labelYAnim: Animated.BackwardCompatibleWrapper;
  labelXAnim: Animated.BackwardCompatibleWrapper;

  constructor(props: ITextInputProps) {
    super(props);
    this.x = new Value(INITIAL_X);
    this.y = new Value(INITIAL_Y);
    this.labelXAnim = timing(this.x, createConfig(ANIMATION_DURATION, FINAL_X));
    this.labelYAnim = timing(this.y, createConfig(ANIMATION_DURATION, FINAL_Y));
  }

  componentDidUpdate(prevProps: ITextInputProps, prevState: ITextInputState) {
    const { focus, value } = this.state;
    if (focus !== prevState.focus && value.length <= 0) {
      this.startAnimation(focus);
    }
  }

  startAnimation = (reverse?: boolean) => {
    this.labelXAnim.start();
    this.labelYAnim.start();
    this.reverseAnimation(reverse);
  };

  reverseAnimation = (reverse?: boolean) => {
    this.labelXAnim = timing(this.x, createConfig(ANIMATION_DURATION, reverse ? INITIAL_X : FINAL_X));
    this.labelYAnim = timing(this.y, createConfig(ANIMATION_DURATION, reverse ? INITIAL_Y : FINAL_Y));
  };

  toggleFocus = (focus: boolean) => () => {
    this.setState({ focus });
  };

  onTextChange = (value: string) => {
    const { onChangeText } = this.props;
    this.setState({ value }, () => {
      if (onChangeText) {
        onChangeText(value);
      }
    });
  };

  render() {
    const { label } = this.props;
    const { focus } = this.state;
    return (
      <>
        {label && (
          <Animated.View style={[{ translateX: this.x, translateY: this.y }]}>
            <Text size="small" style={focus && textInputStyles.text}>
              {label}
            </Text>
          </Animated.View>
        )}
        <RNTextInput
          onFocus={this.toggleFocus(true)}
          onBlur={this.toggleFocus(false)}
          style={[textInputStyles.input, focus && textInputStyles.border]}
          onChangeText={this.onTextChange}
        />
      </>
    );
  }
}
