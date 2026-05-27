import Icon from "@/components/ui/icon";
import { Tab, TRENDS } from "../../constants";

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
