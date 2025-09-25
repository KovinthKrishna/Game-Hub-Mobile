import useData from "./useData";

const useTrailers = (id: number) =>
  useData<ListResponse<Trailer>>(`/games/${id}/movies`);

export default useTrailers;
