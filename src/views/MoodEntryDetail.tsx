import Container from "../components/Container";
import React from "react";
import { connect } from "react-redux";
import { IRootStoreState } from "../redux/store";
import { entryByIdSelector } from "../redux/mood/selectors";
import { IMoodEntry } from "../api/moodApi";
import { RouteProp, NavigationProp } from "@react-navigation/native";
import Text from "../components/Text";

type ParamList = {
  EntryDetail: { entryId: string };
};

interface IMoodEntryDetailProps {
  entryById: (id: string) => IMoodEntry | undefined;
  route: RouteProp<ParamList, "EntryDetail">;
  navigation: NavigationProp<{}>;
}

class MoodEntryDetail extends React.Component<IMoodEntryDetailProps> {
  render() {
    const { navigation, entryById } = this.props;
    const { entryId } = this.props.route.params;

    if (!entryId) {
      navigation.goBack();
      return null;
    }

    const entry = entryById(entryId);
    return (
      <Container padded scroll>
        <Text>{JSON.stringify(entry)}</Text>
      </Container>
    );
  }
}

const mapStateToProps = (state: IRootStoreState) => ({
  entryById: (id: string) => entryByIdSelector(id)(state),
});

export default connect(mapStateToProps, null)(MoodEntryDetail);
