import Container from "../components/Container";
import React from "react";
import { connect } from "react-redux";
import { IRootStoreState } from "../redux/store";
import { entryByIdSelector } from "../redux/mood/selectors";
import { IMoodEntry } from "../api/moodApi";
import { RouteProp } from "@react-navigation/native";
import Text from "../components/Text";
import GoBack from "../components/GoBack";
import SmileyButton, { SmileyType } from "../components/SmileyButton";
import moment from "moment";
import { StyleSheet, View } from "react-native";
import Button from "../components/Button";
import Spacer from "../components/Spacer";

type ParamList = {
  EntryDetail: { entryId: string };
};

interface IMoodEntryDetailProps {
  entryById: (id: string) => IMoodEntry | undefined;
  route: RouteProp<ParamList, "EntryDetail">;
}

const moodEntryDetailStyles = StyleSheet.create({
  center: {
    alignItems: "center",
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-evenly",
  },
  timeBar: {
    flexDirection: "row",
    flex: 1,
    borderColor: "#77B4E8",
    borderWidth: 1,
    borderRadius: 16,
    height: 32,
    justifyContent: "space-evenly",
  },
});

class MoodEntryDetail extends React.Component<IMoodEntryDetailProps> {
  render() {
    const { entryById } = this.props;
    const { entryId } = this.props.route.params;

    if (!entryId) {
      return <GoBack />;
    }

    const entry = entryById(entryId);

    if (!entry) {
      return <GoBack />;
    }

    const { date, emotions, mood, experiences, hoursOfSleep, thoughts } = entry;
    return (
      <Container padded scroll>
        <Spacer />
        <Text>Date of logging: {moment(date).format("lll")}</Text>
        <Text bold size="large">
          Mood
        </Text>
        <View style={moodEntryDetailStyles.center}>
          <SmileyButton disabled type={mood as SmileyType} />
        </View>
        <Text bold size="large">
          Emotions
        </Text>
        <Spacer />
        <View style={moodEntryDetailStyles.row}>
          {emotions.map((emotion, index) => (
            <Button disabled type="orange" key={`moodEntryDetail-emotion-${index}`} active text={emotion} />
          ))}
        </View>
        <Spacer />
        <Text bold size="large">
          Experiences
        </Text>
        <Spacer />
        <View>
          {experiences.map((exp, index) => (
            <React.Fragment key={`experience-${exp.name}-${index}`}>
              <Button block active disabled type={exp.positive ? "green" : "darkBlue"} text={exp.name} />
              <Spacer />
            </React.Fragment>
          ))}
        </View>
        <Text bold size="large">
          Sleep
        </Text>
        <View style={moodEntryDetailStyles.center}>
          <Text>
            {hoursOfSleep} hour{hoursOfSleep === 0 || (hoursOfSleep > 1 && "s")}
          </Text>
        </View>
        {thoughts !== undefined && thoughts.length > 0 && (
          <>
            <Text bold size="large">
              Thoughts
            </Text>
            <View style={moodEntryDetailStyles.center}>
              <Text>{thoughts}</Text>
            </View>
          </>
        )}
        <Spacer />
      </Container>
    );
  }
}

const mapStateToProps = (state: IRootStoreState) => ({
  entryById: (id: string) => entryByIdSelector(id)(state),
});

export default connect(mapStateToProps, null)(MoodEntryDetail);
