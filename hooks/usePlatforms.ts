import useData from "./useData";

const usePlatforms = () =>
  useData<ListResponse<Platform>>("/platforms/lists/parents");

export default usePlatforms;
