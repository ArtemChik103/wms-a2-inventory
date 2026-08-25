import React, { useState } from 'react';
import { Package, Warehouse, Activity, Bell, UserCircle2, Clock } from 'lucide-react';


export type MainTab = 'goods' | 'receiving' | 'shipping' | 'cells';

interface HeaderProps {
  totalItemsCount: number;
  activeTab: MainTab;
  onTabChange: (tab: MainTab) => void;
}

const NOTIFICATIONS = [
  {
    id: 'n-1',
    title: 'Заказ #4912 передан на сборку',
    desc: 'Товар: WB-003 Рюкзак (ячейка B-05-02)',
    time: '5 мин назад',
    unread: true,
  },
  {
    id: 'n-2',
    title: 'Поставка ПР-0841 прибыла на ворота #3',
    desc: 'ООО ТекстильПром (350 ед.)',
    time: '25 мин назад',
    unread: true,
  },
  {
    id: 'n-3',
    title: 'Инвентаризация ряда B-03 завершена',
    desc: 'Расхождений не выявлено',
    time: '1 час назад',
    unread: false,
  },
];

export const Header: React.FC<HeaderProps> = ({
  totalItemsCount,
  activeTab,
  onTabChange,
}) => {
  const [showNotifications, setShowNotifications] = useState(false);

  return (
    <header className="sticky top-0 z-30 border-b border-slate-200/90 bg-white/90 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Left: Brand and Active Section */}
        <div className="flex items-center gap-6">
          <div
            className="flex items-center gap-2.5 cursor-pointer"
            onClick={() => onTabChange('goods')}
          >
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
          <nav className="flex items-center gap-1.5" aria-label="Разделы системы">
            {/* Товары */}
            <button
              type="button"
              onClick={() => onTabChange('goods')}
              className={`flex items-center gap-2 rounded-lg px-3 py-1.5 text-sm font-semibold transition-all cursor-pointer ${
                activeTab === 'goods'
                  ? 'bg-blue-50/90 text-blue-700 ring-1 ring-blue-500/25 shadow-2xs'
                  : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
              }`}
            >
              <span
                className={`h-2 w-2 rounded-full ${
                  activeTab === 'goods' ? 'bg-blue-600' : 'bg-slate-300'
                }`}
              />
              <span>Товары</span>
              <span
                className={`rounded-full px-1.5 py-0.2 font-mono text-xs font-bold ${
                  activeTab === 'goods'
                    ? 'bg-blue-200/70 text-blue-800'
                    : 'bg-slate-200/80 text-slate-700'
                }`}
              >
                {totalItemsCount}
              </span>
            </button>

            {/* Приёмка */}
            <button
              type="button"
              onClick={() => onTabChange('receiving')}
              className={`hidden sm:flex items-center gap-2 rounded-lg px-3 py-1.5 text-sm font-medium transition-all cursor-pointer ${
                activeTab === 'receiving'
                  ? 'bg-blue-50/90 text-blue-700 ring-1 ring-blue-500/25 font-semibold shadow-2xs'
                  : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
              }`}
            >
              <span>Приёмка</span>
              <span className="rounded-full bg-slate-100 px-1.5 py-0.2 font-mono text-[11px] text-slate-500">
                4
              </span>
            </button>

            {/* Отгрузка */}
            <button
              type="button"
              onClick={() => onTabChange('shipping')}
              className={`hidden sm:flex items-center gap-2 rounded-lg px-3 py-1.5 text-sm font-medium transition-all cursor-pointer ${
                activeTab === 'shipping'
                  ? 'bg-blue-50/90 text-blue-700 ring-1 ring-blue-500/25 font-semibold shadow-2xs'
                  : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
              }`}
            >
              <span>Отгрузка</span>
              <span className="rounded-full bg-slate-100 px-1.5 py-0.2 font-mono text-[11px] text-slate-500">
                3
              </span>
            </button>

            {/* Ячейки */}
            <button
              type="button"
              onClick={() => onTabChange('cells')}
              className={`hidden sm:flex items-center gap-2 rounded-lg px-3 py-1.5 text-sm font-medium transition-all cursor-pointer ${
                activeTab === 'cells'
                  ? 'bg-blue-50/90 text-blue-700 ring-1 ring-blue-500/25 font-semibold shadow-2xs'
                  : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
              }`}
            >
              <span>Ячейки</span>
            </button>
          </nav>
        </div>

        {/* Right: Warehouse status and Operator profile */}
        <div className="flex items-center gap-3 relative">
          <div className="hidden lg:flex items-center gap-2 rounded-lg border border-slate-200 bg-slate-50 px-3 py-1.5 text-xs text-slate-600">
            <Warehouse className="h-3.5 w-3.5 text-slate-400" />
            <span className="font-medium">Склад Север (Терминал 1)</span>
            <span className="flex items-center gap-1 text-emerald-600 font-medium">
              <Activity className="h-3 w-3" />
              Онлайн
            </span>
          </div>

          {/* Notifications button with popup */}
          <div className="relative">
            <button
              type="button"
              onClick={() => setShowNotifications(!showNotifications)}
              className="relative rounded-lg p-2 text-slate-500 hover:bg-slate-100 hover:text-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer"
              title="Уведомления склада"
              aria-label="Уведомления склада"
            >
              <Bell className="h-4 w-4" />
              <span className="absolute top-1.5 right-1.5 h-2 w-2 rounded-full bg-amber-500 ring-2 ring-white" />
            </button>

            {showNotifications && (
              <div className="absolute right-0 mt-2 w-80 rounded-2xl border border-slate-200 bg-white p-3 shadow-xl z-50 animate-in fade-in zoom-in-95 duration-100">
                <div className="flex items-center justify-between border-b border-slate-100 pb-2 mb-2">
                  <span className="text-xs font-bold text-slate-800">
                    События склада
                  </span>
                  <span className="rounded bg-blue-50 px-1.5 py-0.5 text-[10px] font-semibold text-blue-700">
                    2 новых
                  </span>
                </div>
                <div className="space-y-2">
                  {NOTIFICATIONS.map((n) => (
                    <div
                      key={n.id}
                      className={`rounded-xl p-2.5 text-xs transition-colors ${
                        n.unread ? 'bg-blue-50/50 border border-blue-100' : 'bg-slate-50'
                      }`}
                    >
                      <div className="font-semibold text-slate-800 leading-tight">
                        {n.title}
                      </div>
                      <div className="text-[11px] text-slate-500 mt-0.5">
                        {n.desc}
                      </div>
                      <div className="text-[10px] text-slate-400 mt-1 flex items-center gap-1 font-mono">
                        <Clock className="h-3 w-3" />
                        {n.time}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

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

