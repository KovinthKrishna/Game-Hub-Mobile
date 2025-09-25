import useGame from "@/hooks/useGame";
import { useLocalSearchParams } from "expo-router";
import { Text, View } from "react-native";

const GameScreen = () => {
  const { id } = useLocalSearchParams();
  const { data: game, error, loading } = useGame(id as string);

  return (
    <View>
      <Text>GameScreen</Text>
    </View>
  );
};

export default GameScreen;
