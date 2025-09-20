import { useGameQuery } from "@/context/GameQueryContext";
import usePlatforms from "@/hooks/usePlatforms";
import QuerySelector from "./QuerySelector";

const PlatformSelector = () => {
  const { data: platforms, error } = usePlatforms();
  const { gameQuery, setPlatform } = useGameQuery();

  const allPlatforms = { id: 0, name: "All Platforms" } as Platform;

  const listData = platforms?.results
    ? [allPlatforms, ...platforms.results]
    : [allPlatforms];

  return (
    <QuerySelector
      data={listData}
      error={error}
      placeholder="Select a Platform"
      selectedItem={gameQuery.platform}
      onSelectItem={setPlatform}
    />
  );
};

export default PlatformSelector;
