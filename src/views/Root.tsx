import React from "react";
import { View } from "react-native";
import Text from "../components/Text";
import { NavigationContainer } from "@react-navigation/native";
import { renderMainNavigationTabs, renderStartSplash } from "../navigation/navigation";
import { AuthAction, AttemptAuthAction, IAttemptAuth } from "../redux/auth/actions/authActions";
import { connect } from "react-redux";
import { IRootStoreState } from "../redux/store";
import { Dispatch } from "redux";
import { AuthStatus } from "../redux/auth/reducer/authReducer";
import { InitSyncAction, IInitSync, CancelSyncAction, ICancelSync } from "../redux/mood/actions/moodActions";

interface IRootProps {
  status: AuthStatus;
  authenticate: () => IAttemptAuth;
  initSync: () => IInitSync;
  cancelSync: () => ICancelSync;
}

class Root extends React.Component<IRootProps, {}> {
  componentDidMount() {
    const { authenticate, initSync } = this.props;
    authenticate();
    initSync();
  }

  componentDidUpdate(prevProps: IRootProps) {
    const { authenticate, status } = this.props;
    if (prevProps.status !== status) {
      if (prevProps.status === "AUTHENTICATED") {
        authenticate();
      }
    }
  }

  componentWillUnmount() {
    const { cancelSync } = this.props
    cancelSync();
  }

  render() {
    const { status } = this.props;

    // TODO: replace with spinner
    if (status === "ESTABLISHING") {
      return (
        <View>
          <Text>Loading...</Text>
        </View>
      );
    }

    return (
      <NavigationContainer>
        {status === "AUTHENTICATED" ? renderMainNavigationTabs() : renderStartSplash()}
      </NavigationContainer>
    );
  }
}

const mapStateToProps = (state: IRootStoreState) => ({
  status: state.auth.status,
});

const mapDispatchToProps = (dispatch: Dispatch<AuthAction>) => ({
  authenticate: () => dispatch(AttemptAuthAction()),
  initSync: () => dispatch(InitSyncAction()),
  cancelSync: () => dispatch(CancelSyncAction()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Root);
