import Icon from "@/components/ui/icon";
import { Textarea } from "@/components/ui/textarea";
import { Post, Review, Tab, GAMES, InitialAvatar, PostCard } from "../constants";

interface FeedViewProps {
  setActiveTab: (t: Tab) => void;
  posts: Post[];
  newPostText: string;
  setNewPostText: (v: string) => void;
  reviews: Review[];
  topUserScoreGames: string[];
  getGameUserScore: (game: string) => string | null;
  getMedal: (title: string) => { emoji: string; label: string; color: string } | null;
  openGame: (tag: string) => void;
  handleLike: (id: number) => void;
  handleRepost: (id: number, comment: string) => void;
  handleSave: (id: number) => void;
  handlePublish: () => void;
}

export function FeedView({
  setActiveTab,
  posts,
  newPostText,
  setNewPostText,
  reviews,
  topUserScoreGames,
  getGameUserScore,
  getMedal,
  openGame,
  handleLike,
  handleRepost,
  handleSave,
  handlePublish,
}: FeedViewProps) {
  return (
    <div>
      <div className="sticky top-0 bg-zinc-950/90 backdrop-blur-sm z-10 px-6 py-4 border-b border-white/5">
        <h1 className="font-semibold text-white">Лента</h1>
      </div>

      <div className="px-6 py-5 border-b border-white/5">
        <div className="flex gap-4">
          <InitialAvatar name="ВЫ" />
          <div className="flex-1">
            <Textarea
              value={newPostText}
              onChange={(e) => setNewPostText(e.target.value)}
              placeholder="Что происходит в игровом мире?"
              className="resize-none border-0 border-b border-white/10 rounded-none focus:border-violet-500/50 focus-visible:ring-0 px-0 text-zinc-100 placeholder:text-zinc-600 text-sm mb-3 bg-transparent"
              rows={3}
            />
            <div className="flex items-center justify-between">
              <div className="flex gap-3">
                <button className="text-zinc-500 hover:text-zinc-300 transition-colors">
                  <Icon name="Image" size={18} />
                </button>
                <button className="text-zinc-500 hover:text-zinc-300 transition-colors">
                  <Icon name="Hash" size={18} />
                </button>
                <button className="text-zinc-500 hover:text-zinc-300 transition-colors">
                  <Icon name="Smile" size={18} />
                </button>
              </div>
              <div className="flex items-center gap-3">
                {newPostText.length > 0 && (
                  <span className={`text-xs ${newPostText.length > 240 ? "text-rose-400" : "text-zinc-500"}`}>
                    {280 - newPostText.length}
                  </span>
                )}
                <button
                  onClick={handlePublish}
                  disabled={!newPostText.trim() || newPostText.length > 280}
                  className="px-4 py-1.5 bg-violet-600 text-white text-sm rounded-lg disabled:opacity-30 hover:bg-violet-500 transition-colors font-medium"
                >
                  Опубликовать
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Зал славы */}
      {topUserScoreGames.length > 0 && (
        <div className="border-b border-white/5 bg-gradient-to-b from-amber-500/[0.04] to-transparent">
          <div className="px-6 pt-5 pb-4">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 bg-gradient-to-br from-amber-400 to-orange-600 rounded-lg flex items-center justify-center shadow-lg shadow-amber-500/30">
                  <Icon name="Trophy" size={15} className="text-white" />
                </div>
                <div>
                  <h2 className="text-sm font-bold text-white tracking-tight">Зал славы</h2>
                  <p className="text-[10px] text-zinc-500">Топ-3 по оценкам игроков</p>
                </div>
              </div>
              <button
                onClick={() => setActiveTab("catalog")}
                className="text-xs text-amber-400/80 hover:text-amber-300 transition-colors"
              >
                Весь каталог →
              </button>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {topUserScoreGames.map((title) => {
                const g = GAMES[title];
                if (!g) return null;
                const medal = getMedal(title);
                const score = getGameUserScore(title);
                const reviewCount = reviews.filter((r) => r.game === title).length;
                return (
                  <button
                    key={title}
                    onClick={() => openGame(title)}
                    className="group text-left bg-white/[0.03] border border-amber-500/20 rounded-xl overflow-hidden hover:border-amber-400/50 hover:bg-white/[0.05] transition-all"
                  >
                    <div className={`h-20 bg-gradient-to-br ${g.cover} relative overflow-hidden`}>
                      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(255,255,255,0.08),transparent_50%)]" />
                      {medal && (
                        <div className="absolute top-2 left-2 text-2xl drop-shadow-lg">{medal.emoji}</div>
                      )}
                      <div className="absolute bottom-1.5 right-2 flex items-center gap-0.5 bg-black/50 backdrop-blur-sm rounded-md px-1.5 py-0.5 border border-white/10">
                        <Icon name="Star" size={10} className="text-amber-400 fill-current" />
                        <span className="text-[11px] font-bold text-amber-400">{score}</span>
                      </div>
                    </div>
                    <div className="p-3">
                      <h3 className="text-xs font-bold text-white truncate group-hover:text-amber-200 transition-colors">
                        {g.title}
                      </h3>
                      <p className="text-[10px] text-zinc-500 truncate">{g.studio} · {reviewCount} отзыв.</p>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {posts.map((post) => (
        <PostCard key={post.id} post={post} onLike={handleLike} onRepost={handleRepost} onSave={handleSave} onTagClick={openGame} />
      ))}
    </div>
  );
}
