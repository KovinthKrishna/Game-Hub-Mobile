import useData from "./useData";

const useGames = (gameQuery: GameQuery) =>
  useData<ListResponse<Game>>(
    "/games",
    {
      params: {
        genres: gameQuery.genre?.id,
        platforms: gameQuery.platform?.id,
        ordering: gameQuery.sortOrder?.id,
        search: gameQuery.searchText,
        page: gameQuery.page,
      },
    },
    [gameQuery]
  );

export default useGames;
