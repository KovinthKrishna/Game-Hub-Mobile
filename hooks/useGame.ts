import useData from "./useData";

const useGame = (id: string) => useData<Game>(`/games/${id}`);

export default useGame;
