import GameCard from "@/components/GameCard";
import GameHeaderComponent from "@/components/GameHeaderComponent";
import GamePageNavigator from "@/components/GamePageNavigator";
import { useGameQuery } from "@/context/GameQueryContext";
import useGames from "@/hooks/useGames";
import { ActivityIndicator, FlatList, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useThemeSetting } from "../../context/ThemeContext";

export default function HomeScreen() {
  const { top } = useSafeAreaInsets();
  const { colors } = useThemeSetting();
  const { gameQuery } = useGameQuery();
  const { data: games, error, loading } = useGames(gameQuery);

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        paddingHorizontal: 24,
        paddingTop: top,
      }}
    >
      {loading && <ActivityIndicator size="large" color={colors.tint} />}

      {!loading && error && (
        <Text style={{ color: colors.text }}>Error: {error.message}</Text>
      )}

      {!loading && !error && (
        <FlatList
          contentContainerStyle={{ gap: 24, paddingBottom: 48 }}
          data={games?.results}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => <GameCard game={item} />}
          showsVerticalScrollIndicator={false}
          style={{ marginTop: 24, width: "100%" }}
          ListHeaderComponent={<GameHeaderComponent />}
          ListFooterComponent={
            <GamePageNavigator next={games?.next} previous={games?.previous} />
          }
          ListEmptyComponent={
            <Text
              style={{ color: colors.text, textAlign: "center", fontSize: 18 }}
            >
              No games found
            </Text>
          }
        />
      )}
    </View>
  );
}
