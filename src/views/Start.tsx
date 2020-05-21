import React from "react";
import Container from "../components/Container";
import QRCodeScanner from "../components/QRCodeScanner";
import Text from "../components/Text";
import { View, Image, StyleSheet } from "react-native";
import Button from "../components/Button";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import Spacer from "../components/Spacer";
import Modal, { createModalButton } from "../components/Modal";
import { connect } from "react-redux";
import { Dispatch } from "redux";
import { AuthAction, AttemptAuthAction, IAttemptAuth } from "../redux/auth/actions/authActions";
import { isUUID } from "../utils/parse";

const startStyles = StyleSheet.create({
  logoContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    borderColor: "gray",
    borderWidth: 1,
    borderRadius: 10,
    marginTop: 20,
  },
  imageContainer: { width: 60, height: 120 },
  image: { flex: 1, width: undefined, height: undefined },
  contentContainer: { flex: 2 },
  buttonContainer: { alignSelf: "center", alignItems: "center" },
});

interface IStartState {
  modalVisible: boolean;
}

interface IStartProps {
  authenticate: (userId?: string) => IAttemptAuth;
}

class Start extends React.Component<IStartProps, IStartState> {
  state: IStartState = {
    modalVisible: false,
  };

  hideModal = () => {
    this.setState({ modalVisible: false });
  };

  showModal = () => {
    this.setState({ modalVisible: true });
  };

  handleScan = (text: string) => {
    const { authenticate } = this.props;

    const valid = isUUID(text);
    if (valid) {
      authenticate(text);
      this.setState({ modalVisible: false });
    }

    return valid;
  };

  buttons = [createModalButton("Close", this.hideModal)];

  render() {
    const { modalVisible } = this.state;
    return (
      <Container padded>
        <View style={startStyles.logoContainer}>
          <View style={startStyles.imageContainer}>
            <Image style={startStyles.image} source={require("../images/saiko.png")} />
          </View>
          <Spacer vertical />
          <Text size="large" bold>
            PsyTrack
          </Text>
        </View>
        <Spacer />
        <View style={startStyles.contentContainer}>
          <Text>
            In order to start using the application, request your mental health professional to provide you with the
            neccesary credentials.
          </Text>
          <Text>Authentication is possible via QR code or by entering the passphrase.</Text>
          <Spacer />
          <View style={startStyles.buttonContainer}>
            <Button
              text="QR Code"
              square
              block
              type="blue"
              active
              onPress={this.showModal}
              iconComponent={<MaterialCommunityIcons name="qrcode" size={24} />}
            />
            <Spacer />
            <Button
              block
              text="Passphrase"
              square
              type="blue"
              active
              iconComponent={<MaterialCommunityIcons name="key" size={24} />}
            />
          </View>
          <Modal fill title="Scan QR code" visible={modalVisible} buttons={this.buttons}>
            <QRCodeScanner single onScan={this.handleScan} />
          </Modal>
        </View>
      </Container>
    );
  }
}

const mapDispatchToProps = (dispatch: Dispatch<AuthAction>) => ({
  authenticate: (userId?: string) => dispatch(AttemptAuthAction(userId)),
});

export default connect(null, mapDispatchToProps)(Start);
