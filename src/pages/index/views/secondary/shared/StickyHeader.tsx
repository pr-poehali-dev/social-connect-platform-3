import { ReactNode } from "react";

interface StickyHeaderProps {
  title?: string;
  children?: ReactNode;
  right?: ReactNode;
}

export function StickyHeader({ title, children, right }: StickyHeaderProps) {
  if (children) {
    return (
      <div className="sticky top-0 bg-zinc-950/90 backdrop-blur-sm z-10 px-6 py-4 border-b border-white/5">
        {children}
      </div>
    );
  }
  return (
    <div className="sticky top-0 bg-zinc-950/90 backdrop-blur-sm z-10 px-6 py-4 border-b border-white/5 flex items-center justify-between">
      <h1 className="font-semibold text-white">{title}</h1>
      {right}
    </div>
  );
}
