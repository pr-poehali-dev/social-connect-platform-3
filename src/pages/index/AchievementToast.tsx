import Icon from "@/components/ui/icon";

interface AchievementToastProps {
  toast: { medal: "🥇" | "🥈" | "🥉"; game: string; place: number; isNew: boolean } | null;
  openGame: (tag: string) => void;
  setAchievementToast: (t: { medal: "🥇" | "🥈" | "🥉"; game: string; place: number; isNew: boolean } | null) => void;
}

export function AchievementToast({ toast, openGame, setAchievementToast }: AchievementToastProps) {
  if (!toast) return null;
  return (
    <div
      onClick={() => { openGame(toast.game); setAchievementToast(null); }}
      className="fixed bottom-6 right-6 z-50 cursor-pointer animate-in slide-in-from-bottom-4 fade-in duration-500"
    >
      <div className="relative bg-gradient-to-br from-zinc-900 to-zinc-950 border border-amber-500/40 rounded-2xl shadow-2xl shadow-amber-500/20 p-4 pr-10 max-w-sm overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-amber-500/10 via-transparent to-transparent pointer-events-none" />
        <div className="absolute -top-8 -right-8 w-24 h-24 bg-amber-500/20 rounded-full blur-2xl pointer-events-none" />
        <button
          onClick={(e) => { e.stopPropagation(); setAchievementToast(null); }}
          className="absolute top-2 right-2 w-6 h-6 rounded-md flex items-center justify-center text-zinc-500 hover:text-white hover:bg-white/10 transition-colors z-10"
        >
          <Icon name="X" size={14} />
        </button>
        <div className="relative flex items-center gap-3">
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-amber-400 to-orange-600 flex items-center justify-center text-3xl shadow-lg shadow-amber-500/40 flex-shrink-0 animate-bounce">
            {toast.medal}
          </div>
          <div className="min-w-0">
            <div className="flex items-center gap-1.5 mb-0.5">
              <Icon name="Trophy" size={12} className="text-amber-400" />
              <span className="text-[10px] font-bold uppercase tracking-wider text-amber-400">
                {toast.isNew ? "Новое в Зале славы" : "Подъём в Зале славы"}
              </span>
            </div>
            <h4 className="text-sm font-bold text-white truncate">«{toast.game}»</h4>
            <p className="text-xs text-zinc-400">
              {toast.place === 1 ? "1-е место — золото!" : toast.place === 2 ? "2-е место — серебро!" : "3-е место — бронза!"}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
