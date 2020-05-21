import React from "react";
import Container from "../components/Container";
import AddMoodEntryForm, { INewMoodEntry } from "../components/AddMoodEntryForm";
import { connect } from "react-redux";
import { Dispatch } from "redux";
import { FetchAddNewMoodEntryAction, IFetchAddNewMoodEntry } from "../redux/mood/actions/moodActions";
import { IMoodEntry } from "../api/moodApi";
import { MoodAction } from "../redux/mood/actions/moodActions";
import { PartialBy } from "../utils/types";

interface IAddMoodEntryProps {
  fetchAddNewMoodEntry: (entry: IMoodEntry) => IFetchAddNewMoodEntry;
}

class AddMoodEntry extends React.Component<IAddMoodEntryProps> {
  handleOnSave = (entry: PartialBy<INewMoodEntry, "thoughts">) => {
    const { fetchAddNewMoodEntry } = this.props;
    fetchAddNewMoodEntry(entry);
  };

  render() {
    return (
      <Container scroll padded>
        <AddMoodEntryForm onSave={this.handleOnSave} />
      </Container>
    );
  }
}

const mapDispatchToProps = (dispatch: Dispatch<MoodAction>) => ({
  fetchAddNewMoodEntry: (entry: IMoodEntry) => dispatch(FetchAddNewMoodEntryAction(entry)),
});

export default connect(null, mapDispatchToProps)(AddMoodEntry);
