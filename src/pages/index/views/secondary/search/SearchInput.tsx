import Icon from "@/components/ui/icon";

interface SearchInputProps {
  searchQuery: string;
  setSearchQuery: (q: string) => void;
}

export function SearchInput({ searchQuery, setSearchQuery }: SearchInputProps) {
  return (
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
  );
}
