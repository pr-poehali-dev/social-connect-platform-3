import { Review, Tab, GAMES } from "../../constants";
import { HallOfFameTitle } from "./HallOfFameTitle";
import { HallOfFameCard } from "./HallOfFameCard";

interface HallOfFameProps {
  setActiveTab: (t: Tab) => void;
  reviews: Review[];
  topUserScoreGames: string[];
  getGameUserScore: (game: string) => string | null;
  getMedal: (title: string) => { emoji: string; label: string; color: string } | null;
  openGame: (tag: string) => void;
}

export function HallOfFame({
  setActiveTab,
  reviews,
  topUserScoreGames,
  getGameUserScore,
  getMedal,
  openGame,
}: HallOfFameProps) {
  if (topUserScoreGames.length === 0) return null;

  return (
    <div className="border-b border-white/5 bg-gradient-to-b from-amber-500/[0.04] to-transparent">
      <div className="px-6 pt-5 pb-4">
        <HallOfFameTitle setActiveTab={setActiveTab} />
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {topUserScoreGames.map((title) => {
            const g = GAMES[title];
            if (!g) return null;
            return (
              <HallOfFameCard
                key={title}
                game={g}
                medal={getMedal(title)}
                score={getGameUserScore(title)}
                reviewCount={reviews.filter((r) => r.game === title).length}
                openGame={openGame}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
}
