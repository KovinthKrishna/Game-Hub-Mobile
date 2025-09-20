import sortOrders from "@/data/sortOrders";
import { createContext, ReactNode, useContext, useState } from "react";

interface GameQueryContextValue {
  gameQuery: GameQuery;
  setSearchText: (searchText: string) => void;
  setGenre: (genre?: Genre) => void;
  setPlatform: (platform?: Platform) => void;
  setSortOrder: (sortOrder?: SortOrder) => void;
  decrementPage: () => void;
  incrementPage: () => void;
}

const GameQueryContext = createContext<GameQueryContextValue>(
  {} as GameQueryContextValue
);

export const GameQueryProvider = ({ children }: { children: ReactNode }) => {
  const [gameQuery, setGameQuery] = useState<GameQuery>({
    sortOrder: sortOrders[0],
    page: 1,
  });

  const setSearchText = (searchText: string) =>
    setGameQuery({ ...gameQuery, searchText, page: 1 });

  const setGenre = (genre?: Genre) =>
    setGameQuery({ ...gameQuery, genre, page: 1 });

  const setPlatform = (platform?: Platform) =>
    setGameQuery({ ...gameQuery, platform, page: 1 });

  const setSortOrder = (sortOrder?: SortOrder) =>
    setGameQuery({
      ...gameQuery,
      sortOrder: sortOrder || sortOrders[0],
      page: 1,
    });

  const decrementPage = () =>
    setGameQuery({ ...gameQuery, page: gameQuery.page - 1 });

  const incrementPage = () =>
    setGameQuery({ ...gameQuery, page: gameQuery.page + 1 });

  const value: GameQueryContextValue = {
    gameQuery,
    setSearchText,
    setGenre,
    setPlatform,
    setSortOrder,
    decrementPage,
    incrementPage,
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
