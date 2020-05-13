import React from "react";
import { View, StyleSheet, Dimensions, Modal as RNModal } from "react-native";
import Text from "./Text";
import Button from "./Button";
import Spacer from "./Spacer";

const width = Dimensions.get("window").width;
const height = Dimensions.get("window").height;

const modalStyles = StyleSheet.create({
  backdrop: {
    flex: 1,
    backgroundColor: "rgba(0,0,0, 0.8)",
    justifyContent: "center",
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
  close?: boolean;
}

interface IModalProps {
  title: string;
  buttons: IModalButton[];
  visible?: boolean;
  onClose?: () => void;
}

interface IModalState {
  visible?: boolean;
}

export const createModalButton = (text: string, callback?: () => void, close?: boolean) => {
  return {
    text,
    callback,
    close,
  };
};

export default class Modal extends React.Component<IModalProps, IModalState> {
  state: IModalState = {
    visible: this.props.visible || false,
  };

  closeModal = () => {
    const { onClose } = this.props;
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

  handleOnCloseButton = (callback?: () => void, close?: boolean) => () => {
    if (callback) callback();
    if (close) this.closeModal();
  };

  render() {
    const { title, children, buttons } = this.props;
    const { visible } = this.state;
    return (
      <RNModal transparent visible={visible}>
        <View style={modalStyles.backdrop}>
          <View style={modalStyles.container}>
            <Text bold size="large">
              {title}
            </Text>
            <View>{children}</View>
            <Spacer />
            <View style={modalStyles.buttons}>
              {buttons.map(({ callback, text, close }, index: number) => {
                const key = `modalButton-${index}`;
                if (index === buttons.length - 1) {
                  return <Button key={key} text={text} onPress={this.handleOnCloseButton(callback, close)} square />;
                }
                return (
                  <React.Fragment key={key}>
                    <Button text={text} onPress={this.handleOnCloseButton(callback, close)} square />
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
