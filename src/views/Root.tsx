import React from "react";
import { View } from "react-native";
import Text from "../components/Text";
import { NavigationContainer } from "@react-navigation/native";
import { renderMainNavigationTabs, renderStartSplash } from "../navigation/navigation";
import { AuthAction, AttemptAuthAction, IAttemptAuth } from "../redux/auth/actions/authActions";
import { connect } from "react-redux";
import { IRootStoreState } from "../redux/store";
import { Dispatch } from "redux";
import { IAuthState } from "../redux/auth/reducer/authReducer";

interface IRootProps {
  authenticated?: IAuthState;
  authenticate: () => IAttemptAuth;
}

class Root extends React.Component<IRootProps, {}> {
  componentDidMount() {
    const { authenticate } = this.props;
    authenticate();
  }

  componentDidUpdate(prevProps: IRootProps) {
    const { authenticated, authenticate } = this.props;
    if (authenticated !== prevProps.authenticated) {
      if (authenticated === undefined) {
        authenticate();
      }
    }
  }

  render() {
    const { authenticated } = this.props;

    // TODO: replace with spinner
    if (authenticated === undefined) {
      return (
        <View>
          <Text>Loading...</Text>
        </View>
      );
    }

    return <NavigationContainer>{authenticated ? renderMainNavigationTabs() : renderStartSplash()}</NavigationContainer>;
  }
}

const mapStateToProps = (state: IRootStoreState) => ({
  authenticated: state.auth,
});

const mapDispatchToProps = (dispatch: Dispatch<AuthAction>) => ({
  authenticate: () => dispatch(AttemptAuthAction()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Root);
