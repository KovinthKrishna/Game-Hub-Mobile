import { useThemeSetting } from "@/context/ThemeContext";
import getCroppedImageUrl from "@/utils/image-url";
import { Image } from "expo-image";
import { Link } from "expo-router";
import { Pressable, Text, View } from "react-native";
import CriticScore from "./CriticScore";
import Emoji from "./Emoji";
import FavoriteButton from "./FavoriteButton";
import PlatformIconList from "./PlatformIconList";

const GameCard = ({ game }: { game: Game }) => {
  const { colors } = useThemeSetting();

  return (
    <Link href={{ pathname: "/games/[id]", params: { id: game.id } }} asChild>
      <Pressable
        onPress={() => {}}
        style={{
          backgroundColor: colors.card,
          borderRadius: 12,
          overflow: "hidden",
          borderWidth: 1,
          borderColor: colors.border,
        }}
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

        <View style={{ padding: 12 }}>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: 8,
            }}
          >
            <PlatformIconList
              platforms={game.parent_platforms?.map((p) => p.platform)}
              color={colors.text}
            />
            <CriticScore score={game.metacritic} />
          </View>

          <Text
            numberOfLines={1}
            style={{ color: colors.text, fontSize: 18, fontWeight: "700" }}
          >
            {game.name}
          </Text>

          <Emoji rating={game.rating_top} />
        </View>
      </Pressable>
    </Link>
  );
};

export default GameCard;
