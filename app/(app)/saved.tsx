import logo from "@/assets/images/logo.webp";
import FavoriteGameCard from "@/components/FavoriteGameCard";
import { useFavorites } from "@/context/FavoritesContext";
import { Image } from "expo-image";
import { FlatList, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useThemeSetting } from "../../context/ThemeContext";

export default function SavedScreen() {
  const { top } = useSafeAreaInsets();
  const { colors } = useThemeSetting();
  const { favoriteIds } = useFavorites();

  return (
    <View
      style={{
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        paddingHorizontal: 24,
        paddingTop: top,
      }}
    >
      <FlatList
        contentContainerStyle={{ gap: 24, paddingBottom: 48 }}
        data={[...favoriteIds]}
        keyExtractor={(item) => item.toString()}
        renderItem={({ item }) => <FavoriteGameCard gameId={item} />}
        showsVerticalScrollIndicator={false}
        style={{ marginTop: 24, width: "100%" }}
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
              Saved Games
            </Text>
            <Image source={logo} style={{ width: 48, aspectRatio: 1 / 1 }} />
          </View>
        }
        ListEmptyComponent={
          <Text
            style={{ color: colors.text, textAlign: "center", fontSize: 18 }}
          >
            No games saved
          </Text>
        }
      />
    </View>
  );
}
