import { TRENDS } from "../../../constants";

interface TrendingTagsProps {
  setSearchQuery: (q: string) => void;
}

export function TrendingTags({ setSearchQuery }: TrendingTagsProps) {
  return (
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
  );
}
