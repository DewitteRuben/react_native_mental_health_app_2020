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

interface IRootProps {
  status: AuthStatus;
  authenticate: () => IAttemptAuth;
}

class Root extends React.Component<IRootProps, {}> {
  componentDidMount() {
    const { authenticate } = this.props;
    authenticate();
  }

  render() {
    const { status } = this.props;

    // TODO: replace with spinner
    if (status === "ESTABLISING_AUTH") {
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
});

export default connect(mapStateToProps, mapDispatchToProps)(Root);
