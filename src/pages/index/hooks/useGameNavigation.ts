import { useState } from "react";
import { Tab } from "../types";
import { GAMES } from "../data/games";

export function useGameNavigation(setActiveTab: (t: Tab) => void) {
  const [selectedGame, setSelectedGame] = useState<string | null>(null);
  const [followedGames, setFollowedGames] = useState<Set<string>>(new Set());
  const [gameSubTab, setGameSubTab] = useState<"posts" | "reviews">("posts");

  const openGame = (tag: string) => {
    if (GAMES[tag]) {
      setSelectedGame(tag);
      setActiveTab("game");
    }
  };

  const toggleFollowGame = (tag: string) => {
    setFollowedGames((prev) => {
      const next = new Set(prev);
      if (next.has(tag)) next.delete(tag); else next.add(tag);
      return next;
    });
  };

  return {
    selectedGame,
    followedGames,
    gameSubTab,
    setGameSubTab,
    openGame,
    toggleFollowGame,
  };
}
