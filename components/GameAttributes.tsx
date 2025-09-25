import { useThemeSetting } from "@/context/ThemeContext";
import { Text, View } from "react-native";
import CriticScore from "./CriticScore";
import DefinitionItem from "./DefinitionItem";

const GameAttributes = ({ game }: { game: Game }) => {
  const { colors } = useThemeSetting();

  return (
    <View
      style={{
        flexDirection: "row",
        flexWrap: "wrap",
        justifyContent: "space-between",
        gap: 4,
      }}
    >
      <DefinitionItem term="Platforms">
        {game.parent_platforms?.map(({ platform }) => (
          <Text
            key={platform.id}
            style={{ fontSize: 14, color: colors.text + "E6" }}
          >
            {platform.name}
          </Text>
        ))}
      </DefinitionItem>
      <DefinitionItem term="Metascore">
        <CriticScore score={game.metacritic} />
      </DefinitionItem>
      <DefinitionItem term="Genres">
        {game.genres?.map((g) => (
          <Text key={g.id} style={{ fontSize: 14, color: colors.text + "E6" }}>
            {g.name}
          </Text>
        ))}
      </DefinitionItem>
      <DefinitionItem term="Publishers">
        {game.publishers?.map((p) => (
          <Text key={p.id} style={{ fontSize: 14, color: colors.text + "E6" }}>
            {p.name}
          </Text>
        ))}
      </DefinitionItem>
    </View>
  );
};

export default GameAttributes;
