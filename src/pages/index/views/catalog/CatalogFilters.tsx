import { ALL_GENRES, ALL_PLATFORMS } from "../../constants";
import { CatalogHeader } from "./CatalogHeader";
import { CatalogSearch } from "./CatalogSearch";
import { FilterChipGroup } from "./FilterChipGroup";

interface CatalogFiltersProps {
  filteredCount: number;
  catalogGenres: Set<string>;
  setCatalogGenres: (s: Set<string>) => void;
  catalogPlatforms: Set<string>;
  setCatalogPlatforms: (s: Set<string>) => void;
  catalogSort: "rating" | "userScore" | "year" | "players";
  setCatalogSort: (s: "rating" | "userScore" | "year" | "players") => void;
  catalogSearch: string;
  setCatalogSearch: (v: string) => void;
  toggleSetItem: (set: Set<string>, item: string, setter: (s: Set<string>) => void) => void;
  resetFilters: () => void;
}

export function CatalogFilters({
  filteredCount,
  catalogGenres,
  setCatalogGenres,
  catalogPlatforms,
  setCatalogPlatforms,
  catalogSort,
  setCatalogSort,
  catalogSearch,
  setCatalogSearch,
  toggleSetItem,
  resetFilters,
}: CatalogFiltersProps) {
  const hasActiveFilters = catalogGenres.size > 0 || catalogPlatforms.size > 0 || !!catalogSearch;

  return (
    <div className="sticky top-0 bg-zinc-950/90 backdrop-blur-sm z-10 border-b border-white/5">
      <CatalogHeader
        filteredCount={filteredCount}
        catalogSort={catalogSort}
        setCatalogSort={setCatalogSort}
      />

      <CatalogSearch catalogSearch={catalogSearch} setCatalogSearch={setCatalogSearch} />

      <FilterChipGroup
        label="Жанры"
        items={ALL_GENRES}
        selected={catalogGenres}
        onToggle={(g) => toggleSetItem(catalogGenres, g, setCatalogGenres)}
        activeClass="bg-violet-600 border-violet-500 text-white"
      />

      <FilterChipGroup
        label="Платформы"
        items={ALL_PLATFORMS}
        selected={catalogPlatforms}
        onToggle={(p) => toggleSetItem(catalogPlatforms, p, setCatalogPlatforms)}
        activeClass="bg-cyan-600 border-cyan-500 text-white"
        className="px-6 pb-4"
      >
        {hasActiveFilters && (
          <button
            onClick={resetFilters}
            className="text-xs px-2.5 py-1 text-zinc-500 hover:text-rose-400 transition-colors ml-1"
          >
            × Сбросить
          </button>
        )}
      </FilterChipGroup>
    </div>
  );
}
