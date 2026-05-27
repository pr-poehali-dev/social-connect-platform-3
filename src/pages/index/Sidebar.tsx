import Icon from "@/components/ui/icon";
import { GAMES, TRENDS, SUGGESTIONS, InitialAvatar, Tab } from "./constants";

interface LeftSidebarProps {
  activeTab: Tab;
  setActiveTab: (t: Tab) => void;
  navItems: { id: Tab; icon: string; label: string; badge?: number }[];
}

export function LeftSidebar({ activeTab, setActiveTab, navItems }: LeftSidebarProps) {
  return (
    <aside className="w-60 flex-shrink-0 sticky top-0 h-screen flex flex-col pt-6 px-4 border-r border-white/5">
      <div className="px-3 mb-8">
        <span className="text-xl font-bold tracking-tight text-white">pixel</span>
        <span className="text-xl font-bold text-violet-400">talk</span>
      </div>

      <nav className="flex-1 space-y-0.5">
        {navItems.map((item) => (
          <button
            key={item.id}
            onClick={() => setActiveTab(item.id)}
            className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-150 ${
              activeTab === item.id
                ? "bg-violet-600 text-white"
                : "text-zinc-400 hover:bg-white/5 hover:text-zinc-100"
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
        <div className="flex items-center gap-3 p-2 rounded-xl hover:bg-white/5 cursor-pointer transition-colors">
          <InitialAvatar name="ВЫ" size="sm" />
          <div className="flex-1 min-w-0">
            <div className="text-sm font-medium text-white truncate">Вы</div>
            <div className="text-xs text-zinc-500 truncate">@you</div>
          </div>
          <Icon name="MoreHorizontal" size={16} className="text-zinc-500" />
        </div>
      </div>
    </aside>
  );
}

interface RightSidebarProps {
  setActiveTab: (t: Tab) => void;
  openGame: (tag: string) => void;
  setSearchQuery: (q: string) => void;
}

export function RightSidebar({ setActiveTab, openGame, setSearchQuery }: RightSidebarProps) {
  return (
    <aside className="w-72 flex-shrink-0 pl-6 pt-6 pr-4 hidden lg:block">
      <div className="mb-7">
        <div className="flex items-center justify-between mb-2 px-1">
          <h2 className="text-xs font-semibold text-zinc-500 uppercase tracking-wider">Игры в фокусе</h2>
          <button
            onClick={() => setActiveTab("catalog")}
            className="text-xs text-violet-400 hover:text-violet-300 transition-colors"
          >
            Все →
          </button>
        </div>
        <div className="space-y-2">
          {Object.values(GAMES).slice(0, 3).map((g) => (
            <button
              key={g.title}
              onClick={() => openGame(g.title)}
              className="w-full flex items-center gap-3 p-2 rounded-xl hover:bg-white/5 text-left transition-colors group"
            >
              <div className={`w-10 h-10 rounded-lg bg-gradient-to-br ${g.cover} flex-shrink-0 flex items-center justify-center text-xs font-bold text-white/80`}>
                {g.title.slice(0, 1)}
              </div>
              <div className="flex-1 min-w-0">
                <div className="text-sm font-medium text-white truncate group-hover:text-violet-300 transition-colors">{g.title}</div>
                <div className="text-xs text-zinc-500 truncate">{g.rating}/100 · {g.genre.split(" · ")[0]}</div>
              </div>
            </button>
          ))}
        </div>
      </div>

      <div className="mb-7">
        <h2 className="text-xs font-semibold text-zinc-500 uppercase tracking-wider mb-2 px-1">В тренде сейчас</h2>
        <div className="space-y-0.5">
          {TRENDS.slice(0, 4).map((t, i) => (
            <button
              key={t.tag}
              onClick={() => { setSearchQuery("#" + t.tag); setActiveTab("search"); }}
              className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-white/5 text-left transition-colors group"
            >
              <span className="text-zinc-700 text-xs font-medium w-4">{i + 1}</span>
              <div>
                <div className="flex items-center gap-1.5">
                  <span className="text-sm font-medium text-zinc-200 group-hover:text-white">#{t.tag}</span>
                  {t.hot && <span className="text-xs">🔥</span>}
                </div>
                <div className="text-xs text-zinc-600">{t.posts}</div>
              </div>
            </button>
          ))}
        </div>
      </div>

      <div>
        <h2 className="text-xs font-semibold text-zinc-500 uppercase tracking-wider mb-2 px-1">Кого читать</h2>
        <div className="space-y-0.5">
          {SUGGESTIONS.map((s) => (
            <div key={s.handle} className="flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-white/5 transition-colors">
              <InitialAvatar name={s.name} size="sm" />
              <div className="flex-1 min-w-0">
                <div className="text-sm font-medium text-white truncate">{s.name}</div>
                <div className="text-xs text-zinc-500 truncate">{s.bio}</div>
              </div>
              <button className="text-xs border border-white/10 rounded-lg px-2.5 py-1 text-zinc-300 hover:bg-violet-600/20 hover:border-violet-500/30 hover:text-violet-300 transition-colors whitespace-nowrap">
                Читать
              </button>
            </div>
          ))}
        </div>
      </div>
    </aside>
  );
}
