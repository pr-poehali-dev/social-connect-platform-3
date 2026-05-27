import Icon from "@/components/ui/icon";
import { Textarea } from "@/components/ui/textarea";
import {
  Post,
  Notification,
  Review,
  Tab,
  GAMES,
  TRENDS,
  SUGGESTIONS,
  ALL_GENRES,
  ALL_PLATFORMS,
  InitialAvatar,
  PostCard,
} from "./constants";

interface MainContentProps {
  activeTab: Tab;
  setActiveTab: (t: Tab) => void;
  posts: Post[];
  filteredPosts: Post[];
  savedPosts: Post[];
  newPostText: string;
  setNewPostText: (v: string) => void;
  searchQuery: string;
  setSearchQuery: (q: string) => void;
  notifications: Notification[];
  unreadCount: number;
  selectedGame: string | null;
  followedGames: Set<string>;
  catalogGenres: Set<string>;
  setCatalogGenres: (s: Set<string>) => void;
  catalogPlatforms: Set<string>;
  setCatalogPlatforms: (s: Set<string>) => void;
  catalogSort: "rating" | "userScore" | "year" | "players";
  setCatalogSort: (s: "rating" | "userScore" | "year" | "players") => void;
  catalogSearch: string;
  setCatalogSearch: (v: string) => void;
  reviews: Review[];
  reviewRating: number;
  setReviewRating: (n: number) => void;
  reviewHover: number;
  setReviewHover: (n: number) => void;
  reviewText: string;
  setReviewText: (v: string) => void;
  gameSubTab: "posts" | "reviews";
  setGameSubTab: (t: "posts" | "reviews") => void;
  filteredGames: ReturnType<() => typeof GAMES[string][]>;
  getGameUserScore: (game: string) => string | null;
  getGameReviews: (game: string) => Review[];
  topUserScoreGames: string[];
  getMedal: (title: string) => { emoji: string; label: string; color: string } | null;
  openGame: (tag: string) => void;
  toggleFollowGame: (tag: string) => void;
  toggleSetItem: (set: Set<string>, item: string, setter: (s: Set<string>) => void) => void;
  resetFilters: () => void;
  handleLike: (id: number) => void;
  handleRepost: (id: number, comment: string) => void;
  handleSave: (id: number) => void;
  handlePublish: () => void;
  markAllRead: () => void;
  submitReview: (game: string) => void;
  likeReview: (id: number) => void;
}

export function MainContent(props: MainContentProps) {
  const {
    activeTab,
    setActiveTab,
    posts,
    filteredPosts,
    savedPosts,
    newPostText,
    setNewPostText,
    searchQuery,
    setSearchQuery,
    notifications,
    unreadCount,
    selectedGame,
    followedGames,
    catalogGenres,
    setCatalogGenres,
    catalogPlatforms,
    setCatalogPlatforms,
    catalogSort,
    setCatalogSort,
    catalogSearch,
    setCatalogSearch,
    reviews,
    reviewRating,
    setReviewRating,
    reviewHover,
    setReviewHover,
    reviewText,
    setReviewText,
    gameSubTab,
    setGameSubTab,
    filteredGames,
    getGameUserScore,
    getGameReviews,
    topUserScoreGames,
    getMedal,
    openGame,
    toggleFollowGame,
    toggleSetItem,
    resetFilters,
    handleLike,
    handleRepost,
    handleSave,
    handlePublish,
    markAllRead,
    submitReview,
    likeReview,
  } = props;

  return (
    <main className="flex-1 min-w-0 border-r border-white/5">

      {/* Лента */}
      {activeTab === "feed" && (
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
      )}

      {/* Поиск */}
      {activeTab === "search" && (
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
      )}

      {/* Уведомления */}
      {activeTab === "notifications" && (
        <div>
          <div className="sticky top-0 bg-zinc-950/90 backdrop-blur-sm z-10 px-6 py-4 border-b border-white/5 flex items-center justify-between">
            <h1 className="font-semibold text-white">Уведомления</h1>
            {unreadCount > 0 && (
              <button onClick={markAllRead} className="text-xs text-zinc-500 hover:text-zinc-200 transition-colors">
                Прочитать все
              </button>
            )}
          </div>
          {notifications.map((n) => (
            <div
              key={n.id}
              onClick={() => n.game && openGame(n.game)}
              className={`flex items-start gap-4 px-6 py-4 border-b border-white/5 transition-colors ${
                n.type === "achievement"
                  ? "bg-gradient-to-r from-amber-500/10 to-transparent border-l-2 border-l-amber-500/60 cursor-pointer hover:from-amber-500/15"
                  : !n.read
                    ? "bg-violet-500/5"
                    : "hover:bg-white/[0.02]"
              }`}
            >
              {n.type === "achievement" ? (
                <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-amber-400 to-orange-600 flex items-center justify-center flex-shrink-0 shadow-lg shadow-amber-500/30 text-lg leading-none">
                  {n.medal}
                </div>
              ) : (
                <div className={`w-8 h-8 rounded-xl flex items-center justify-center flex-shrink-0 ${
                  n.type === "like" ? "bg-rose-500/15 text-rose-400" :
                  n.type === "comment" ? "bg-cyan-500/15 text-cyan-400" :
                  n.type === "follow" ? "bg-emerald-500/15 text-emerald-400" :
                  "bg-amber-500/15 text-amber-400"
                }`}>
                  <Icon
                    name={n.type === "like" ? "Heart" : n.type === "comment" ? "MessageCircle" : n.type === "follow" ? "UserPlus" : "Repeat2"}
                    size={14}
                  />
                </div>
              )}
              <div className="flex-1 min-w-0">
                <p className="text-sm text-zinc-200">
                  <span className={`font-medium ${n.type === "achievement" ? "text-amber-300" : "text-white"}`}>{n.user}</span>{" "}
                  <span className="text-zinc-300">{n.text}</span>
                </p>
                <span className="text-xs text-zinc-600">{n.time}</span>
              </div>
              {!n.read && (
                <div className={`w-2 h-2 rounded-full flex-shrink-0 mt-2 ${n.type === "achievement" ? "bg-amber-400" : "bg-violet-400"}`} />
              )}
            </div>
          ))}
        </div>
      )}

      {/* Сообщения */}
      {activeTab === "messages" && (
        <div>
          <div className="sticky top-0 bg-zinc-950/90 backdrop-blur-sm z-10 px-6 py-4 border-b border-white/5">
            <h1 className="font-semibold text-white">Сообщения</h1>
          </div>
          <div className="px-6 py-16 text-center">
            <div className="w-16 h-16 bg-white/5 border border-white/8 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <Icon name="Mail" size={28} className="text-zinc-500" />
            </div>
            <h2 className="font-medium text-white mb-1">Прямые сообщения</h2>
            <p className="text-sm text-zinc-500 max-w-xs mx-auto mb-4">
              Обсуждайте игры напрямую с другими геймерами
            </p>
            <button className="px-4 py-2 bg-violet-600 text-white text-sm rounded-lg hover:bg-violet-500 transition-colors">
              Написать сообщение
            </button>
          </div>
        </div>
      )}

      {/* Сохранённое */}
      {activeTab === "saved" && (
        <div>
          <div className="sticky top-0 bg-zinc-950/90 backdrop-blur-sm z-10 px-6 py-4 border-b border-white/5">
            <h1 className="font-semibold text-white">Сохранённое</h1>
          </div>
          {savedPosts.length === 0 ? (
            <div className="px-6 py-16 text-center">
              <div className="w-16 h-16 bg-white/5 border border-white/8 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Icon name="Bookmark" size={28} className="text-zinc-500" />
              </div>
              <h2 className="font-medium text-white mb-1">Пока ничего нет</h2>
              <p className="text-sm text-zinc-500">Сохраняйте интересные посты — они будут здесь</p>
            </div>
          ) : (
            savedPosts.map((post) => (
              <PostCard key={post.id} post={post} onLike={handleLike} onRepost={handleRepost} onSave={handleSave} onTagClick={openGame} />
            ))
          )}
        </div>
      )}

      {/* Тренды */}
      {activeTab === "trends" && (
        <div>
          <div className="sticky top-0 bg-zinc-950/90 backdrop-blur-sm z-10 px-6 py-4 border-b border-white/5">
            <h1 className="font-semibold text-white">Популярные темы</h1>
          </div>
          {TRENDS.map((t, i) => (
            <div
              key={t.tag}
              onClick={() => { setSearchQuery("#" + t.tag); setActiveTab("search"); }}
              className="flex items-center gap-4 px-6 py-4 border-b border-white/5 hover:bg-white/[0.03] cursor-pointer transition-colors group"
            >
              <span className="text-zinc-700 font-bold text-lg w-8 text-right">{i + 1}</span>
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <span className="font-semibold text-white">#{t.tag}</span>
                  {t.hot && (
                    <span className="text-xs bg-rose-500/15 text-rose-400 border border-rose-500/20 rounded px-1.5 py-0.5">
                      🔥 горячее
                    </span>
                  )}
                </div>
                <div className="text-xs text-zinc-500 mt-0.5">{t.posts}</div>
              </div>
              <Icon name="ChevronRight" size={16} className="text-zinc-700 group-hover:text-zinc-400 transition-colors" />
            </div>
          ))}
        </div>
      )}

      {/* Профиль */}
      {activeTab === "profile" && (
        <div>
          <div className="sticky top-0 bg-zinc-950/90 backdrop-blur-sm z-10 px-6 py-4 border-b border-white/5">
            <h1 className="font-semibold text-white">Профиль</h1>
          </div>

          <div className="h-28 bg-gradient-to-br from-violet-900/40 via-zinc-900 to-cyan-900/30" />

          <div className="px-6 pb-8">
            <div className="flex items-end justify-between -mt-7 mb-4">
              <div className="w-16 h-16 bg-zinc-900 rounded-2xl border-2 border-zinc-900 shadow-lg flex items-center justify-center">
                <InitialAvatar name="ВЫ" size="lg" />
              </div>
              <button className="px-4 py-1.5 border border-white/10 rounded-lg text-sm text-zinc-300 hover:bg-white/5 transition-colors font-medium mt-2">
                Редактировать
              </button>
            </div>

            <div className="mb-3">
              <h2 className="text-lg font-bold text-white">Вы</h2>
              <p className="text-zinc-500 text-sm">@you</p>
            </div>

            <p className="text-sm text-zinc-500 mb-5 leading-relaxed">
              Расскажите о себе — любимые игры, жанры, платформы.
            </p>

            <div className="flex gap-6 mb-6">
              <div>
                <span className="font-bold text-white">0</span>
                <span className="text-zinc-500 text-sm ml-1">подписок</span>
              </div>
              <div>
                <span className="font-bold text-white">0</span>
                <span className="text-zinc-500 text-sm ml-1">подписчиков</span>
              </div>
            </div>

            <div className="border-t border-white/5 pt-5">
              <h3 className="text-xs font-semibold text-zinc-500 uppercase tracking-wider mb-4">Ваши посты</h3>
              {posts.filter((p) => p.handle === "you").length === 0 ? (
                <p className="text-sm text-zinc-600">Вы ещё ничего не публиковали</p>
              ) : (
                posts.filter((p) => p.handle === "you").map((post) => (
                  <PostCard key={post.id} post={post} onLike={handleLike} onRepost={handleRepost} onSave={handleSave} onTagClick={openGame} />
                ))
              )}
            </div>
          </div>
        </div>
      )}

      {/* Каталог игр */}
      {activeTab === "catalog" && (
        <div>
          <div className="sticky top-0 bg-zinc-950/90 backdrop-blur-sm z-10 border-b border-white/5">
            <div className="px-6 py-4 flex items-center justify-between">
              <div>
                <h1 className="font-semibold text-white">Каталог игр</h1>
                <p className="text-xs text-zinc-500 mt-0.5">{filteredGames.length} из {Object.keys(GAMES).length} игр</p>
              </div>
              <div className="flex items-center gap-2">
                <select
                  value={catalogSort}
                  onChange={(e) => setCatalogSort(e.target.value as "rating" | "userScore" | "year" | "players")}
                  className="bg-white/5 border border-white/10 rounded-lg text-sm text-zinc-300 px-3 py-1.5 focus:outline-none focus:border-violet-500/50 cursor-pointer"
                >
                  <option value="userScore">★ Топ по оценкам игроков</option>
                  <option value="rating">По рейтингу Metacritic</option>
                  <option value="year">По году выхода</option>
                  <option value="players">По числу игроков</option>
                </select>
              </div>
            </div>

            {/* Поиск */}
            <div className="px-6 pb-3">
              <div className="relative">
                <Icon name="Search" size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500" />
                <input
                  value={catalogSearch}
                  onChange={(e) => setCatalogSearch(e.target.value)}
                  placeholder="Название игры или студия…"
                  className="w-full pl-9 pr-4 py-2 bg-white/5 border border-white/8 rounded-lg text-sm focus:outline-none focus:border-violet-500/50 transition-colors text-zinc-100 placeholder:text-zinc-600"
                />
              </div>
            </div>

            {/* Фильтры по жанрам */}
            <div className="px-6 pb-3">
              <div className="flex items-center gap-2 flex-wrap">
                <span className="text-[10px] uppercase tracking-wider text-zinc-500 font-semibold mr-1">Жанры</span>
                {ALL_GENRES.map((g) => {
                  const active = catalogGenres.has(g);
                  return (
                    <button
                      key={g}
                      onClick={() => toggleSetItem(catalogGenres, g, setCatalogGenres)}
                      className={`text-xs px-2.5 py-1 rounded-md border transition-colors ${
                        active
                          ? "bg-violet-600 border-violet-500 text-white"
                          : "bg-white/5 border-white/10 text-zinc-400 hover:bg-white/10 hover:text-zinc-200"
                      }`}
                    >
                      {g}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Фильтры по платформам */}
            <div className="px-6 pb-4">
              <div className="flex items-center gap-2 flex-wrap">
                <span className="text-[10px] uppercase tracking-wider text-zinc-500 font-semibold mr-1">Платформы</span>
                {ALL_PLATFORMS.map((p) => {
                  const active = catalogPlatforms.has(p);
                  return (
                    <button
                      key={p}
                      onClick={() => toggleSetItem(catalogPlatforms, p, setCatalogPlatforms)}
                      className={`text-xs px-2.5 py-1 rounded-md border transition-colors ${
                        active
                          ? "bg-cyan-600 border-cyan-500 text-white"
                          : "bg-white/5 border-white/10 text-zinc-400 hover:bg-white/10 hover:text-zinc-200"
                      }`}
                    >
                      {p}
                    </button>
                  );
                })}
                {(catalogGenres.size > 0 || catalogPlatforms.size > 0 || catalogSearch) && (
                  <button
                    onClick={resetFilters}
                    className="text-xs px-2.5 py-1 text-zinc-500 hover:text-rose-400 transition-colors ml-1"
                  >
                    × Сбросить
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* Сетка игр */}
          {filteredGames.length === 0 ? (
            <div className="px-6 py-20 text-center">
              <div className="w-16 h-16 bg-white/5 border border-white/8 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Icon name="SearchX" size={28} className="text-zinc-500" />
              </div>
              <h2 className="font-medium text-white mb-1">Ничего не найдено</h2>
              <p className="text-sm text-zinc-500 mb-4">Попробуйте изменить фильтры</p>
              <button
                onClick={resetFilters}
                className="px-4 py-2 bg-violet-600 text-white text-sm rounded-lg hover:bg-violet-500 transition-colors"
              >
                Сбросить фильтры
              </button>
            </div>
          ) : (
            <div className="p-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
              {filteredGames.map((g) => {
                const isFollowed = followedGames.has(g.title);
                const gamePostCount = posts.filter((p) => p.tag === g.title).length;
                const medal = getMedal(g.title);
                return (
                  <button
                    key={g.title}
                    onClick={() => openGame(g.title)}
                    className={`group text-left bg-white/[0.02] border rounded-2xl overflow-hidden transition-all relative ${
                      medal
                        ? "border-amber-500/30 hover:border-amber-400/60 hover:bg-white/[0.04] shadow-[0_0_24px_-12px_rgba(245,158,11,0.35)]"
                        : "border-white/8 hover:border-violet-500/40 hover:bg-white/[0.04]"
                    }`}
                  >
                    <div className={`h-32 bg-gradient-to-br ${g.cover} relative overflow-hidden`}>
                      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(255,255,255,0.06),transparent_50%)]" />
                      <div className="absolute top-3 right-3 px-2 py-0.5 bg-black/40 backdrop-blur-sm rounded-md text-xs font-bold text-white border border-white/10">
                        {g.rating}
                      </div>
                      {medal && (
                        <div className={`absolute top-3 left-3 flex items-center gap-1.5 px-2 py-1 bg-gradient-to-r ${medal.color} backdrop-blur-sm rounded-md text-[10px] font-bold text-white border shadow-lg`}>
                          <span className="text-sm leading-none">{medal.emoji}</span>
                          <span>{medal.label}</span>
                        </div>
                      )}
                      {isFollowed && !medal && (
                        <div className="absolute top-3 left-3 px-2 py-0.5 bg-violet-600/90 backdrop-blur-sm rounded-md text-[10px] font-medium text-white">
                          Отслеживается
                        </div>
                      )}
                      {isFollowed && medal && (
                        <div className="absolute bottom-3 right-3 w-5 h-5 bg-violet-600/90 backdrop-blur-sm rounded-md flex items-center justify-center">
                          <Icon name="Check" size={12} className="text-white" />
                        </div>
                      )}
                      <div className="absolute bottom-3 left-3 right-3">
                        <h3 className="text-lg font-bold text-white tracking-tight truncate group-hover:text-violet-200 transition-colors">
                          {g.title}
                        </h3>
                        <p className="text-xs text-zinc-300/80 truncate">{g.studio} · {g.year}</p>
                      </div>
                    </div>
                    <div className="p-4">
                      <div className="flex flex-wrap gap-1.5 mb-3">
                        {g.genres.slice(0, 3).map((gn) => (
                          <span key={gn} className="text-[10px] px-1.5 py-0.5 rounded bg-violet-500/10 text-violet-300 border border-violet-500/20">
                            {gn}
                          </span>
                        ))}
                      </div>
                      <p className="text-xs text-zinc-400 leading-relaxed mb-3 line-clamp-2">{g.description}</p>
                      <div className="flex items-center justify-between text-xs text-zinc-500">
                        <div className="flex items-center gap-3">
                          {getGameUserScore(g.title) && (
                            <span className="flex items-center gap-1 text-amber-400">
                              <Icon name="Star" size={11} className="fill-current" />
                              {getGameUserScore(g.title)}
                            </span>
                          )}
                          <span className="flex items-center gap-1">
                            <Icon name="Users" size={11} />
                            {g.players.split(" ")[0]}
                          </span>
                          <span className="flex items-center gap-1">
                            <Icon name="MessageCircle" size={11} />
                            {gamePostCount}
                          </span>
                        </div>
                        <div className="flex gap-1">
                          {g.platforms.slice(0, 3).map((p) => (
                            <span key={p} className="text-[9px] px-1.5 py-0.5 rounded bg-white/5 text-zinc-400 border border-white/10">
                              {p}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>
          )}
        </div>
      )}

      {/* Страница игры */}
      {activeTab === "game" && selectedGame && GAMES[selectedGame] && (() => {
        const game = GAMES[selectedGame];
        const gamePosts = posts.filter((p) => p.tag === selectedGame);
        const isFollowed = followedGames.has(selectedGame);
        return (
          <div>
            <div className="sticky top-0 bg-zinc-950/90 backdrop-blur-sm z-10 px-6 py-4 border-b border-white/5 flex items-center gap-3">
              <button
                onClick={() => setActiveTab("feed")}
                className="text-zinc-400 hover:text-white transition-colors"
              >
                <Icon name="ArrowLeft" size={18} />
              </button>
              <div>
                <h1 className="font-semibold text-white">{game.title}</h1>
                <p className="text-xs text-zinc-500">{gamePosts.length} постов</p>
              </div>
            </div>

            {/* Обложка */}
            <div className={`h-44 bg-gradient-to-br ${game.cover} relative overflow-hidden`}>
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_50%,rgba(255,255,255,0.05),transparent_50%)]" />
              <div className="absolute bottom-4 left-6 right-6 flex items-end justify-between">
                <div>
                  <div className="text-[10px] uppercase tracking-widest text-zinc-300/70 mb-1">{game.genre}</div>
                  <h2 className="text-3xl font-bold text-white tracking-tight">{game.title}</h2>
                  <p className="text-sm text-zinc-300/80 mt-1">{game.studio} · {game.year}</p>
                </div>
              </div>
            </div>

            <div className="px-6 py-5 border-b border-white/5">
              <div className="flex items-center justify-between mb-4">
                <div className="flex gap-6">
                  <div>
                    <div className="text-2xl font-bold text-white">{game.rating}<span className="text-sm text-zinc-500">/100</span></div>
                    <div className="text-xs text-zinc-500 mt-0.5">Metacritic</div>
                  </div>
                  <div className="border-l border-white/10 pl-6">
                    <div className="text-2xl font-bold text-amber-400 flex items-center gap-1">
                      {getGameUserScore(selectedGame) || "—"}
                      {getGameUserScore(selectedGame) && <Icon name="Star" size={16} className="fill-current" />}
                    </div>
                    <div className="text-xs text-zinc-500 mt-0.5">Оценка игроков · {getGameReviews(selectedGame).length}</div>
                  </div>
                  <div className="border-l border-white/10 pl-6">
                    <div className="text-2xl font-bold text-white">{gamePosts.length}</div>
                    <div className="text-xs text-zinc-500 mt-0.5">постов</div>
                  </div>
                </div>
                <button
                  onClick={() => toggleFollowGame(selectedGame)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                    isFollowed
                      ? "bg-white/5 border border-white/10 text-zinc-300 hover:bg-white/10"
                      : "bg-violet-600 text-white hover:bg-violet-500"
                  }`}
                >
                  {isFollowed ? "Отслеживается" : "Отслеживать"}
                </button>
              </div>
              <p className="text-sm text-zinc-400 leading-relaxed">{game.description}</p>
            </div>

            {/* Табы внутри игры */}
            <div className="flex border-b border-white/5 px-6">
              <button
                onClick={() => setGameSubTab("posts")}
                className={`px-4 py-3 text-sm font-medium transition-colors ${
                  gameSubTab === "posts" ? "text-white border-b-2 border-violet-500" : "text-zinc-500 hover:text-zinc-300"
                }`}
              >
                Посты <span className="text-zinc-600 ml-1">{gamePosts.length}</span>
              </button>
              <button
                onClick={() => setGameSubTab("reviews")}
                className={`px-4 py-3 text-sm font-medium transition-colors ${
                  gameSubTab === "reviews" ? "text-white border-b-2 border-violet-500" : "text-zinc-500 hover:text-zinc-300"
                }`}
              >
                Отзывы <span className="text-zinc-600 ml-1">{getGameReviews(selectedGame).length}</span>
              </button>
            </div>

            {gameSubTab === "posts" && (
              gamePosts.length === 0 ? (
                <div className="px-6 py-16 text-center">
                  <div className="w-16 h-16 bg-white/5 border border-white/8 rounded-2xl flex items-center justify-center mx-auto mb-4">
                    <Icon name="Gamepad2" size={28} className="text-zinc-500" />
                  </div>
                  <h2 className="font-medium text-white mb-1">Пока тихо</h2>
                  <p className="text-sm text-zinc-500">Будь первым, кто напишет про {game.title}</p>
                </div>
              ) : (
                gamePosts.map((post) => (
                  <PostCard key={post.id} post={post} onLike={handleLike} onRepost={handleRepost} onSave={handleSave} onTagClick={openGame} />
                ))
              )
            )}

            {gameSubTab === "reviews" && (
              <div>
                {/* Форма отзыва */}
                <div className="px-6 py-5 border-b border-white/5 bg-white/[0.02]">
                  <h3 className="text-sm font-semibold text-white mb-3">Оцените игру</h3>
                  <div className="flex items-center gap-1 mb-3">
                    {[1,2,3,4,5,6,7,8,9,10].map((n) => (
                      <button
                        key={n}
                        onMouseEnter={() => setReviewHover(n)}
                        onMouseLeave={() => setReviewHover(0)}
                        onClick={() => setReviewRating(n)}
                        className="transition-transform hover:scale-110"
                      >
                        <Icon
                          name="Star"
                          size={22}
                          className={
                            n <= (reviewHover || reviewRating)
                              ? "text-amber-400 fill-current"
                              : "text-zinc-700"
                          }
                        />
                      </button>
                    ))}
                    {(reviewHover || reviewRating) > 0 && (
                      <span className="ml-3 text-sm font-bold text-amber-400">{reviewHover || reviewRating}/10</span>
                    )}
                  </div>
                  <Textarea
                    value={reviewText}
                    onChange={(e) => setReviewText(e.target.value)}
                    placeholder={`Расскажите, что думаете о ${game.title}…`}
                    className="resize-none bg-white/5 border-white/10 text-zinc-200 placeholder:text-zinc-600 focus:border-violet-500/50 mb-3 text-sm"
                    rows={3}
                  />
                  <div className="flex justify-end">
                    <button
                      onClick={() => submitReview(selectedGame)}
                      disabled={reviewRating === 0 || !reviewText.trim()}
                      className="px-4 py-1.5 bg-violet-600 text-white text-sm rounded-lg disabled:opacity-30 hover:bg-violet-500 transition-colors font-medium"
                    >
                      Опубликовать отзыв
                    </button>
                  </div>
                </div>

                {/* Список отзывов */}
                {getGameReviews(selectedGame).length === 0 ? (
                  <div className="px-6 py-16 text-center">
                    <div className="w-16 h-16 bg-white/5 border border-white/8 rounded-2xl flex items-center justify-center mx-auto mb-4">
                      <Icon name="Star" size={28} className="text-zinc-500" />
                    </div>
                    <h2 className="font-medium text-white mb-1">Пока без отзывов</h2>
                    <p className="text-sm text-zinc-500">Будьте первым, кто оценит {game.title}</p>
                  </div>
                ) : (
                  getGameReviews(selectedGame).map((r) => (
                    <article key={r.id} className="px-6 py-5 border-b border-white/5 hover:bg-white/[0.02] transition-colors">
                      <div className="flex gap-4">
                        <InitialAvatar name={r.author} />
                        <div className="flex-1 min-w-0">
                          <div className="flex items-baseline gap-2 mb-1.5">
                            <span className="font-semibold text-white text-sm">{r.author}</span>
                            <span className="text-zinc-600 text-xs">·</span>
                            <span className="text-zinc-500 text-xs">{r.time}</span>
                            <div className="ml-auto flex items-center gap-1 bg-amber-500/10 border border-amber-500/20 rounded-md px-2 py-0.5">
                              <Icon name="Star" size={11} className="text-amber-400 fill-current" />
                              <span className="text-amber-400 text-xs font-bold">{r.rating}/10</span>
                            </div>
                          </div>

                          {/* Полоска оценки */}
                          <div className="flex items-center gap-1 mb-3">
                            {Array.from({ length: 10 }).map((_, i) => (
                              <div
                                key={i}
                                className={`h-1 flex-1 rounded-full ${
                                  i < r.rating
                                    ? r.rating >= 8
                                      ? "bg-emerald-500"
                                      : r.rating >= 5
                                        ? "bg-amber-500"
                                        : "bg-rose-500"
                                    : "bg-white/8"
                                }`}
                              />
                            ))}
                          </div>

                          <p className="text-zinc-200 text-sm leading-relaxed mb-3">{r.text}</p>

                          <div className="flex items-center gap-5">
                            <button
                              onClick={() => likeReview(r.id)}
                              className={`flex items-center gap-1.5 text-xs transition-colors ${
                                r.liked ? "text-rose-400" : "text-zinc-500 hover:text-rose-400"
                              }`}
                            >
                              <Icon name="Heart" size={14} className={r.liked ? "fill-current" : ""} />
                              <span>{r.likes}</span>
                            </button>
                            <button className="flex items-center gap-1.5 text-xs text-zinc-500 hover:text-cyan-400 transition-colors">
                              <Icon name="MessageCircle" size={14} />
                              <span>Ответить</span>
                            </button>
                          </div>
                        </div>
                      </div>
                    </article>
                  ))
                )}
              </div>
            )}
          </div>
        );
      })()}
    </main>
  );
}
