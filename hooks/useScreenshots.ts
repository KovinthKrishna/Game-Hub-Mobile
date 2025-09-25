import useData from "./useData";

const useScreenshots = (id: number) =>
  useData<ListResponse<Screenshot>>(`/games/${id}/screenshots`);

export default useScreenshots;
