import useScreenshots from "@/hooks/useScreenshots";
import { Image } from "expo-image";
import { View } from "react-native";

const GameScreenshots = ({ gameId }: { gameId: number }) => {
  const { data } = useScreenshots(gameId);

  if (!data) return null;

  return (
    <View style={{ gap: 8 }}>
      {data?.results.map((image) => (
        <Image
          key={image.id}
          source={image.image}
          style={{
            width: "100%",
            aspectRatio: 16 / 9,
            borderRadius: 12,
          }}
          contentFit="cover"
        />
      ))}
    </View>
  );
};

export default GameScreenshots;
