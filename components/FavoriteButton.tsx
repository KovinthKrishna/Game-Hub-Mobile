import { useFavorites } from "@/context/FavoritesContext";
import { useThemeSetting } from "@/context/ThemeContext";
import { Ionicons } from "@expo/vector-icons";
import * as Haptics from "expo-haptics";
import { Pressable } from "react-native";

const FavoriteButton = ({ gameId }: { gameId: number }) => {
  const { colors } = useThemeSetting();
  const { isFavorite, toggleFavorite } = useFavorites();

  const onPress = async () => {
    await toggleFavorite(gameId);
    try {
      await Haptics.selectionAsync();
    } catch {}
  };

  return (
    <Pressable
      onPress={onPress}
      hitSlop={8}
      style={{
        padding: 8,
        backgroundColor: colors.card + "BF",
        borderRadius: 20,
      }}
    >
      <Ionicons
        name={isFavorite(gameId) ? "heart" : "heart-outline"}
        size={24}
        color={colors.text}
      />
    </Pressable>
  );
};

export default FavoriteButton;
