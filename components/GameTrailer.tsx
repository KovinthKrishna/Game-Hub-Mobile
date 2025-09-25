import useTrailers from "@/hooks/useTrailers";
import { VideoView, useVideoPlayer } from "expo-video";
import { View } from "react-native";

const GameTrailer = ({ gameId }: { gameId: number }) => {
  const { data } = useTrailers(gameId);
  const firstTrailer = data?.results?.[0];
  const player = useVideoPlayer({ uri: firstTrailer?.data[480] });

  if (!firstTrailer) return null;

  return (
    <View style={{ borderRadius: 12, overflow: "hidden" }}>
      <VideoView
        player={player}
        style={{ width: "100%", aspectRatio: 16 / 9 }}
        contentFit="cover"
      />
    </View>
  );
};

export default GameTrailer;
