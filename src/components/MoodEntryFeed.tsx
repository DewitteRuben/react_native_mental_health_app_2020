import React from "react";
import MoodEntryList from "./MoodEntryList";
import { connect } from "react-redux";
import { IRootStoreState } from "../redux/store";
import { IMoodEntry } from "../api/moodApi";

interface IMoodEntryFeedProps {
  entries: IMoodEntry[];
}

class MoodEntryFeed extends React.Component<IMoodEntryFeedProps> {
  render() {
    const { entries } = this.props;
    return <MoodEntryList entries={entries} />;
  }
}

const mapStateToProps = (state: IRootStoreState) => ({
  entries: state.mood.entries,
});

export default connect(mapStateToProps, null)(MoodEntryFeed);
