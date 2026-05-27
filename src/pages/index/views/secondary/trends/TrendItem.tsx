import Icon from "@/components/ui/icon";

interface TrendItemProps {
  index: number;
  tag: string;
  posts: string;
  hot?: boolean;
  onClick: () => void;
}

export function TrendItem({ index, tag, posts, hot, onClick }: TrendItemProps) {
  return (
    <div
      onClick={onClick}
      className="flex items-center gap-4 px-6 py-4 border-b border-white/5 hover:bg-white/[0.03] cursor-pointer transition-colors group"
    >
      <span className="text-zinc-700 font-bold text-lg w-8 text-right">{index}</span>
      <div className="flex-1">
        <div className="flex items-center gap-2">
          <span className="font-semibold text-white">#{tag}</span>
          {hot && (
            <span className="text-xs bg-rose-500/15 text-rose-400 border border-rose-500/20 rounded px-1.5 py-0.5">
              🔥 горячее
            </span>
          )}
        </div>
        <div className="text-xs text-zinc-500 mt-0.5">{posts}</div>
      </div>
      <Icon name="ChevronRight" size={16} className="text-zinc-700 group-hover:text-zinc-400 transition-colors" />
    </div>
  );
}
