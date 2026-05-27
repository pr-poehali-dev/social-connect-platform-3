import Icon from "@/components/ui/icon";
import { Post, Notification, Tab, TRENDS, SUGGESTIONS, InitialAvatar, PostCard } from "../constants";

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

interface NotificationsViewProps {
  notifications: Notification[];
  unreadCount: number;
  markAllRead: () => void;
  openGame: (tag: string) => void;
}

export function NotificationsView({ notifications, unreadCount, markAllRead, openGame }: NotificationsViewProps) {
  return (
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
  );
}

export function MessagesView() {
  return (
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
  );
}

interface SavedViewProps {
  savedPosts: Post[];
  openGame: (tag: string) => void;
  handleLike: (id: number) => void;
  handleRepost: (id: number, comment: string) => void;
  handleSave: (id: number) => void;
}

export function SavedView({ savedPosts, openGame, handleLike, handleRepost, handleSave }: SavedViewProps) {
  return (
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
  );
}

interface TrendsViewProps {
  setSearchQuery: (q: string) => void;
  setActiveTab: (t: Tab) => void;
}

export function TrendsView({ setSearchQuery, setActiveTab }: TrendsViewProps) {
  return (
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
  );
}

interface ProfileViewProps {
  posts: Post[];
  openGame: (tag: string) => void;
  handleLike: (id: number) => void;
  handleRepost: (id: number, comment: string) => void;
  handleSave: (id: number) => void;
}

export function ProfileView({ posts, openGame, handleLike, handleRepost, handleSave }: ProfileViewProps) {
  return (
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
  );
}
