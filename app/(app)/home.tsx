import logo from "@/assets/images/logo.webp";
import GameCard from "@/components/GameCard";
import { useGameQuery } from "@/context/GameQueryContext";
import useGames from "@/hooks/useGames";
import { Image } from "expo-image";
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
          data={games?.results ?? []}
          keyExtractor={(item) => String(item.id)}
          renderItem={({ item }) => <GameCard game={item} />}
          showsVerticalScrollIndicator={false}
          style={{ marginTop: 24 }}
          ListHeaderComponent={
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <Text
                style={{ color: colors.text, fontSize: 24, fontWeight: "600" }}
              >
                Welcome!
              </Text>
              <Image source={logo} style={{ width: 48, aspectRatio: 1 / 1 }} />
            </View>
          }
          ListEmptyComponent={
            <Text style={{ color: colors.text }}>No games found</Text>
          }
        />
      )}
    </View>
  );
}
