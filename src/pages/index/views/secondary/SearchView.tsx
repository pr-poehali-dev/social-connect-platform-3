import { Post } from "../../constants";
import { StickyHeader } from "./shared/StickyHeader";
import { SearchInput } from "./search/SearchInput";
import { SearchResults } from "./search/SearchResults";
import { SuggestionsList } from "./search/SuggestionsList";
import { TrendingTags } from "./search/TrendingTags";

interface SearchViewProps {
  searchQuery: string;
  setSearchQuery: (q: string) => void;
  filteredPosts: Post[];
  openGame: (tag: string) => void;
  handleLike: (id: number) => void;
  handleRepost: (id: number, comment: string) => void;
  handleSave: (id: number) => void;
}

export function SearchView({
  searchQuery,
  setSearchQuery,
  filteredPosts,
  openGame,
  handleLike,
  handleRepost,
  handleSave,
}: SearchViewProps) {
  return (
    <div>
      <StickyHeader>
        <SearchInput searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
      </StickyHeader>

      {searchQuery ? (
        <SearchResults
          searchQuery={searchQuery}
          filteredPosts={filteredPosts}
          openGame={openGame}
          handleLike={handleLike}
          handleRepost={handleRepost}
          handleSave={handleSave}
        />
      ) : (
        <div>
          <SuggestionsList />
          <TrendingTags setSearchQuery={setSearchQuery} />
        </div>
      )}
    </div>
  );
}
