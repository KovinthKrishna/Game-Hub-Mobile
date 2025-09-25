import ExpandableText from "@/components/ExpandableText";
import FavoriteButton from "@/components/FavoriteButton";
import GameAttributes from "@/components/GameAttributes";
import GameScreenshots from "@/components/GameScreenshots";
import GameTrailer from "@/components/GameTrailer";
import { useThemeSetting } from "@/context/ThemeContext";
import useGame from "@/hooks/useGame";
import getCroppedImageUrl from "@/utils/image-url";
import { Image } from "expo-image";
import { router, useLocalSearchParams } from "expo-router";
import {
  ActivityIndicator,
  Pressable,
  ScrollView,
  Text,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const GameScreen = () => {
  const { id } = useLocalSearchParams();
  const { data: game, error, loading } = useGame(id as string);
  const { colors } = useThemeSetting();
  const { top } = useSafeAreaInsets();

  if (loading)
    return (
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <ActivityIndicator size="large" color={colors.tint} />
      </View>
    );

  if (error || !game)
    return (
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <Text style={{ color: colors.text, fontSize: 18 }}>
          Failed to load game
        </Text>
      </View>
    );

  return (
    <ScrollView
      contentContainerStyle={{
        gap: 16,
        paddingHorizontal: 24,
        paddingBottom: 48,
      }}
      style={{ flex: 1, marginTop: top + 24 }}
      showsVerticalScrollIndicator={false}
    >
      <View>
        <Image
          source={getCroppedImageUrl(game.background_image)}
          style={{ width: "100%", aspectRatio: 6 / 4 }}
          contentFit="cover"
        />
        <View style={{ position: "absolute", top: 8, right: 8 }}>
          <FavoriteButton gameId={game.id} />
        </View>
      </View>
      <Text
        style={{
          fontSize: 30,
          fontWeight: "700",
          color: colors.text,
        }}
      >
        {game.name}
      </Text>
      <ExpandableText description={game.description_raw} />
      <GameAttributes game={game} />
      <GameTrailer gameId={game.id} />
      <GameScreenshots gameId={game.id} />
      <Pressable
        style={{
          backgroundColor: colors.tint,
          padding: 14,
          borderRadius: 10,
          alignItems: "center",
        }}
        onPress={router.back}
      >
        <Text style={{ color: "white", fontWeight: "600" }}>Go Back</Text>
      </Pressable>
    </ScrollView>
  );
};

export default GameScreen;
