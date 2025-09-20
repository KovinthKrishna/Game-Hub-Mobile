import { useGameQuery } from "@/context/GameQueryContext";
import sortOrders from "@/data/sortOrders";
import QuerySelector from "./QuerySelector";

const SortSelector = () => {
  const { gameQuery, setSortOrder } = useGameQuery();

  return (
    <QuerySelector
      data={sortOrders}
      selectedItem={gameQuery.sortOrder}
      onSelectItem={setSortOrder}
    />
  );
};

export default SortSelector;
