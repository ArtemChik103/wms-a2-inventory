import React, { useRef, useEffect } from 'react';
import type { ItemStatus } from '../types';
import { Search, X, Filter, RotateCcw } from 'lucide-react';


interface SearchBarProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  selectedStatus: ItemStatus | 'all';
  onStatusChange: (status: ItemStatus | 'all') => void;
  resultsCount: number;
  totalCount: number;
  onReset: () => void;
}

const STATUS_OPTIONS: Array<{ value: ItemStatus | 'all'; label: string }> = [
  { value: 'all', label: 'Все статусы' },
  { value: 'Готов к отгрузке', label: 'Готов к отгрузке' },
  { value: 'На хранении', label: 'На хранении' },
  { value: 'На сборке', label: 'На сборке' },
  { value: 'Списан', label: 'Списан' },
];

export const SearchBar: React.FC<SearchBarProps> = ({
  searchQuery,
  onSearchChange,
  selectedStatus,
  onStatusChange,
  resultsCount,
  totalCount,
  onReset,
}) => {
  const inputRef = useRef<HTMLInputElement>(null);

  // Глобальная горячая клавиша '/' для фокусировки поля поиска
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (
        e.key === '/' &&
        document.activeElement?.tagName !== 'INPUT' &&
        document.activeElement?.tagName !== 'TEXTAREA'
      ) {
        e.preventDefault();
        inputRef.current?.focus();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const hasActiveFilters = searchQuery.trim() !== '' || selectedStatus !== 'all';

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-2xs">
      <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
        {/* Поле ввода поискового запроса */}
        <div className="relative flex-1">
          <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3.5 text-slate-400">
            <Search className="h-4 w-4" />
          </div>

          <input
            ref={inputRef}
            type="text"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Поиск по товару или SKU..."
            className="w-full rounded-xl border border-slate-200 bg-slate-50/60 py-2.5 pr-20 pl-10 text-sm text-slate-900 placeholder:text-slate-400 transition-colors focus:border-blue-500 focus:bg-white focus:outline-none focus:ring-3 focus:ring-blue-500/15"
          />

          <div className="absolute inset-y-0 right-0 flex items-center pr-2.5 gap-1.5">
            {searchQuery && (
              <button
                type="button"
                onClick={() => onSearchChange('')}
                className="rounded-md p-1 text-slate-400 hover:bg-slate-200 hover:text-slate-600 focus:outline-none"
                title="Очистить поиск"
              >
                <X className="h-3.5 w-3.5" />
              </button>
            )}
            <kbd className="hidden sm:inline-flex items-center rounded border border-slate-200 bg-white px-1.5 font-mono text-[10px] font-semibold text-slate-400 shadow-2xs">
              /
            </kbd>
          </div>
        </div>

        {/* Элементы управления фильтрами */}
        <div className="flex flex-wrap items-center gap-2.5">
          {/* Выпадающий список выбора статуса */}
          <div className="relative flex items-center">
            <Filter className="pointer-events-none absolute left-3 h-3.5 w-3.5 text-slate-400" />
            <select
              value={selectedStatus}
              onChange={(e) =>
                onStatusChange(e.target.value as ItemStatus | 'all')
              }
              className="appearance-none rounded-xl border border-slate-200 bg-slate-50/60 py-2.5 pr-8 pl-8 text-xs font-medium text-slate-700 hover:bg-slate-100/70 focus:border-blue-500 focus:bg-white focus:outline-none focus:ring-3 focus:ring-blue-500/15 cursor-pointer"
            >
              {STATUS_OPTIONS.map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </select>
            <div className="pointer-events-none absolute right-2.5 text-slate-400 text-xs">
              ▼
            </div>
          </div>

          {/* Кнопка сброса фильтров */}
          {hasActiveFilters && (
            <button
              type="button"
              onClick={onReset}
              className="inline-flex items-center gap-1.5 rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-xs font-medium text-slate-600 hover:bg-slate-50 hover:text-slate-900 transition-colors shadow-2xs"
            >
              <RotateCcw className="h-3.5 w-3.5 text-slate-400" />
              Сброс
            </button>
          )}

          {/* Счетчик найденных позиций */}
          <div className="ml-auto lg:ml-2 text-xs text-slate-500 font-medium">
            Найдено: <span className="font-mono font-bold text-slate-900">{resultsCount}</span> из <span className="font-mono text-slate-600">{totalCount}</span>
          </div>
        </div>
      </div>
    </div>

  );
};
