import useData from "./useData";

const useGenres = () => useData<ListResponse<Genre>>("/genres");

export default useGenres;
