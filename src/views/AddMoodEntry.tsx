import React from "react";
import Container from "../components/Container";
import AddMoodEntryForm, { INewMoodEntry } from "../components/AddMoodEntryForm";
import { PartialBy } from "../utils/types";

export default class AddMoodEntry extends React.Component {
  render() {
    return (
      <Container scroll padded>
        <AddMoodEntryForm />
      </Container>
    );
  }
}
