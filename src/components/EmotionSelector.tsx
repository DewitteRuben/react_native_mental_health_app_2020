import React from "react";
import { View } from "react-native";
import SwitchButton from "./SwitchButton";
import Text from "./Text";
import Button from "./Button";
import moodData from "../data/moodData.json";
import _ from "lodash";
import MultiButtonSelector from "./MultiButtonSelector";
import Spacer from "./Spacer";
import { AntDesign } from "@expo/vector-icons";
import Modal, { IModalButton, createModalButton } from "./Modal";
import Input from "./Input";

const emotions = moodData.emotions;

const energyTypes = ["highEnergy", "lowEnergy"] as const;
const emotionalStateTypes = ["pleasant", "unpleasant"] as const;

const energyValues = energyTypes.slice();
const emotionalStateValues = emotionalStateTypes.slice();

type Energy = typeof energyTypes[number];
type EmotionalState = typeof emotionalStateTypes[number];

interface IEmotionSelectorState {
  energyLevel?: Energy;
  emotionalState?: EmotionalState;
  modalVisible: boolean;
  emotion: string;
  experience: string;
  extraEmotions: string[];
}

export default class EmotionSelector extends React.Component<{}, IEmotionSelectorState> {
  state: IEmotionSelectorState = {
    modalVisible: false,
    extraEmotions: [],
    emotion: "",
    experience: "",
  };

  setEnergyLevel = (text: string, index: number, value?: string) => {
    if (value) {
      this.setState({ energyLevel: value as Energy });
    }
  };

  setEmotionalState = (text: string, index: number, value?: string) => {
    if (value) {
      this.setState({ emotionalState: value as EmotionalState });
    }
  };

  getEmotions = () => {
    const { energyLevel, emotionalState, extraEmotions } = this.state;
    if (energyLevel && emotionalState) {
      return emotions[energyLevel][emotionalState]
        .concat(extraEmotions)
        .map((emotion) => ({ id: `${emotion}-button`, value: emotion }));
    }
    return null;
  };

  setEmotion = (emotion: string) => {
    this.setState({ emotion });
  };

  addEmotion = () => {
    const { emotion } = this.state;
    this.setState(({ extraEmotions }) => ({ extraEmotions: [...extraEmotions, emotion], modalVisible: false }));
  };

  openModal = () => {
    this.setState({ modalVisible: true });
  };

  closeModal = () => {
    this.setState({ modalVisible: false });
  };

  buttons: IModalButton[] = [createModalButton("Cancel", this.closeModal), createModalButton("Add", this.addEmotion)];

  render() {
    const { modalVisible } = this.state;
    const emotionsList = this.getEmotions();
    return (
      <View>
        <Text align="center">Describe your current energy levels.</Text>
        <Spacer />
        <SwitchButton onChange={this.setEnergyLevel} values={energyValues}>
          <Button text="High energy" />
          <Button text="Low energy" />
        </SwitchButton>
        <Spacer />
        <Text align="center">Describe your current emotional state.</Text>
        <Spacer />
        <SwitchButton onChange={this.setEmotionalState} values={emotionalStateValues}>
          <Button text="Pleasant" />
          <Button text="Unpleasant" />
        </SwitchButton>
        <Spacer size={8} />
        <Text align="center">Select at least one option that most accurately describes your current emotions</Text>
        {emotionsList && (
          <>
            <MultiButtonSelector max={2} data={emotionsList} />
            <Spacer />
            <Button
              block
              square
              text="Add an emotion"
              onPress={this.openModal}
              iconComponent={<AntDesign name="plus" size={20} color="black" />}
            />
          </>
        )}
        <Modal buttons={this.buttons} visible={modalVisible} title="Add an emotion">
          <Input onChangeText={this.setEmotion} label="Enter your emotion here" />
        </Modal>
      </View>
    );
  }
}
