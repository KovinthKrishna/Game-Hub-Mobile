import useGame from "@/hooks/useGame";
import GameCard from "./GameCard";

const FavoriteGameCard = ({ gameId }: { gameId: number }) => {
  const { data: game } = useGame(gameId.toString());

  if (game) return <GameCard game={game} />;
};

export default FavoriteGameCard;
