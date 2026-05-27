import { ReactNode } from "react";
import Icon from "@/components/ui/icon";

interface EmptyStateProps {
  icon: string;
  title: string;
  description: string;
  action?: ReactNode;
  compact?: boolean;
}

export function EmptyState({ icon, title, description, action, compact = false }: EmptyStateProps) {
  if (compact) {
    return (
      <div className="px-6 py-16 text-center">
        <Icon name={icon} size={32} className="text-zinc-700 mx-auto mb-3" />
        <p className="text-zinc-500 text-sm">{description}</p>
      </div>
    );
  }
  return (
    <div className="px-6 py-16 text-center">
      <div className="w-16 h-16 bg-white/5 border border-white/8 rounded-2xl flex items-center justify-center mx-auto mb-4">
        <Icon name={icon} size={28} className="text-zinc-500" />
      </div>
      <h2 className="font-medium text-white mb-1">{title}</h2>
      <p className="text-sm text-zinc-500 max-w-xs mx-auto mb-4">{description}</p>
      {action}
    </div>
  );
}
