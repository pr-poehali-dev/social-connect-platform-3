import { Tab, TRENDS } from "../../constants";
import { StickyHeader } from "./shared/StickyHeader";
import { TrendItem } from "./trends/TrendItem";

interface TrendsViewProps {
  setSearchQuery: (q: string) => void;
  setActiveTab: (t: Tab) => void;
}

export function TrendsView({ setSearchQuery, setActiveTab }: TrendsViewProps) {
  return (
    <div>
      <StickyHeader title="Популярные темы" />
      {TRENDS.map((t, i) => (
        <TrendItem
          key={t.tag}
          index={i + 1}
          tag={t.tag}
          posts={t.posts}
          hot={t.hot}
          onClick={() => { setSearchQuery("#" + t.tag); setActiveTab("search"); }}
        />
      ))}
    </div>
  );
}
