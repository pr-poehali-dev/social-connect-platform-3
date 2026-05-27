import Icon from "@/components/ui/icon";

interface CatalogEmptyProps {
  resetFilters: () => void;
}

export function CatalogEmpty({ resetFilters }: CatalogEmptyProps) {
  return (
    <div className="px-6 py-20 text-center">
      <div className="w-16 h-16 bg-white/5 border border-white/8 rounded-2xl flex items-center justify-center mx-auto mb-4">
        <Icon name="SearchX" size={28} className="text-zinc-500" />
      </div>
      <h2 className="font-medium text-white mb-1">Ничего не найдено</h2>
      <p className="text-sm text-zinc-500 mb-4">Попробуйте изменить фильтры</p>
      <button
        onClick={resetFilters}
        className="px-4 py-2 bg-violet-600 text-white text-sm rounded-lg hover:bg-violet-500 transition-colors"
      >
        Сбросить фильтры
      </button>
    </div>
  );
}
