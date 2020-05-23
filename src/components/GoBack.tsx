import React from "react";
import { useNavigation } from "@react-navigation/native";

const GoBack: React.FC = () => {
  const navigation = useNavigation();

  React.useEffect(() => {
    navigation.goBack();
  }, [navigation]);

  return null;
};

export default GoBack;
