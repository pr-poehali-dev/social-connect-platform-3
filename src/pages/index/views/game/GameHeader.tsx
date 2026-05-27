import { Post, Review, Tab, GameInfo } from "../../constants";
import { GameTopBar } from "./GameTopBar";
import { GameCover } from "./GameCover";
import { GameStats } from "./GameStats";
import { GameTabs } from "./GameTabs";

interface GameHeaderProps {
  setActiveTab: (t: Tab) => void;
  game: GameInfo;
  gamePosts: Post[];
  isFollowed: boolean;
  selectedGame: string;
  gameSubTab: "posts" | "reviews";
  setGameSubTab: (t: "posts" | "reviews") => void;
  getGameUserScore: (game: string) => string | null;
  getGameReviews: (game: string) => Review[];
  toggleFollowGame: (tag: string) => void;
}

export function GameHeader({
  setActiveTab,
  game,
  gamePosts,
  isFollowed,
  selectedGame,
  gameSubTab,
  setGameSubTab,
  getGameUserScore,
  getGameReviews,
  toggleFollowGame,
}: GameHeaderProps) {
  return (
    <>
      <GameTopBar setActiveTab={setActiveTab} game={game} gamePosts={gamePosts} />
      <GameCover game={game} />
      <GameStats
        game={game}
        selectedGame={selectedGame}
        gamePosts={gamePosts}
        isFollowed={isFollowed}
        getGameUserScore={getGameUserScore}
        getGameReviews={getGameReviews}
        toggleFollowGame={toggleFollowGame}
      />
      <GameTabs
        selectedGame={selectedGame}
        gamePosts={gamePosts}
        gameSubTab={gameSubTab}
        setGameSubTab={setGameSubTab}
        getGameReviews={getGameReviews}
      />
    </>
  );
}
