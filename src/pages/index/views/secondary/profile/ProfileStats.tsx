interface ProfileStatsProps {
  follows: number;
  followers: number;
}

export function ProfileStats({ follows, followers }: ProfileStatsProps) {
  return (
    <div className="flex gap-6 mb-6">
      <div>
        <span className="font-bold text-white">{follows}</span>
        <span className="text-zinc-500 text-sm ml-1">подписок</span>
      </div>
      <div>
        <span className="font-bold text-white">{followers}</span>
        <span className="text-zinc-500 text-sm ml-1">подписчиков</span>
      </div>
    </div>
  );
}
