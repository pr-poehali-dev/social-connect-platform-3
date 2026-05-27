import { useState } from "react";
import { Review } from "../types";
import { GAMES } from "../data/games";

type CatalogSort = "rating" | "userScore" | "year" | "players";

export function useCatalog(reviews: Review[]) {
  const [catalogGenres, setCatalogGenres] = useState<Set<string>>(new Set());
  const [catalogPlatforms, setCatalogPlatforms] = useState<Set<string>>(new Set());
  const [catalogSort, setCatalogSort] = useState<CatalogSort>("userScore");
  const [catalogSearch, setCatalogSearch] = useState("");

  const toggleSetItem = (set: Set<string>, item: string, setter: (s: Set<string>) => void) => {
    const next = new Set(set);
    if (next.has(item)) next.delete(item); else next.add(item);
    setter(next);
  };

  const resetFilters = () => {
    setCatalogGenres(new Set());
    setCatalogPlatforms(new Set());
    setCatalogSearch("");
  };

  const filteredGames = Object.values(GAMES)
    .filter((g) => {
      if (catalogSearch && !g.title.toLowerCase().includes(catalogSearch.toLowerCase()) && !g.studio.toLowerCase().includes(catalogSearch.toLowerCase())) return false;
      if (catalogGenres.size > 0 && !g.genres.some((gn) => catalogGenres.has(gn))) return false;
      if (catalogPlatforms.size > 0 && !g.platforms.some((p) => catalogPlatforms.has(p))) return false;
      return true;
    })
    .sort((a, b) => {
      if (catalogSort === "rating") return parseInt(b.rating) - parseInt(a.rating);
      if (catalogSort === "year") return parseInt(b.year) - parseInt(a.year);
      if (catalogSort === "userScore") {
        const scoreA = reviews.filter((r) => r.game === a.title);
        const scoreB = reviews.filter((r) => r.game === b.title);
        const avgA = scoreA.length ? scoreA.reduce((s, r) => s + r.rating, 0) / scoreA.length : 0;
        const avgB = scoreB.length ? scoreB.reduce((s, r) => s + r.rating, 0) / scoreB.length : 0;
        if (avgB !== avgA) return avgB - avgA;
        return scoreB.length - scoreA.length;
      }
      const num = (s: string) => parseFloat(s.replace(/[^\d.]/g, ""));
      return num(b.players) - num(a.players);
    });

  return {
    catalogGenres,
    setCatalogGenres,
    catalogPlatforms,
    setCatalogPlatforms,
    catalogSort,
    setCatalogSort,
    catalogSearch,
    setCatalogSearch,
    filteredGames,
    toggleSetItem,
    resetFilters,
  };
}
