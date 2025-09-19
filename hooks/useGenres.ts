import useData from "./useData";

const useGenre = () => useData<Genre>("/genres");

export default useGenre;
