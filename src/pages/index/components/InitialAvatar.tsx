export function InitialAvatar({ name, size = "md" }: { name: string; size?: "sm" | "md" | "lg" }) {
  const initials = name.slice(0, 2).toUpperCase();
  const palette = [
    "bg-violet-900/60 text-violet-300",
    "bg-cyan-900/60 text-cyan-300",
    "bg-emerald-900/60 text-emerald-300",
    "bg-rose-900/60 text-rose-300",
    "bg-amber-900/60 text-amber-300",
    "bg-indigo-900/60 text-indigo-300",
  ];
  const color = palette[name.charCodeAt(0) % palette.length];
  const sizeClass = size === "sm" ? "w-8 h-8 text-xs" : size === "lg" ? "w-14 h-14 text-base" : "w-10 h-10 text-sm";
  return (
    <div className={`${sizeClass} ${color} rounded-xl flex items-center justify-center font-bold flex-shrink-0 border border-white/5`}>
      {initials}
    </div>
  );
}
