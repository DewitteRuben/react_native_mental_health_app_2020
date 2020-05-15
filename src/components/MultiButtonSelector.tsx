import React, { Component } from "react";
import { FlatList, StyleSheet } from "react-native";
import Button, { IButtonProps, ButtonColor } from "./Button";
import _ from "lodash";

const multiButtonSelectorStyles = StyleSheet.create({
  listContainer: {
    flex: 1,
    flexWrap: "wrap",
    alignItems: "center",
    justifyContent: "space-evenly",
  },
  button: { marginHorizontal: 5, marginVertical: 5 },
});

interface IMultiButtonSelectorProps extends Partial<IButtonProps> {
  max?: number;
  onSelect?: (selected: string[]) => void;
  data: { id: string; value: string }[];
}

interface IMultiButtonSelectorState {
  selected: string[];
}

const onSelectCallback = (selected: string[], onSelect?: (selected: string[]) => void) => () => {
  if (onSelect) {
    onSelect(selected);
  }
};

export default class MultiButtonSelector extends Component<IMultiButtonSelectorProps, IMultiButtonSelectorState> {
  state: IMultiButtonSelectorState = {
    selected: [],
  };

  componentDidUpdate(prevProps: IMultiButtonSelectorProps) {
    const { data } = prevProps;
    if (data !== this.props.data) {
      this.setState({ selected: [] });
    }
  }

  handleOnSelect = (id: string) => () => {
    const { max, onSelect } = this.props;
    const { selected } = this.state;
    const maximumSelected = max || 2;

    if (selected === undefined) {
      return;
    }

    let curSelected = selected.slice();
    if (curSelected.includes(id)) {
      curSelected = curSelected.filter((sel) => sel !== id);
    } else {
      curSelected = [...(curSelected.length === maximumSelected ? curSelected.slice(-1) : curSelected), id];
    }

    this.setState({ selected: curSelected }, onSelectCallback(selected, onSelect));
  };

  isActive = (id: string) => {
    const { selected } = this.state;
    return selected?.includes(id);
  };

  render() {
    const { data, type, onSelect, block, ...rest } = this.props;

    const defaultType: ButtonColor = "blue";
    const columnWrapper = !block && multiButtonSelectorStyles.listContainer;
    const numColumns = block ? undefined : 5;

    return (
      <FlatList
        columnWrapperStyle={columnWrapper}
        data={data}
        numColumns={numColumns}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <Button
            style={multiButtonSelectorStyles.button}
            onPress={this.handleOnSelect(item.id)}
            active={this.isActive(item.id)}
            type={type || defaultType}
            key={item.id}
            block={block}
            text={_.capitalize(item.value)}
            {...rest}
          />
        )}
      />
    );
  }
}
