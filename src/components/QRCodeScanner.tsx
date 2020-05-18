import React from "react";
import { View, StyleSheet } from "react-native";
import { BarCodeScanner, PermissionStatus, BarCodeEvent } from "expo-barcode-scanner";
import Text from "./Text";
import Button from "./Button";

interface IQRCodeScannerState {
  status?: PermissionStatus;
}

interface IQRCodeScannerProps {
  onScan?: (data: string) => void;
}

const BARCODE_TYPE_QR = ["qr"];

const qrCodeScannerStyles = StyleSheet.create({
  scannerView: {
    flex: 1,
  },
});

export default class QRCodeScanner extends React.Component<IQRCodeScannerProps, IQRCodeScannerState> {
  state: IQRCodeScannerState = {
    status: undefined,
  };

  requestPermission = async () => {
    const { status } = await BarCodeScanner.requestPermissionsAsync();
    this.setState({ status });
  };

  async componentDidMount() {
    this.requestPermission();
  }

  handleScan = (params: BarCodeEvent) => {
    const { onScan } = this.props;
    const { data } = params;
    if (onScan) {
      onScan(data);
    }
  };

  render() {
    const { status } = this.state;

    if (status === PermissionStatus.UNDETERMINED || undefined) {
      return (
        <View>
          <Text>Requesting permission..</Text>
        </View>
      );
    }

    if (status === PermissionStatus.DENIED) {
      return (
        <View>
          <Text>Permission was denied.</Text>
          <Button block type="blue" onPress={this.requestPermission} active text="Request permission again" />
        </View>
      );
    }

    return (
      <BarCodeScanner
        style={qrCodeScannerStyles.scannerView}
        barCodeTypes={BARCODE_TYPE_QR}
        onBarCodeScanned={this.handleScan}
      />
    );
  }
}
