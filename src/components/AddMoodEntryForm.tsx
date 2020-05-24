import React from "react";
import { View } from "react-native";
import SmileySelector from "./SmileySelector";
import Spacer from "./Spacer";
import EmotionSelector from "./EmotionSelector";
import ExperienceSelector, { IExperienceItem } from "./ExperienceSelector";
import Input from "./Input";
import Text from "./Text";
import moodData from "../data/moodData.json";
import Button from "./Button";
import { AntDesign } from "@expo/vector-icons";
import { SmileyType } from "./SmileyButton";
import { IMultiSelectorButton } from "./MultiButtonSelector";
import _ from "lodash";
import { PartialBy } from "../utils/types";
import Modal, { createModalButton } from "./Modal";
import { uuid } from "uuidv4";

export interface INewMoodEntry {
  entryId: string;
  date: Date;
  mood: SmileyType;
  emotions: string[];
  experiences: IExperienceItem[];
  thoughts: string;
  hoursOfSleep: number;
}

interface IAddMoodEntryFormProps {
  onSave?: (entry: PartialBy<INewMoodEntry, "thoughts">) => void;
}

interface IAddMoodEntryFormState extends Partial<INewMoodEntry> {
  modalVisible: boolean;
  modalMessage: string;
}

export default class AddMoodEntryForm extends React.Component<IAddMoodEntryFormProps, IAddMoodEntryFormState> {
  state: IAddMoodEntryFormState = {
    emotions: [],
    experiences: [],
    thoughts: "",
    mood: undefined,
    hoursOfSleep: undefined,
    modalVisible: false,
    modalMessage: "",
  };

  setSmiley = (smiley: SmileyType) => {
    this.setState({ mood: smiley });
  };

  setEmotions = (selected: IMultiSelectorButton[]) => {
    this.setState({ emotions: selected.map((sel) => sel.value) });
  };

  setExperiences = (experiences: IExperienceItem[]) => {
    this.setState({ experiences });
  };

  setSleep = (sleep: React.ReactText) => {
    this.setState({ hoursOfSleep: sleep as number });
  };

  setThoughts = (thoughts: React.ReactText) => {
    this.setState({ thoughts: thoughts as string });
  };

  saveEntry = () => {
    const { onSave } = this.props;
    const { emotions, experiences, hoursOfSleep, mood, thoughts } = this.state;
    const requiredFields: { [key: string]: any } = { emotions, experiences, hoursOfSleep, mood };

    const fieldKeys = Object.keys(requiredFields);
    const emptyRequiredFields = fieldKeys.filter(
      (key) =>
        !requiredFields[key] ||
        ((Array.isArray(requiredFields[key]) || typeof requiredFields[key] === "string") && requiredFields[key].length === 0)
    );

    if (emptyRequiredFields.length > 0) {
      const prettyRequiredFields = emptyRequiredFields.map((field) => _.capitalize(field)).join(", ");
      const message = `The following fields need to be filled in: ${prettyRequiredFields}`;
      return this.setState({ modalVisible: true, modalMessage: message });
    }

    if (onSave && emotions && experiences && hoursOfSleep && mood) {
      const entryId = uuid(); // needs to be created locally to support offline support
      const date = new Date(); // needs to be created locally to support offline support
      onSave({ entryId, emotions, experiences, hoursOfSleep, mood, date, thoughts });
    }
  };

  closeModal = () => {
    this.setState({ modalVisible: false });
  };

  buttons = [createModalButton("Ok", this.closeModal)];

  render() {
    const { modalMessage, modalVisible } = this.state;
    return (
      <>
        <Text size="large" bold align="center">
          Mood
          <Text bold size="large" color="red">
            *
          </Text>
        </Text>
        <Text align="center">Which smiley fits your mood the most?</Text>
        <SmileySelector onChange={this.setSmiley} />
        <Spacer size={8} />
        <Text size="large" bold align="center">
          Emotions
          <Text bold size="large" color="red">
            *
          </Text>
        </Text>
        <EmotionSelector onSelect={this.setEmotions} />
        <Spacer />
        <Text align="center" bold size="large">
          Experiences
          <Text bold size="large" color="red">
            *
          </Text>
        </Text>
        <ExperienceSelector onChange={this.setExperiences} data={moodData.experiences} />
        <Spacer />
        <Text align="center" bold size="large">
          Sleep
          <Text bold size="large" color="red">
            *
          </Text>
        </Text>
        <Text align="center">How many hours did you sleep last night?</Text>
        <Input onChangeText={this.setSleep} number maxDigits={2} />
        <Spacer />
        <Text align="center" bold size="large">
          Thoughts
        </Text>
        <Text align="center">Note down any specific thoughts you have:</Text>
        <Input onChangeText={this.setThoughts} multiline />
        <Spacer />
        <Text>
          <Text color="red">* </Text>
          Indicates a required field
        </Text>
        <Spacer />
        <Button
          iconComponent={<AntDesign name="check" size={24} />}
          type="orange"
          iconPosition="right"
          active
          onPress={this.saveEntry}
          block
          text="Save entry"
        />
        <Spacer />
        <Modal visible={modalVisible} title="Missing fields" buttons={this.buttons}>
          <Text>{modalMessage}</Text>
        </Modal>
      </>
    );
  }
}
