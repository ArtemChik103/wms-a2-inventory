import React from 'react';
import type { ItemStatus } from '../types';
import { CheckCircle2, Archive, Layers, AlertCircle } from 'lucide-react';

interface StatusBadgeProps {
  status: ItemStatus;
  size?: 'sm' | 'md';
  showIcon?: boolean;
}

export const STATUS_CONFIG: Record<
  ItemStatus,
  {
    bg: string;
    text: string;
    border: string;
    dot: string;
    icon: React.ComponentType<{ className?: string }>;
    description: string;
  }
> = {
  'Готов к отгрузке': {
    bg: 'bg-emerald-50 text-emerald-800 border-emerald-200/90',
    text: 'text-emerald-700',
    border: 'border-emerald-200/90',
    dot: 'bg-emerald-500 ring-emerald-400/30',
    icon: CheckCircle2,
    description: 'Упакован и готов к отправке перевозчику',
  },
  'На хранении': {
    bg: 'bg-blue-50 text-blue-800 border-blue-200/90',
    text: 'text-blue-700',
    border: 'border-blue-200/90',
    dot: 'bg-blue-500 ring-blue-400/30',
    icon: Archive,
    description: 'Находится на складском хранении в ячейке',
  },
  'На сборке': {
    bg: 'bg-amber-50 text-amber-800 border-amber-200/90',
    text: 'text-amber-700',
    border: 'border-amber-200/90',
    dot: 'bg-amber-500 ring-amber-400/30',
    icon: Layers,
    description: 'В процессе комплектации сборщиком',
  },
  'Списан': {
    bg: 'bg-rose-50 text-rose-800 border-rose-200/90',
    text: 'text-rose-700',
    border: 'border-rose-200/90',
    dot: 'bg-rose-500 ring-rose-400/30',
    icon: AlertCircle,
    description: 'Списан (брак, повреждение или инвентаризация)',
  },
};


export const StatusBadge: React.FC<StatusBadgeProps> = ({
  status,
  size = 'md',
  showIcon = true,
}) => {
  const config = STATUS_CONFIG[status] || STATUS_CONFIG['На хранении'];
  const Icon = config.icon;

  const sizeClasses =
    size === 'sm'
      ? 'px-2 py-0.5 text-xs font-medium'
      : 'px-2.5 py-1 text-xs font-medium';

  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full border shadow-2xs transition-colors select-none ${config.bg} ${sizeClasses}`}
    >
      <span className={`h-1.5 w-1.5 rounded-full ${config.dot} ring-2`} />
      {showIcon && <Icon className="h-3.5 w-3.5 opacity-85 shrink-0" />}
      <span>{status}</span>
    </span>
  );
};
