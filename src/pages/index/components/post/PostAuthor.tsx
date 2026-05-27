interface PostAuthorProps {
  author: string;
  handle: string;
  time: string;
}

export function PostAuthor({ author, handle, time }: PostAuthorProps) {
  return (
    <div className="flex items-baseline gap-2 mb-1.5">
      <span className="font-semibold text-white text-sm">{author}</span>
      <span className="text-zinc-500 text-xs">@{handle}</span>
      <span className="text-zinc-600 text-xs ml-auto flex-shrink-0">{time}</span>
    </div>
  );
}
