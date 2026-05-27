import Icon from "@/components/ui/icon";
import { Tab } from "../../constants";

interface HallOfFameTitleProps {
  setActiveTab: (t: Tab) => void;
}

export function HallOfFameTitle({ setActiveTab }: HallOfFameTitleProps) {
  return (
    <div className="flex items-center justify-between mb-3">
      <div className="flex items-center gap-2">
        <div className="w-7 h-7 bg-gradient-to-br from-amber-400 to-orange-600 rounded-lg flex items-center justify-center shadow-lg shadow-amber-500/30">
          <Icon name="Trophy" size={15} className="text-white" />
        </div>
        <div>
          <h2 className="text-sm font-bold text-white tracking-tight">Зал славы</h2>
          <p className="text-[10px] text-zinc-500">Топ-3 по оценкам игроков</p>
        </div>
      </div>
      <button
        onClick={() => setActiveTab("catalog")}
        className="text-xs text-amber-400/80 hover:text-amber-300 transition-colors"
      >
        Весь каталог →
      </button>
    </div>
  );
}
