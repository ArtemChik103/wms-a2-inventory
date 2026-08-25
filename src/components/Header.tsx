import React from 'react';
import { Package, Warehouse, Activity, Bell, UserCircle2 } from 'lucide-react';

interface HeaderProps {
  totalItemsCount: number;
}

export const Header: React.FC<HeaderProps> = ({ totalItemsCount }) => {
  return (
    <header className="sticky top-0 z-30 border-b border-slate-200/90 bg-white/90 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Left: Brand and Active Section */}
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-2.5">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-blue-600 text-white shadow-xs">
              <Package className="h-5 w-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-mono text-base font-bold tracking-tight text-slate-900">
                  WMS А2
                </span>
                <span className="inline-flex items-center gap-1 rounded bg-slate-100 px-1.5 py-0.5 font-mono text-[11px] font-medium text-slate-600">
                  v2.4
                </span>
              </div>
              <span className="block text-[11px] text-slate-400">
                Складская логистика
              </span>
            </div>
          </div>

          <div className="hidden h-6 w-px bg-slate-200 md:block" />

          {/* Current Section navigation */}
          <nav className="flex items-center gap-2" aria-label="Разделы системы">
            <div className="flex items-center gap-2 rounded-lg bg-blue-50/80 px-3 py-1.5 text-sm font-semibold text-blue-700 ring-1 ring-blue-500/20">
              <span className="h-2 w-2 rounded-full bg-blue-600" />
              <span>Товары</span>
              <span className="rounded-full bg-blue-200/70 px-1.5 py-0.2 font-mono text-xs font-bold text-blue-800">
                {totalItemsCount}
              </span>
            </div>

            <div className="hidden items-center gap-1 sm:flex">
              <span className="rounded-md px-3 py-1.5 text-sm font-medium text-slate-500 hover:bg-slate-100 hover:text-slate-700 cursor-not-allowed opacity-60">
                Приёмка
              </span>
              <span className="rounded-md px-3 py-1.5 text-sm font-medium text-slate-500 hover:bg-slate-100 hover:text-slate-700 cursor-not-allowed opacity-60">
                Отгрузка
              </span>
              <span className="rounded-md px-3 py-1.5 text-sm font-medium text-slate-500 hover:bg-slate-100 hover:text-slate-700 cursor-not-allowed opacity-60">
                Ячейки
              </span>
            </div>
          </nav>
        </div>

        {/* Right: Warehouse status and Operator profile */}
        <div className="flex items-center gap-3">
          <div className="hidden lg:flex items-center gap-2 rounded-lg border border-slate-200 bg-slate-50 px-3 py-1.5 text-xs text-slate-600">
            <Warehouse className="h-3.5 w-3.5 text-slate-400" />
            <span className="font-medium">Склад Север (Терминал 1)</span>
            <span className="flex items-center gap-1 text-emerald-600 font-medium">
              <Activity className="h-3 w-3" />
              Онлайн
            </span>
          </div>

          <button
            type="button"
            className="relative rounded-lg p-2 text-slate-400 hover:bg-slate-100 hover:text-slate-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
            title="Уведомления"
            aria-label="Уведомления"
          >
            <Bell className="h-4 w-4" />
            <span className="absolute top-1.5 right-1.5 h-2 w-2 rounded-full bg-amber-500" />
          </button>

          <div className="flex items-center gap-2 border-l border-slate-200 pl-3">
            <UserCircle2 className="h-7 w-7 text-slate-400" />
            <div className="hidden sm:block text-left">
              <div className="text-xs font-semibold text-slate-800 leading-tight">
                Оператор А2
              </div>
              <div className="text-[10px] text-slate-400 font-mono">
                Смена: 08:00–20:00
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};
