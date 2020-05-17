import React from "react";
import { View } from "react-native";
import MultiButtonSelector, { IMultiSelectorButton } from "./MultiButtonSelector";
import Modal, { createModalButton } from "./Modal";
import Input from "./Input";
import Button from "./Button";
import { AntDesign } from "@expo/vector-icons";
import Text from "./Text";
import SwitchButton from "./SwitchButton";
import Spacer from "./Spacer";
import _ from "lodash";

export interface IExperienceItem {
  name: string;
  positive: boolean;
}

interface IExperienceSelectorProps {
  data: IExperienceItem[];
  onChange?: (experiences: IExperienceItem[]) => void;
}

interface IExperienceSelectorState {
  extraExperiences: IExperienceItem[];
  modalVisible: boolean;
  positiveExperience: boolean;
  experience: string;
  positive: IMultiSelectorButton[];
  negative: IMultiSelectorButton[];
}

const positive = (item: IExperienceItem) => {
  return item.positive;
};

const negative = (item: IExperienceItem) => {
  return !item.positive;
};

const switchValues = [true, false];

export default class ExperienceSelector extends React.Component<IExperienceSelectorProps, IExperienceSelectorState> {
  state: IExperienceSelectorState = {
    extraExperiences: [],
    modalVisible: false,
    positiveExperience: false,
    experience: "",
    positive: [],
    negative: [],
  };

  getExperiences = (predicate: (value: IExperienceItem) => boolean) => {
    const { data } = this.props;
    const { extraExperiences } = this.state;
    const experiences = data.concat(extraExperiences).filter(predicate);
    return experiences.map(({ name }) => name);
  };

  addNewExperience = () => {
    const { experience, positiveExperience, extraExperiences } = this.state;
    const extraExperience = { name: experience, positive: positiveExperience };
    if (experience.length > 0) {
      this.setState({ extraExperiences: [...extraExperiences, extraExperience], modalVisible: false });
    }
  };

  onInputChange = (text: React.ReactText) => {
    this.setState({ experience: text as string });
  };

  setExperienceType = (text: string, index: number, value?: any) => {
    this.setState({ positiveExperience: value });
  };

  hideModal = () => {
    this.setState({ modalVisible: false });
  };

  displayModal = () => {
    this.setState({ modalVisible: true });
  };

  handleOnSelect = (type: "positive" | "negative") => (selectedButtons: IMultiSelectorButton[]) => {
    this.setState({ [type]: selectedButtons } as Record<typeof type, typeof selectedButtons>); // typechecking for computed setState props in typescript is bugged, workaround
  };

  getSelectedExperiences = () => {
    const { data } = this.props;
    const { positive, negative } = this.state;
    const selected = positive.concat(negative).map((btn) => btn.value);
    return data.filter((btn) => selected.includes(btn.name));
  };

  componentDidUpdate(prevProps: IExperienceSelectorProps, prevState: IExperienceSelectorState) {
    const { onChange } = this.props;
    if (
      prevState.negative.length !== this.state.negative.length ||
      prevState.positive.length !== this.state.positive.length
    ) {
      if (onChange) {
        onChange(this.getSelectedExperiences());
      }
    }
  }

  buttons = [createModalButton("cancel", this.hideModal), createModalButton("add", this.addNewExperience)];

  render() {
    const { modalVisible } = this.state;
    return (
      <View>
        <MultiButtonSelector
          onSelect={this.handleOnSelect("positive")}
          block
          type="green"
          data={this.getExperiences(positive)}
        />
        <MultiButtonSelector
          onSelect={this.handleOnSelect("negative")}
          block
          type="darkBlue"
          data={this.getExperiences(negative)}
        />
        <Spacer />
        <Button
          block
          square
          text="Add an experience"
          onPress={this.displayModal}
          iconComponent={<AntDesign name="plus" size={20} color="black" />}
        />
        <Modal buttons={this.buttons} visible={modalVisible} title="Add an experience">
          <Input onChangeText={this.onInputChange} label="Enter your experience" />
          <Spacer />
          <Text>I would describe the experience as:</Text>
          <SwitchButton onChange={this.setExperienceType} values={switchValues}>
            <Button text="Positive" type="green" />
            <Button text="Negative" type="darkBlue" />
          </SwitchButton>
          <Spacer />
        </Modal>
      </View>
    );
  }
}
