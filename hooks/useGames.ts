import useData from "./useData";

const useGames = (gameQuery: GameQuery) =>
  useData<ListResponse<Game>>(
    "/games",
    {
      params: {
        genres: gameQuery.genreId,
        platforms: gameQuery.platformId,
        ordering: gameQuery.sortOrder,
        search: gameQuery.searchText,
        page: gameQuery.page,
      },
    },
    [gameQuery]
  );

export default useGames;
