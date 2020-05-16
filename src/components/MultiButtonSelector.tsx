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

export interface IMultiSelectorButton {
  id: string;
  value: string;
}

interface IMultiButtonSelectorProps extends Partial<IButtonProps> {
  max?: number;
  onSelect?: (selected: IMultiSelectorButton[]) => void;
  data: (string | IMultiSelectorButton)[];
}

interface IMultiButtonSelectorState {
  selected: IMultiSelectorButton[];
}

export default class MultiButtonSelector extends React.Component<IMultiButtonSelectorProps, IMultiButtonSelectorState> {
  state: IMultiButtonSelectorState = {
    selected: [],
  };

  shouldComponentUpdate(nextProps: IMultiButtonSelectorProps, nextState: IMultiButtonSelectorState) {
    return !_.isEqual(nextProps, this.props) || !_.isEqual(nextState, this.state);
  }

  componentDidUpdate(prevProps: IMultiButtonSelectorProps) {
    const { data } = prevProps;

    if (!_.isEqual(data, this.props.data)) {
      this.setState({ selected: [] });
    }
  }

  handleOnSelect = (button: IMultiSelectorButton) => () => {
    const { max, onSelect } = this.props;
    const { selected } = this.state;
    const maximumSelected = max || Number.MAX_SAFE_INTEGER;

    if (selected === undefined) {
      return;
    }

    let curSelected = selected.slice().map((button) => ({ ...button }));
    const isAlreadySelected = _.some(curSelected, (selected) => selected.id === button.id);

    if (isAlreadySelected) {
      curSelected = curSelected.filter((sel) => sel.id !== button.id);
    } else {
      curSelected = [...(curSelected.length === maximumSelected ? curSelected.slice(-1) : curSelected), button];
    }

    this.setState({ selected: curSelected }, () => {
      if (onSelect) {
        onSelect(this.state.selected);
      }
    });
  };

  isActive = (button: IMultiSelectorButton) => {
    const { selected } = this.state;
    return _.some(selected, (selected) => selected.id === button.id);
  };

  getData = () => {
    const { data } = this.props;
    const firstElement = data[0];
    if (typeof firstElement === "string") {
      const stringArray = data as string[];
      const dataArray = stringArray.map((experience) => ({ id: `experience-${experience}`, value: experience }));
      return dataArray;
    }
    return data as IMultiSelectorButton[];
  };

  render() {
    const { data, type, onSelect, block, ...rest } = this.props;

    const defaultType: ButtonColor = "blue";
    const columnWrapper = !block && multiButtonSelectorStyles.listContainer;
    const numColumns = block ? undefined : 5;

    return (
      <FlatList
        columnWrapperStyle={columnWrapper}
        data={this.getData()}
        numColumns={numColumns}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <Button
            style={multiButtonSelectorStyles.button}
            onPress={this.handleOnSelect(item)}
            active={this.isActive(item)}
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
