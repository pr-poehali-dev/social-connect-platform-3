import Icon from "@/components/ui/icon";

interface CatalogSearchProps {
  catalogSearch: string;
  setCatalogSearch: (v: string) => void;
}

export function CatalogSearch({ catalogSearch, setCatalogSearch }: CatalogSearchProps) {
  return (
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
  );
}
