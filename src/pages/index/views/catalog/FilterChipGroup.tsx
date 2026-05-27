import { ReactNode } from "react";

interface FilterChipGroupProps {
  label: string;
  items: string[];
  selected: Set<string>;
  onToggle: (item: string) => void;
  activeClass: string;
  className?: string;
  children?: ReactNode;
}

export function FilterChipGroup({
  label,
  items,
  selected,
  onToggle,
  activeClass,
  className = "px-6 pb-3",
  children,
}: FilterChipGroupProps) {
  return (
    <div className={className}>
      <div className="flex items-center gap-2 flex-wrap">
        <span className="text-[10px] uppercase tracking-wider text-zinc-500 font-semibold mr-1">{label}</span>
        {items.map((item) => {
          const active = selected.has(item);
          return (
            <button
              key={item}
              onClick={() => onToggle(item)}
              className={`text-xs px-2.5 py-1 rounded-md border transition-colors ${
                active
                  ? activeClass
                  : "bg-white/5 border-white/10 text-zinc-400 hover:bg-white/10 hover:text-zinc-200"
              }`}
            >
              {item}
            </button>
          );
        })}
        {children}
      </div>
    </div>
  );
}
