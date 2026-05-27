import Icon from "@/components/ui/icon";
import { Textarea } from "@/components/ui/textarea";
import { Post, Review, Tab, GAMES, InitialAvatar, PostCard } from "../constants";

interface GameViewProps {
  setActiveTab: (t: Tab) => void;
  posts: Post[];
  selectedGame: string;
  followedGames: Set<string>;
  reviewRating: number;
  setReviewRating: (n: number) => void;
  reviewHover: number;
  setReviewHover: (n: number) => void;
  reviewText: string;
  setReviewText: (v: string) => void;
  gameSubTab: "posts" | "reviews";
  setGameSubTab: (t: "posts" | "reviews") => void;
  getGameUserScore: (game: string) => string | null;
  getGameReviews: (game: string) => Review[];
  openGame: (tag: string) => void;
  toggleFollowGame: (tag: string) => void;
  handleLike: (id: number) => void;
  handleRepost: (id: number, comment: string) => void;
  handleSave: (id: number) => void;
  submitReview: (game: string) => void;
  likeReview: (id: number) => void;
}

export function GameView({
  setActiveTab,
  posts,
  selectedGame,
  followedGames,
  reviewRating,
  setReviewRating,
  reviewHover,
  setReviewHover,
  reviewText,
  setReviewText,
  gameSubTab,
  setGameSubTab,
  getGameUserScore,
  getGameReviews,
  openGame,
  toggleFollowGame,
  handleLike,
  handleRepost,
  handleSave,
  submitReview,
  likeReview,
}: GameViewProps) {
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
}
