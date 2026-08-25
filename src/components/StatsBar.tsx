import React from 'react';
import type { InventoryItem, ItemStatus } from '../types';
import { Package, CheckCircle2, Archive, Layers, AlertCircle } from 'lucide-react';


interface StatsBarProps {
  items: InventoryItem[];
  selectedStatus: ItemStatus | 'all';
  onSelectStatus: (status: ItemStatus | 'all') => void;
}

export const StatsBar: React.FC<StatsBarProps> = ({
  items,
  selectedStatus,
  onSelectStatus,
}) => {
  const counts = {
    total: items.length,
    ready: items.filter((i) => i.status === 'Готов к отгрузке').length,
    storage: items.filter((i) => i.status === 'На хранении').length,
    assembly: items.filter((i) => i.status === 'На сборке').length,
    writtenOff: items.filter((i) => i.status === 'Списан').length,
  };

  const totalQuantity = items.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
      {/* Total */}
      <button
        type="button"
        onClick={() => onSelectStatus('all')}
        className={`flex flex-col text-left rounded-xl border p-3.5 transition-all shadow-2xs ${
          selectedStatus === 'all'
            ? 'border-blue-500 bg-blue-50/50 ring-2 ring-blue-500/20'
            : 'border-slate-200 bg-white hover:border-slate-300 hover:bg-slate-50/70'
        }`}
      >
        <div className="flex items-center justify-between">
          <span className="text-xs font-medium text-slate-500">Всего позиций</span>
          <Package className="h-4 w-4 text-slate-400" />
        </div>
        <div className="mt-2 flex items-baseline gap-2">
          <span className="text-2xl font-bold font-mono tracking-tight text-slate-900">
            {counts.total}
          </span>
          <span className="text-xs text-slate-500 font-mono">
            ({totalQuantity} ед.)
          </span>
        </div>
      </button>

      {/* Ready */}
      <button
        type="button"
        onClick={() =>
          onSelectStatus(
            selectedStatus === 'Готов к отгрузке' ? 'all' : 'Готов к отгрузке'
          )
        }
        className={`flex flex-col text-left rounded-xl border p-3.5 transition-all shadow-2xs ${
          selectedStatus === 'Готов к отгрузке'
            ? 'border-emerald-500 bg-emerald-50/50 ring-2 ring-emerald-500/20'
            : 'border-slate-200 bg-white hover:border-slate-300 hover:bg-slate-50/70'
        }`}
      >
        <div className="flex items-center justify-between">
          <span className="text-xs font-medium text-emerald-800">К отгрузке</span>
          <CheckCircle2 className="h-4 w-4 text-emerald-600" />
        </div>
        <div className="mt-2 flex items-baseline gap-1.5">
          <span className="text-2xl font-bold font-mono tracking-tight text-emerald-700">
            {counts.ready}
          </span>
          <span className="text-xs text-slate-500">готово</span>
        </div>
      </button>

      {/* Assembly */}
      <button
        type="button"
        onClick={() =>
          onSelectStatus(
            selectedStatus === 'На сборке' ? 'all' : 'На сборке'
          )
        }
        className={`flex flex-col text-left rounded-xl border p-3.5 transition-all shadow-2xs ${
          selectedStatus === 'На сборке'
            ? 'border-amber-500 bg-amber-50/50 ring-2 ring-amber-500/20'
            : 'border-slate-200 bg-white hover:border-slate-300 hover:bg-slate-50/70'
        }`}
      >
        <div className="flex items-center justify-between">
          <span className="text-xs font-medium text-amber-800">На сборке</span>
          <Layers className="h-4 w-4 text-amber-600" />
        </div>
        <div className="mt-2 flex items-baseline gap-1.5">
          <span className="text-2xl font-bold font-mono tracking-tight text-amber-700">
            {counts.assembly}
          </span>
          <span className="text-xs text-slate-500">в работе</span>
        </div>
      </button>

      {/* Storage */}
      <button
        type="button"
        onClick={() =>
          onSelectStatus(
            selectedStatus === 'На хранении' ? 'all' : 'На хранении'
          )
        }
        className={`flex flex-col text-left rounded-xl border p-3.5 transition-all shadow-2xs ${
          selectedStatus === 'На хранении'
            ? 'border-blue-500 bg-blue-50/50 ring-2 ring-blue-500/20'
            : 'border-slate-200 bg-white hover:border-slate-300 hover:bg-slate-50/70'
        }`}
      >
        <div className="flex items-center justify-between">
          <span className="text-xs font-medium text-blue-800">На хранении</span>
          <Archive className="h-4 w-4 text-blue-600" />
        </div>
        <div className="mt-2 flex items-baseline gap-1.5">
          <span className="text-2xl font-bold font-mono tracking-tight text-blue-700">
            {counts.storage}
          </span>
          <span className="text-xs text-slate-500">в ячейках</span>
        </div>
      </button>

      {/* Written Off */}
      <button
        type="button"
        onClick={() =>
          onSelectStatus(
            selectedStatus === 'Списан' ? 'all' : 'Списан'
          )
        }
        className={`col-span-2 sm:col-span-1 flex flex-col text-left rounded-xl border p-3.5 transition-all shadow-2xs ${
          selectedStatus === 'Списан'
            ? 'border-rose-500 bg-rose-50/50 ring-2 ring-rose-500/20'
            : 'border-slate-200 bg-white hover:border-slate-300 hover:bg-slate-50/70'
        }`}
      >
        <div className="flex items-center justify-between">
          <span className="text-xs font-medium text-rose-800">Списано</span>
          <AlertCircle className="h-4 w-4 text-rose-600" />
        </div>
        <div className="mt-2 flex items-baseline gap-1.5">
          <span className="text-2xl font-bold font-mono tracking-tight text-rose-700">
            {counts.writtenOff}
          </span>
          <span className="text-xs text-slate-500">брак/акт</span>
        </div>
      </button>
    </div>
  );
};
