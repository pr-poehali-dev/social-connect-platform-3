import { useState } from "react";
import Icon from "@/components/ui/icon";
import { Textarea } from "@/components/ui/textarea";

// --- Типы ---
interface Post {
  id: number;
  author: string;
  handle: string;
  time: string;
  text: string;
  likes: number;
  reposts: number;
  comments: number;
  liked: boolean;
  reposted: boolean;
  saved: boolean;
  repostOf?: { author: string; handle: string; text: string };
}

interface Notification {
  id: number;
  type: "like" | "comment" | "follow" | "repost";
  user: string;
  text: string;
  time: string;
  read: boolean;
}

// --- Данные ---
const INITIAL_POSTS: Post[] = [
  {
    id: 1,
    author: "Алиса Морозова",
    handle: "alisa_m",
    time: "2м",
    text: "Минимализм — это не отсутствие вещей, а присутствие только нужного. Применяю этот принцип во всём: в дизайне, в коде, в жизни.",
    likes: 142,
    reposts: 34,
    comments: 18,
    liked: false,
    reposted: false,
    saved: false,
  },
  {
    id: 2,
    author: "Денис Волков",
    handle: "denis_v",
    time: "15м",
    text: "Только что вернулся с конференции по продуктовому дизайну. Главный вывод: пользователи не читают — они сканируют. Делайте интерфейсы для сканирования.",
    likes: 89,
    reposts: 47,
    comments: 23,
    liked: true,
    reposted: false,
    saved: true,
  },
  {
    id: 3,
    author: "Мария Кузнецова",
    handle: "maria_kuz",
    time: "1ч",
    text: "Сделала ретрост для команды из 20 человек. Три часа — и у нас есть чёткий план на квартал. Ещё раз убедилась: структура важнее интенсивности.",
    likes: 203,
    reposts: 61,
    comments: 41,
    liked: false,
    reposted: false,
    saved: false,
  },
  {
    id: 4,
    author: "Иван Петров",
    handle: "ivan_p",
    time: "3ч",
    text: "Открытие дня: если просыпаться на час раньше и читать вместо соцсетей — через месяц прочитаешь 4 книги. Начал неделю назад.",
    likes: 517,
    reposts: 198,
    comments: 87,
    liked: false,
    reposted: false,
    saved: false,
  },
  {
    id: 5,
    author: "Алиса Морозова",
    handle: "alisa_m",
    time: "5ч",
    text: "Работаю над новым проектом. Пока не могу рассказать детали, но это будет что-то особенное в области типографики и пространства.",
    likes: 78,
    reposts: 12,
    comments: 9,
    liked: false,
    reposted: false,
    saved: false,
    repostOf: {
      author: "Денис Волков",
      handle: "denis_v",
      text: "Типографика — это архитектура текста. Правильные отступы решают всё.",
    },
  },
];

const NOTIFICATIONS: Notification[] = [
  { id: 1, type: "like", user: "Денис Волков", text: "понравился ваш пост", time: "2м", read: false },
  { id: 2, type: "follow", user: "Мария Кузнецова", text: "подписалась на вас", time: "10м", read: false },
  { id: 3, type: "comment", user: "Иван Петров", text: "прокомментировал ваш пост", time: "25м", read: false },
  { id: 4, type: "repost", user: "Алиса Морозова", text: "поделилась вашим постом", time: "1ч", read: true },
  { id: 5, type: "like", user: "Денис Волков", text: "понравился ваш комментарий", time: "2ч", read: true },
  { id: 6, type: "follow", user: "Новый пользователь", text: "подписался на вас", time: "5ч", read: true },
];

const TRENDS = [
  { tag: "дизайн", posts: "12.4к постов" },
  { tag: "продуктивность", posts: "8.9к постов" },
  { tag: "типографика", posts: "5.2к постов" },
  { tag: "минимализм", posts: "4.8к постов" },
  { tag: "разработка", posts: "3.1к постов" },
];

const SUGGESTIONS = [
  { name: "Павел Орлов", handle: "pavel_o", bio: "Продуктовый дизайнер" },
  { name: "Светлана Иванова", handle: "sveta_i", bio: "UX-исследователь" },
  { name: "Кирилл Смирнов", handle: "kirill_s", bio: "Фронтенд-разработчик" },
];

type Tab = "feed" | "profile" | "search" | "notifications" | "messages" | "saved" | "trends";

function InitialAvatar({ name, size = "md" }: { name: string; size?: "sm" | "md" | "lg" }) {
  const initials = name.split(" ").map((n) => n[0]).join("").slice(0, 2).toUpperCase();
  const colors = [
    "bg-stone-200 text-stone-600",
    "bg-slate-200 text-slate-600",
    "bg-zinc-200 text-zinc-600",
    "bg-neutral-200 text-neutral-600",
  ];
  const color = colors[name.charCodeAt(0) % colors.length];
  const sizeClass = size === "sm" ? "w-8 h-8 text-xs" : size === "lg" ? "w-14 h-14 text-lg" : "w-10 h-10 text-sm";
  return (
    <div className={`${sizeClass} ${color} rounded-full flex items-center justify-center font-medium flex-shrink-0`}>
      {initials}
    </div>
  );
}

function PostCard({
  post,
  onLike,
  onRepost,
  onSave,
}: {
  post: Post;
  onLike: (id: number) => void;
  onRepost: (id: number, comment: string) => void;
  onSave: (id: number) => void;
}) {
  const [showRepostModal, setShowRepostModal] = useState(false);
  const [repostComment, setRepostComment] = useState("");

  return (
    <article className="border-b border-stone-100 px-6 py-5 hover:bg-stone-50/50 transition-colors duration-150">
      {post.repostOf && (
        <div className="flex items-center gap-1.5 text-xs text-stone-400 mb-3 ml-14">
          <Icon name="Repeat2" size={12} />
          <span>{post.author} поделился</span>
        </div>
      )}
      <div className="flex gap-4">
        <InitialAvatar name={post.author} />
        <div className="flex-1 min-w-0">
          <div className="flex items-baseline gap-2 mb-1.5">
            <span className="font-semibold text-stone-900 text-sm">{post.author}</span>
            <span className="text-stone-400 text-xs">@{post.handle}</span>
            <span className="text-stone-300 text-xs ml-auto flex-shrink-0">{post.time}</span>
          </div>

          {post.repostOf && (
            <div className="border border-stone-200 rounded-xl p-3 mb-3 bg-stone-50">
              <div className="flex items-baseline gap-1.5 mb-1">
                <span className="font-medium text-stone-700 text-xs">{post.repostOf.author}</span>
                <span className="text-stone-400 text-xs">@{post.repostOf.handle}</span>
              </div>
              <p className="text-stone-600 text-sm leading-relaxed">{post.repostOf.text}</p>
            </div>
          )}

          <p className="text-stone-800 text-sm leading-relaxed mb-4">{post.text}</p>

          <div className="flex items-center gap-5">
            <button
              onClick={() => onLike(post.id)}
              className={`flex items-center gap-1.5 text-xs transition-all duration-150 group ${
                post.liked ? "text-rose-500" : "text-stone-400 hover:text-rose-400"
              }`}
            >
              <Icon name="Heart" size={15} className={post.liked ? "fill-current" : "group-hover:scale-110 transition-transform"} />
              <span>{post.likes + (post.liked ? 1 : 0)}</span>
            </button>

            <button
              onClick={() => setShowRepostModal(true)}
              className={`flex items-center gap-1.5 text-xs transition-colors duration-150 ${
                post.reposted ? "text-emerald-500" : "text-stone-400 hover:text-emerald-400"
              }`}
            >
              <Icon name="Repeat2" size={15} />
              <span>{post.reposts + (post.reposted ? 1 : 0)}</span>
            </button>

            <button className="flex items-center gap-1.5 text-xs text-stone-400 hover:text-sky-400 transition-colors duration-150">
              <Icon name="MessageCircle" size={15} />
              <span>{post.comments}</span>
            </button>

            <button
              onClick={() => onSave(post.id)}
              className={`flex items-center gap-1.5 text-xs ml-auto transition-colors duration-150 ${
                post.saved ? "text-amber-500" : "text-stone-400 hover:text-amber-400"
              }`}
            >
              <Icon name="Bookmark" size={15} className={post.saved ? "fill-current" : ""} />
            </button>

            <button className="flex items-center gap-1.5 text-xs text-stone-400 hover:text-stone-600 transition-colors duration-150">
              <Icon name="Share" size={15} />
            </button>
          </div>
        </div>
      </div>

      {showRepostModal && (
        <div
          className="fixed inset-0 bg-black/20 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          onClick={() => setShowRepostModal(false)}
        >
          <div
            className="bg-white rounded-2xl shadow-xl p-6 w-full max-w-md"
            onClick={(e) => e.stopPropagation()}
          >
            <h3 className="font-semibold text-stone-900 mb-4">Поделиться постом</h3>
            <div className="border border-stone-100 rounded-xl p-4 mb-4 bg-stone-50">
              <div className="flex items-baseline gap-1.5 mb-1">
                <span className="font-medium text-stone-700 text-xs">{post.author}</span>
                <span className="text-stone-400 text-xs">@{post.handle}</span>
              </div>
              <p className="text-stone-600 text-sm">{post.text.slice(0, 120)}{post.text.length > 120 ? "…" : ""}</p>
            </div>
            <Textarea
              value={repostComment}
              onChange={(e) => setRepostComment(e.target.value)}
              placeholder="Добавьте комментарий (необязательно)…"
              className="resize-none border-stone-200 focus:border-stone-400 mb-4 text-sm"
              rows={3}
            />
            <div className="flex gap-2 justify-end">
              <button
                onClick={() => setShowRepostModal(false)}
                className="px-4 py-2 text-sm text-stone-500 hover:text-stone-700 transition-colors"
              >
                Отмена
              </button>
              <button
                onClick={() => {
                  onRepost(post.id, repostComment);
                  setShowRepostModal(false);
                  setRepostComment("");
                }}
                className="px-4 py-2 text-sm bg-stone-900 text-white rounded-lg hover:bg-stone-700 transition-colors"
              >
                Поделиться
              </button>
            </div>
          </div>
        </div>
      )}
    </article>
  );
}

export default function Index() {
  const [activeTab, setActiveTab] = useState<Tab>("feed");
  const [posts, setPosts] = useState<Post[]>(INITIAL_POSTS);
  const [newPostText, setNewPostText] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [notifications, setNotifications] = useState<Notification[]>(NOTIFICATIONS);

  const unreadCount = notifications.filter((n) => !n.read).length;

  const handleLike = (id: number) => {
    setPosts((prev) => prev.map((p) => (p.id === id ? { ...p, liked: !p.liked } : p)));
  };

  const handleRepost = (id: number, comment: string) => {
    const original = posts.find((p) => p.id === id);
    if (!original) return;
    const newPost: Post = {
      id: Date.now(),
      author: "Вы",
      handle: "you",
      time: "сейчас",
      text: comment || "Поделился постом",
      likes: 0,
      reposts: 0,
      comments: 0,
      liked: false,
      reposted: false,
      saved: false,
      repostOf: { author: original.author, handle: original.handle, text: original.text },
    };
    setPosts((prev) => [newPost, ...prev.map((p) => (p.id === id ? { ...p, reposted: true } : p))]);
  };

  const handleSave = (id: number) => {
    setPosts((prev) => prev.map((p) => (p.id === id ? { ...p, saved: !p.saved } : p)));
  };

  const handlePublish = () => {
    if (!newPostText.trim()) return;
    const newPost: Post = {
      id: Date.now(),
      author: "Вы",
      handle: "you",
      time: "сейчас",
      text: newPostText,
      likes: 0,
      reposts: 0,
      comments: 0,
      liked: false,
      reposted: false,
      saved: false,
    };
    setPosts((prev) => [newPost, ...prev]);
    setNewPostText("");
  };

  const markAllRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
  };

  const navItems: { id: Tab; icon: string; label: string; badge?: number }[] = [
    { id: "feed", icon: "Home", label: "Лента" },
    { id: "search", icon: "Search", label: "Поиск" },
    { id: "notifications", icon: "Bell", label: "Уведомления", badge: unreadCount },
    { id: "messages", icon: "Mail", label: "Сообщения" },
    { id: "saved", icon: "Bookmark", label: "Сохранённое" },
    { id: "trends", icon: "TrendingUp", label: "Тренды" },
    { id: "profile", icon: "User", label: "Профиль" },
  ];

  const filteredPosts = searchQuery
    ? posts.filter(
        (p) =>
          p.text.toLowerCase().includes(searchQuery.toLowerCase()) ||
          p.author.toLowerCase().includes(searchQuery.toLowerCase()) ||
          p.handle.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : posts;

  const savedPosts = posts.filter((p) => p.saved);

  return (
    <div className="min-h-screen bg-white font-golos">
      <div className="max-w-screen-xl mx-auto flex">

        {/* Левая навигация */}
        <aside className="w-60 flex-shrink-0 sticky top-0 h-screen flex flex-col pt-6 px-4 border-r border-stone-100">
          <div className="px-3 mb-8">
            <span className="text-xl font-bold tracking-tight text-stone-900">волна</span>
            <span className="text-xl font-light text-stone-300">.</span>
          </div>

          <nav className="flex-1 space-y-0.5">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-150 relative ${
                  activeTab === item.id
                    ? "bg-stone-900 text-white"
                    : "text-stone-500 hover:bg-stone-100 hover:text-stone-900"
                }`}
              >
                <Icon name={item.icon} size={18} />
                <span>{item.label}</span>
                {item.badge && item.badge > 0 ? (
                  <span className="ml-auto bg-rose-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-medium">
                    {item.badge}
                  </span>
                ) : null}
              </button>
            ))}
          </nav>

          <div className="pb-6 px-1">
            <div className="flex items-center gap-3 p-2 rounded-xl hover:bg-stone-100 cursor-pointer transition-colors">
              <InitialAvatar name="Вы" size="sm" />
              <div className="flex-1 min-w-0">
                <div className="text-sm font-medium text-stone-900 truncate">Вы</div>
                <div className="text-xs text-stone-400 truncate">@you</div>
              </div>
              <Icon name="MoreHorizontal" size={16} className="text-stone-400" />
            </div>
          </div>
        </aside>

        {/* Основной контент */}
        <main className="flex-1 min-w-0 border-r border-stone-100">

          {/* Лента */}
          {activeTab === "feed" && (
            <div>
              <div className="sticky top-0 bg-white/95 backdrop-blur-sm z-10 px-6 py-4 border-b border-stone-100">
                <h1 className="font-semibold text-stone-900">Лента</h1>
              </div>

              <div className="px-6 py-5 border-b border-stone-100">
                <div className="flex gap-4">
                  <InitialAvatar name="Вы" />
                  <div className="flex-1">
                    <Textarea
                      value={newPostText}
                      onChange={(e) => setNewPostText(e.target.value)}
                      placeholder="Что происходит?"
                      className="resize-none border-0 border-b border-stone-200 rounded-none focus:border-stone-400 focus-visible:ring-0 px-0 text-stone-900 placeholder:text-stone-300 text-sm mb-3 bg-transparent"
                      rows={3}
                    />
                    <div className="flex items-center justify-between">
                      <div className="flex gap-3">
                        <button className="text-stone-400 hover:text-stone-600 transition-colors">
                          <Icon name="Image" size={18} />
                        </button>
                        <button className="text-stone-400 hover:text-stone-600 transition-colors">
                          <Icon name="Hash" size={18} />
                        </button>
                        <button className="text-stone-400 hover:text-stone-600 transition-colors">
                          <Icon name="Smile" size={18} />
                        </button>
                      </div>
                      <div className="flex items-center gap-3">
                        {newPostText.length > 0 && (
                          <span className={`text-xs ${newPostText.length > 240 ? "text-rose-400" : "text-stone-400"}`}>
                            {280 - newPostText.length}
                          </span>
                        )}
                        <button
                          onClick={handlePublish}
                          disabled={!newPostText.trim() || newPostText.length > 280}
                          className="px-4 py-1.5 bg-stone-900 text-white text-sm rounded-lg disabled:opacity-30 hover:bg-stone-700 transition-colors font-medium"
                        >
                          Опубликовать
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {posts.map((post) => (
                <PostCard key={post.id} post={post} onLike={handleLike} onRepost={handleRepost} onSave={handleSave} />
              ))}
            </div>
          )}

          {/* Поиск */}
          {activeTab === "search" && (
            <div>
              <div className="sticky top-0 bg-white/95 backdrop-blur-sm z-10 px-6 py-4 border-b border-stone-100">
                <div className="relative">
                  <Icon name="Search" size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-stone-400" />
                  <input
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Поиск по постам, пользователям, хэштегам…"
                    className="w-full pl-9 pr-4 py-2.5 bg-stone-100 rounded-xl text-sm focus:outline-none focus:bg-white focus:ring-1 focus:ring-stone-300 transition-all text-stone-900 placeholder:text-stone-400"
                    autoFocus
                  />
                </div>
              </div>

              {searchQuery ? (
                <div>
                  <div className="px-6 py-3 border-b border-stone-100">
                    <span className="text-xs text-stone-400">
                      Результаты по «{searchQuery}»: {filteredPosts.length}
                    </span>
                  </div>
                  {filteredPosts.length === 0 ? (
                    <div className="px-6 py-16 text-center">
                      <Icon name="SearchX" size={32} className="text-stone-200 mx-auto mb-3" />
                      <p className="text-stone-400 text-sm">Ничего не найдено</p>
                    </div>
                  ) : (
                    filteredPosts.map((post) => (
                      <PostCard key={post.id} post={post} onLike={handleLike} onRepost={handleRepost} onSave={handleSave} />
                    ))
                  )}
                </div>
              ) : (
                <div>
                  <div className="px-6 py-5 border-b border-stone-100">
                    <h2 className="text-xs font-semibold text-stone-400 uppercase tracking-wider mb-4">Кого читать</h2>
                    <div className="space-y-4">
                      {SUGGESTIONS.map((s) => (
                        <div key={s.handle} className="flex items-center gap-3">
                          <InitialAvatar name={s.name} size="sm" />
                          <div className="flex-1 min-w-0">
                            <div className="text-sm font-medium text-stone-900">{s.name}</div>
                            <div className="text-xs text-stone-400">@{s.handle} · {s.bio}</div>
                          </div>
                          <button className="px-3 py-1 border border-stone-200 rounded-lg text-xs text-stone-700 hover:bg-stone-50 transition-colors font-medium">
                            Читать
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="px-6 py-5">
                    <h2 className="text-xs font-semibold text-stone-400 uppercase tracking-wider mb-3">Популярные хэштеги</h2>
                    <div className="flex flex-wrap gap-2">
                      {TRENDS.map((t) => (
                        <button
                          key={t.tag}
                          onClick={() => setSearchQuery("#" + t.tag)}
                          className="px-3 py-1.5 bg-stone-100 rounded-lg text-sm text-stone-700 hover:bg-stone-200 transition-colors"
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
              <div className="sticky top-0 bg-white/95 backdrop-blur-sm z-10 px-6 py-4 border-b border-stone-100 flex items-center justify-between">
                <h1 className="font-semibold text-stone-900">Уведомления</h1>
                {unreadCount > 0 && (
                  <button onClick={markAllRead} className="text-xs text-stone-400 hover:text-stone-700 transition-colors">
                    Прочитать все
                  </button>
                )}
              </div>
              {notifications.map((n) => (
                <div
                  key={n.id}
                  className={`flex items-start gap-4 px-6 py-4 border-b border-stone-100 transition-colors ${
                    !n.read ? "bg-stone-50/80" : "hover:bg-stone-50/30"
                  }`}
                >
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                    n.type === "like" ? "bg-rose-100 text-rose-500" :
                    n.type === "comment" ? "bg-sky-100 text-sky-500" :
                    n.type === "follow" ? "bg-emerald-100 text-emerald-500" :
                    "bg-amber-100 text-amber-500"
                  }`}>
                    <Icon
                      name={n.type === "like" ? "Heart" : n.type === "comment" ? "MessageCircle" : n.type === "follow" ? "UserPlus" : "Repeat2"}
                      size={14}
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm text-stone-900">
                      <span className="font-medium">{n.user}</span>{" "}
                      <span className="text-stone-500">{n.text}</span>
                    </p>
                    <span className="text-xs text-stone-400">{n.time}</span>
                  </div>
                  {!n.read && (
                    <div className="w-2 h-2 bg-stone-900 rounded-full flex-shrink-0 mt-2" />
                  )}
                </div>
              ))}
            </div>
          )}

          {/* Сообщения */}
          {activeTab === "messages" && (
            <div>
              <div className="sticky top-0 bg-white/95 backdrop-blur-sm z-10 px-6 py-4 border-b border-stone-100">
                <h1 className="font-semibold text-stone-900">Сообщения</h1>
              </div>
              <div className="px-6 py-16 text-center">
                <div className="w-16 h-16 bg-stone-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <Icon name="Mail" size={28} className="text-stone-400" />
                </div>
                <h2 className="font-medium text-stone-900 mb-1">Прямые сообщения</h2>
                <p className="text-sm text-stone-400 max-w-xs mx-auto mb-4">
                  Переписывайтесь напрямую с любым пользователем
                </p>
                <button className="px-4 py-2 bg-stone-900 text-white text-sm rounded-lg hover:bg-stone-700 transition-colors">
                  Написать сообщение
                </button>
              </div>
            </div>
          )}

          {/* Сохранённое */}
          {activeTab === "saved" && (
            <div>
              <div className="sticky top-0 bg-white/95 backdrop-blur-sm z-10 px-6 py-4 border-b border-stone-100">
                <h1 className="font-semibold text-stone-900">Сохранённое</h1>
              </div>
              {savedPosts.length === 0 ? (
                <div className="px-6 py-16 text-center">
                  <div className="w-16 h-16 bg-stone-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                    <Icon name="Bookmark" size={28} className="text-stone-400" />
                  </div>
                  <h2 className="font-medium text-stone-900 mb-1">Пока ничего нет</h2>
                  <p className="text-sm text-stone-400">Сохраняйте посты — они будут здесь</p>
                </div>
              ) : (
                savedPosts.map((post) => (
                  <PostCard key={post.id} post={post} onLike={handleLike} onRepost={handleRepost} onSave={handleSave} />
                ))
              )}
            </div>
          )}

          {/* Тренды */}
          {activeTab === "trends" && (
            <div>
              <div className="sticky top-0 bg-white/95 backdrop-blur-sm z-10 px-6 py-4 border-b border-stone-100">
                <h1 className="font-semibold text-stone-900">Популярные темы</h1>
              </div>
              {TRENDS.map((t, i) => (
                <div
                  key={t.tag}
                  onClick={() => { setSearchQuery("#" + t.tag); setActiveTab("search"); }}
                  className="flex items-center gap-4 px-6 py-4 border-b border-stone-100 hover:bg-stone-50 cursor-pointer transition-colors group"
                >
                  <span className="text-stone-200 font-bold text-xl w-8 text-right">{i + 1}</span>
                  <div className="flex-1">
                    <div className="font-semibold text-stone-900">#{t.tag}</div>
                    <div className="text-xs text-stone-400">{t.posts}</div>
                  </div>
                  <Icon name="TrendingUp" size={16} className="text-stone-300 group-hover:text-stone-500 transition-colors" />
                </div>
              ))}
            </div>
          )}

          {/* Профиль */}
          {activeTab === "profile" && (
            <div>
              <div className="sticky top-0 bg-white/95 backdrop-blur-sm z-10 px-6 py-4 border-b border-stone-100">
                <h1 className="font-semibold text-stone-900">Профиль</h1>
              </div>

              <div className="h-28 bg-gradient-to-br from-stone-100 via-stone-150 to-stone-200" />

              <div className="px-6 pb-8">
                <div className="flex items-end justify-between -mt-7 mb-4">
                  <div className="w-16 h-16 bg-white rounded-full border-4 border-white shadow-sm flex items-center justify-center">
                    <InitialAvatar name="Вы" size="lg" />
                  </div>
                  <button className="px-4 py-1.5 border border-stone-200 rounded-lg text-sm text-stone-700 hover:bg-stone-50 transition-colors font-medium mt-2">
                    Редактировать
                  </button>
                </div>

                <div className="mb-3">
                  <h2 className="text-lg font-bold text-stone-900">Вы</h2>
                  <p className="text-stone-400 text-sm">@you</p>
                </div>

                <p className="text-sm text-stone-500 mb-5 leading-relaxed">
                  Расскажите о себе — добавьте описание профиля.
                </p>

                <div className="flex gap-6 mb-6">
                  <div>
                    <span className="font-bold text-stone-900">0</span>
                    <span className="text-stone-400 text-sm ml-1">подписок</span>
                  </div>
                  <div>
                    <span className="font-bold text-stone-900">0</span>
                    <span className="text-stone-400 text-sm ml-1">подписчиков</span>
                  </div>
                </div>

                <div className="border-t border-stone-100 pt-5">
                  <h3 className="text-xs font-semibold text-stone-400 uppercase tracking-wider mb-4">Ваши посты</h3>
                  {posts.filter((p) => p.handle === "you").length === 0 ? (
                    <p className="text-sm text-stone-400">Вы ещё ничего не публиковали</p>
                  ) : (
                    posts.filter((p) => p.handle === "you").map((post) => (
                      <PostCard key={post.id} post={post} onLike={handleLike} onRepost={handleRepost} onSave={handleSave} />
                    ))
                  )}
                </div>
              </div>
            </div>
          )}
        </main>

        {/* Правая панель */}
        <aside className="w-72 flex-shrink-0 pl-6 pt-6 pr-4 hidden lg:block">
          <div className="mb-7">
            <h2 className="text-xs font-semibold text-stone-400 uppercase tracking-wider mb-2 px-1">В тренде</h2>
            <div className="space-y-0.5">
              {TRENDS.slice(0, 4).map((t, i) => (
                <button
                  key={t.tag}
                  onClick={() => { setSearchQuery("#" + t.tag); setActiveTab("search"); }}
                  className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-stone-100 text-left transition-colors group"
                >
                  <span className="text-stone-300 text-xs font-medium w-4">{i + 1}</span>
                  <div>
                    <div className="text-sm font-medium text-stone-800 group-hover:text-stone-900">#{t.tag}</div>
                    <div className="text-xs text-stone-400">{t.posts}</div>
                  </div>
                </button>
              ))}
            </div>
          </div>

          <div>
            <h2 className="text-xs font-semibold text-stone-400 uppercase tracking-wider mb-2 px-1">Кого читать</h2>
            <div className="space-y-0.5">
              {SUGGESTIONS.map((s) => (
                <div key={s.handle} className="flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-stone-100 transition-colors">
                  <InitialAvatar name={s.name} size="sm" />
                  <div className="flex-1 min-w-0">
                    <div className="text-sm font-medium text-stone-900 truncate">{s.name}</div>
                    <div className="text-xs text-stone-400 truncate">{s.bio}</div>
                  </div>
                  <button className="text-xs border border-stone-200 rounded-lg px-2.5 py-1 text-stone-700 hover:bg-stone-50 transition-colors whitespace-nowrap">
                    Читать
                  </button>
                </div>
              ))}
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}
