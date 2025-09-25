import { useLocalSearchParams } from "expo-router";
import { Text, View } from "react-native";

const GameScreen = () => {
  const { id } = useLocalSearchParams();

  return (
    <View>
      <Text>GameScreen</Text>
    </View>
  );
};

export default GameScreen;
