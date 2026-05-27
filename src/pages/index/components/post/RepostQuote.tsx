interface RepostQuoteProps {
  author: string;
  handle: string;
  text: string;
}

export function RepostQuote({ author, handle, text }: RepostQuoteProps) {
  return (
    <div className="border border-white/8 rounded-xl p-3 mb-3 bg-white/[0.03]">
      <div className="flex items-baseline gap-1.5 mb-1">
        <span className="font-medium text-zinc-300 text-xs">{author}</span>
        <span className="text-zinc-500 text-xs">@{handle}</span>
      </div>
      <p className="text-zinc-400 text-sm leading-relaxed">{text}</p>
    </div>
  );
}
