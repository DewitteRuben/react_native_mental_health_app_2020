import React from "react";
import { View } from "react-native";
import Text from "../components/Text";
import { NavigationContainer } from "@react-navigation/native";
import { renderMainNavigationTabs, renderStartSplash } from "../navigation/navigation";
import { AuthAction, SetUserIdAction, ISetUserId } from "../redux/auth/actions/authActions";
import { connect } from "react-redux";
import { isAuthenticated } from "../redux/auth/selectors";
import { IRootStoreState } from "../redux/store";
import { Dispatch } from "redux";

interface IRootProps {
  authenticated?: boolean;
  authenticate: () => ISetUserId;
}

class Root extends React.Component<IRootProps, {}> {
  componentDidMount() {
    const { authenticate } = this.props;
    authenticate();
  }

  render() {
    const { authenticated } = this.props;

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
  authenticated: isAuthenticated(state.auth),
});

const mapDispatchToProps = (dispatch: Dispatch<AuthAction>) => ({
  authenticate: () => dispatch(SetUserIdAction()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Root);
