import Icon from "@/components/ui/icon";
import { Post, TRENDS, SUGGESTIONS, InitialAvatar, PostCard } from "../../constants";

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
      <div className="sticky top-0 bg-zinc-950/90 backdrop-blur-sm z-10 px-6 py-4 border-b border-white/5">
        <div className="relative">
          <Icon name="Search" size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500" />
          <input
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Поиск по постам, играм, никам…"
            className="w-full pl-9 pr-4 py-2.5 bg-white/5 border border-white/8 rounded-xl text-sm focus:outline-none focus:border-violet-500/50 transition-all text-zinc-100 placeholder:text-zinc-600"
            autoFocus
          />
        </div>
      </div>

      {searchQuery ? (
        <div>
          <div className="px-6 py-3 border-b border-white/5">
            <span className="text-xs text-zinc-500">
              По запросу «{searchQuery}»: {filteredPosts.length}
            </span>
          </div>
          {filteredPosts.length === 0 ? (
            <div className="px-6 py-16 text-center">
              <Icon name="SearchX" size={32} className="text-zinc-700 mx-auto mb-3" />
              <p className="text-zinc-500 text-sm">Ничего не найдено</p>
            </div>
          ) : (
            filteredPosts.map((post) => (
              <PostCard key={post.id} post={post} onLike={handleLike} onRepost={handleRepost} onSave={handleSave} onTagClick={openGame} />
            ))
          )}
        </div>
      ) : (
        <div>
          <div className="px-6 py-5 border-b border-white/5">
            <h2 className="text-xs font-semibold text-zinc-500 uppercase tracking-wider mb-4">Кого читать</h2>
            <div className="space-y-4">
              {SUGGESTIONS.map((s) => (
                <div key={s.handle} className="flex items-center gap-3">
                  <InitialAvatar name={s.name} size="sm" />
                  <div className="flex-1 min-w-0">
                    <div className="text-sm font-medium text-white">{s.name}</div>
                    <div className="text-xs text-zinc-500">@{s.handle} · {s.bio}</div>
                  </div>
                  <button className="px-3 py-1 border border-white/10 rounded-lg text-xs text-zinc-300 hover:bg-white/5 transition-colors font-medium">
                    Читать
                  </button>
                </div>
              ))}
            </div>
          </div>
          <div className="px-6 py-5">
            <h2 className="text-xs font-semibold text-zinc-500 uppercase tracking-wider mb-3">Популярные теги</h2>
            <div className="flex flex-wrap gap-2">
              {TRENDS.map((t) => (
                <button
                  key={t.tag}
                  onClick={() => setSearchQuery("#" + t.tag)}
                  className="px-3 py-1.5 bg-white/5 border border-white/8 rounded-lg text-sm text-zinc-300 hover:bg-violet-600/20 hover:border-violet-500/30 hover:text-violet-300 transition-colors"
                >
                  #{t.tag}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
