import { useGameQuery } from "@/context/GameQueryContext";
import useGenres from "@/hooks/useGenres";
import QuerySelector from "./QuerySelector";

const GenreSelector = () => {
  const { data: genres, error } = useGenres();
  const { gameQuery, setGenre } = useGameQuery();

  const allGenres = { id: 0, name: "All Genres" } as Genre;

  const listData = genres?.results
    ? [allGenres, ...genres.results]
    : [allGenres];

  return (
    <QuerySelector
      data={listData}
      error={error}
      placeholder="Select a Genre"
      selectedItem={gameQuery.genre}
      onSelectItem={setGenre}
    />
  );
};

export default GenreSelector;
