import { createContext, ReactNode, useContext, useState } from "react";

interface GameQueryContextValue {
  gameQuery: GameQuery;
  setSearchText: (searchText: string) => void;
  setGenreId: (genreId: number) => void;
  setPlatformId: (platformId: number) => void;
  setSortOrder: (sortOrder: string) => void;
  setPage: (page: number) => void;
}

const GameQueryContext = createContext<GameQueryContextValue>(
  {} as GameQueryContextValue
);

export const GameQueryProvider = ({ children }: { children: ReactNode }) => {
  const [gameQuery, setGameQuery] = useState<GameQuery>({ page: 1 });

  const setSearchText = (searchText: string) =>
    setGameQuery({ ...gameQuery, searchText, page: 1 });

  const setGenreId = (genreId: number) =>
    setGameQuery({ ...gameQuery, genreId, page: 1 });

  const setPlatformId = (platformId: number) =>
    setGameQuery({ ...gameQuery, platformId, page: 1 });

  const setSortOrder = (sortOrder: string) =>
    setGameQuery({ ...gameQuery, sortOrder, page: 1 });

  const setPage = (page: number) => setGameQuery({ ...gameQuery, page });

  const value: GameQueryContextValue = {
    gameQuery,
    setSearchText,
    setGenreId,
    setPlatformId,
    setSortOrder,
    setPage,
  };

  return (
    <GameQueryContext.Provider value={value}>
      {children}
    </GameQueryContext.Provider>
  );
};

export const useGameQuery = () => {
  const ctx = useContext(GameQueryContext);
  if (!ctx) {
    throw new Error("useGameQuery must be used within a GameQueryProvider");
  }
  return ctx;
};
