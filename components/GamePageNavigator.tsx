import { useGameQuery } from "@/context/GameQueryContext";
import { useThemeSetting } from "@/context/ThemeContext";
import { Pressable, Text, View } from "react-native";

interface Props {
  next?: string | null;
  previous?: string | null;
}

const GamePageNavigator = ({ next, previous }: Props) => {
  const { colors } = useThemeSetting();
  const { decrementPage, incrementPage } = useGameQuery();

  return (
    <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
      <Pressable
        onPress={decrementPage}
        disabled={!previous}
        style={{
          paddingHorizontal: 16,
          paddingVertical: 10,
          backgroundColor: colors.tint,
          borderRadius: 8,
          opacity: previous ? 1 : 0.5,
        }}
      >
        <Text style={{ color: "white" }}>Previous</Text>
      </Pressable>
      <Pressable
        onPress={incrementPage}
        disabled={!next}
        style={{
          paddingHorizontal: 16,
          paddingVertical: 10,
          backgroundColor: colors.tint,
          borderRadius: 8,
          opacity: next ? 1 : 0.5,
        }}
      >
        <Text style={{ color: "white" }}>Next</Text>
      </Pressable>
    </View>
  );
};

export default GamePageNavigator;
