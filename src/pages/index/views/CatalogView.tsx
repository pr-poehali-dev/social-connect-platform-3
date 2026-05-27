import { Post, Review, GameInfo } from "../constants";
import { CatalogFilters } from "./catalog/CatalogFilters";
import { CatalogGrid } from "./catalog/CatalogGrid";
import { CatalogEmpty } from "./catalog/CatalogEmpty";

interface CatalogViewProps {
  posts: Post[];
  reviews: Review[];
  followedGames: Set<string>;
  catalogGenres: Set<string>;
  setCatalogGenres: (s: Set<string>) => void;
  catalogPlatforms: Set<string>;
  setCatalogPlatforms: (s: Set<string>) => void;
  catalogSort: "rating" | "userScore" | "year" | "players";
  setCatalogSort: (s: "rating" | "userScore" | "year" | "players") => void;
  catalogSearch: string;
  setCatalogSearch: (v: string) => void;
  filteredGames: GameInfo[];
  getGameUserScore: (game: string) => string | null;
  getMedal: (title: string) => { emoji: string; label: string; color: string } | null;
  openGame: (tag: string) => void;
  toggleSetItem: (set: Set<string>, item: string, setter: (s: Set<string>) => void) => void;
  resetFilters: () => void;
}

export function CatalogView({
  posts,
  followedGames,
  catalogGenres,
  setCatalogGenres,
  catalogPlatforms,
  setCatalogPlatforms,
  catalogSort,
  setCatalogSort,
  catalogSearch,
  setCatalogSearch,
  filteredGames,
  getGameUserScore,
  getMedal,
  openGame,
  toggleSetItem,
  resetFilters,
}: CatalogViewProps) {
  return (
    <div>
      <CatalogFilters
        filteredCount={filteredGames.length}
        catalogGenres={catalogGenres}
        setCatalogGenres={setCatalogGenres}
        catalogPlatforms={catalogPlatforms}
        setCatalogPlatforms={setCatalogPlatforms}
        catalogSort={catalogSort}
        setCatalogSort={setCatalogSort}
        catalogSearch={catalogSearch}
        setCatalogSearch={setCatalogSearch}
        toggleSetItem={toggleSetItem}
        resetFilters={resetFilters}
      />

      {filteredGames.length === 0 ? (
        <CatalogEmpty resetFilters={resetFilters} />
      ) : (
        <CatalogGrid
          posts={posts}
          followedGames={followedGames}
          filteredGames={filteredGames}
          getGameUserScore={getGameUserScore}
          getMedal={getMedal}
          openGame={openGame}
        />
      )}
    </div>
  );
}
