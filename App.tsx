import React from "react";
import "react-native-gesture-handler";
import { YellowBox } from "react-native";
import { Provider } from "react-redux";
import store from "./src/redux/store";
import Root from "./src/views/Root";

YellowBox.ignoreWarnings(["VirtualizedLists should never be nested"]);

const App = () => (
  <Provider store={store}>
    <Root />
  </Provider>
);

export default App;
