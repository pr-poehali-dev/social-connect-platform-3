import { Post, GameInfo } from "../../constants";
import { CatalogGameCard } from "./CatalogGameCard";

interface CatalogGridProps {
  posts: Post[];
  followedGames: Set<string>;
  filteredGames: GameInfo[];
  getGameUserScore: (game: string) => string | null;
  getMedal: (title: string) => { emoji: string; label: string; color: string } | null;
  openGame: (tag: string) => void;
}

export function CatalogGrid({
  posts,
  followedGames,
  filteredGames,
  getGameUserScore,
  getMedal,
  openGame,
}: CatalogGridProps) {
  return (
    <div className="p-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
      {filteredGames.map((g) => {
        const isFollowed = followedGames.has(g.title);
        const gamePostCount = posts.filter((p) => p.tag === g.title).length;
        const medal = getMedal(g.title);
        return (
          <CatalogGameCard
            key={g.title}
            game={g}
            isFollowed={isFollowed}
            gamePostCount={gamePostCount}
            medal={medal}
            userScore={getGameUserScore(g.title)}
            openGame={openGame}
          />
        );
      })}
    </div>
  );
}
