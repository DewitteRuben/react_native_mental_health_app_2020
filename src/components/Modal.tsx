import React from "react";
import { StyleSheet, Dimensions, Modal as RNModal, View, ViewProperties, StyleProp, ViewStyle } from "react-native";
import Text from "./Text";
import Button from "./Button";
import Spacer from "./Spacer";
import { BackHandler } from "react-native";

const width = Dimensions.get("window").width;
const height = Dimensions.get("window").height;

const modalStyles = StyleSheet.create({
  backdrop: {
    flex: 1,
    backgroundColor: "rgba(0,0,0, 0.8)",
    justifyContent: "center",
  },
  fill: {
    flex: 1,
  },
  container: {
    backgroundColor: "#fff",
    paddingHorizontal: 20,
    paddingVertical: 5,
    margin: 20,
  },
  buttons: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "flex-end",
  },
});

export interface IModalButton {
  text: string;
  callback?: () => void;
}

interface IModalProps {
  title: string;
  buttons: IModalButton[];
  visible?: boolean;
  contentWrapperStyle?: StyleProp<ViewStyle>;
  onClose?: () => void;
  fill?: boolean;
}

interface IModalState {
  visible?: boolean;
}

export const createModalButton = (text: string, callback?: () => void) => {
  return {
    text,
    callback,
  };
};

export default class Modal extends React.Component<IModalProps, IModalState> {
  state: IModalState = {
    visible: this.props.visible || false,
  };

  closeModal = () => {
    const { onClose } = this.props;
    const { visible } = this.state;

    if (!visible) {
      return;
    }

    this.setState({ visible: false }, () => {
      if (onClose) onClose();
    });
  };

  openModal = () => {
    this.setState({ visible: true });
  };

  componentDidUpdate(prevProps: IModalProps) {
    const { visible } = this.props;
    if (prevProps.visible !== visible) {
      if (!visible) {
        this.closeModal();
      } else {
        this.openModal();
      }
    }
  }

  handleButtonCallback = (callback?: () => void) => () => {
    if (callback) callback();
  };

  render() {
    const { title, children, buttons, fill, contentWrapperStyle } = this.props;
    const { visible } = this.state;
    return (
      <RNModal transparent visible={visible}>
        <View style={modalStyles.backdrop}>
          <View style={[modalStyles.container, fill && modalStyles.fill]}>
            <Text bold size="large">
              {title}
            </Text>
            <View style={[fill && modalStyles.fill, contentWrapperStyle]}>{children}</View>
            <Spacer />
            <View style={modalStyles.buttons}>
              {buttons.map(({ callback, text }, index: number) => {
                const key = `modalButton-${index}`;
                if (index === buttons.length - 1) {
                  return <Button key={key} text={text} onPress={this.handleButtonCallback(callback)} square />;
                }
                return (
                  <React.Fragment key={key}>
                    <Button text={text} onPress={this.handleButtonCallback(callback)} square />
                    <Spacer vertical />
                  </React.Fragment>
                );
              })}
            </View>
            <Spacer />
          </View>
        </View>
      </RNModal>
    );
  }
}
