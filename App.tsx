import React from "react";
import "react-native-gesture-handler";
import { YellowBox } from "react-native";
import { Provider } from "react-redux";
import Root from "./src/views/Root";
import store, { persistor } from "./src/redux/store";
import { PersistGate } from "redux-persist/integration/react";

YellowBox.ignoreWarnings(["VirtualizedLists should never be nested"]);

const App = () => (
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <Root />
    </PersistGate>
  </Provider>
);

export default App;
