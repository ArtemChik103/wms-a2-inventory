import React from 'react';
import { ArrowDownLeft, CheckCircle2, Clock, Truck, FileText } from 'lucide-react';

interface ReceivingOrder {
  id: string;
  docNumber: string;
  supplier: string;
  itemsCount: number;
  totalQuantity: number;
  status: 'В пути' | 'Идет приемка' | 'Принято' | 'На контроле';
  arrivalDate: string;
  dock: string;
}

const SAMPLE_RECEIVING: ReceivingOrder[] = [
  {
    id: 'rec-1',
    docNumber: 'ПР-2026-0841',
    supplier: 'ООО ТекстильПром',
    itemsCount: 3,
    totalQuantity: 350,
    status: 'Идет приемка',
    arrivalDate: '25.08.2026 11:00',
    dock: 'Ворота #3',
  },
  {
    id: 'rec-2',
    docNumber: 'ПР-2026-0842',
    supplier: 'Фабрика ОбувьСпорт',
    itemsCount: 1,
    totalQuantity: 90,
    status: 'На контроле',
    arrivalDate: '25.08.2026 13:30',
    dock: 'Ворота #1',
  },
  {
    id: 'rec-3',
    docNumber: 'ПР-2026-0843',
    supplier: 'ИП Аксессуары Маркет',
    itemsCount: 4,
    totalQuantity: 120,
    status: 'Принято',
    arrivalDate: '25.08.2026 09:15',
    dock: 'Ворота #2',
  },
  {
    id: 'rec-4',
    docNumber: 'ПР-2026-0844',
    supplier: 'Глобал Снабжение',
    itemsCount: 8,
    totalQuantity: 640,
    status: 'В пути',
    arrivalDate: '25.08.2026 17:00',
    dock: 'Ворота #4',
  },
];

export const ReceivingView: React.FC<{ onBackToGoods: () => void }> = ({ onBackToGoods }) => {
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
            Приёмка товаров
          </h1>
          <p className="mt-1 text-xs sm:text-sm text-slate-500">
            Входящие поставки, регистрация партий и распределение по ячейкам хранения
          </p>
        </div>

        <button
          type="button"
          onClick={onBackToGoods}
          className="inline-flex items-center gap-1.5 rounded-xl border border-slate-200 bg-white px-3.5 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-50 transition-colors shadow-2xs self-start sm:self-auto"
        >
          ← Вернуться к Товарам
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-2xs">
          <div className="text-xs text-slate-500">Поставок сегодня</div>
          <div className="mt-1 font-mono text-2xl font-bold text-slate-900">4</div>
        </div>
        <div className="rounded-xl border border-blue-200 bg-blue-50/40 p-4 shadow-2xs">
          <div className="text-xs text-blue-700 font-medium">В процессе разгрузки</div>
          <div className="mt-1 font-mono text-2xl font-bold text-blue-800">1</div>
        </div>
        <div className="rounded-xl border border-amber-200 bg-amber-50/40 p-4 shadow-2xs">
          <div className="text-xs text-amber-700 font-medium">Контроль ОТК</div>
          <div className="mt-1 font-mono text-2xl font-bold text-amber-800">1</div>
        </div>
        <div className="rounded-xl border border-emerald-200 bg-emerald-50/40 p-4 shadow-2xs">
          <div className="text-xs text-emerald-700 font-medium">Принято на баланс</div>
          <div className="mt-1 font-mono text-2xl font-bold text-emerald-800">1</div>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-2xs">
        <div className="border-b border-slate-200 bg-slate-50/75 px-5 py-3.5 flex items-center justify-between">
          <div className="flex items-center gap-2 font-semibold text-slate-800 text-sm">
            <ArrowDownLeft className="h-4 w-4 text-blue-600" />
            <span>Журнал входящих накладных</span>
          </div>
          <span className="text-xs text-slate-400 font-mono">Обновление: 1 мин назад</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm border-collapse">
            <thead>
              <tr className="border-b border-slate-200 bg-slate-50/50 text-xs font-semibold text-slate-600 uppercase tracking-wider">
                <th className="py-3.5 pl-5 pr-3">Номер документа</th>
                <th className="py-3.5 px-3">Поставщик</th>
                <th className="py-3.5 px-3">Позиций / Кол-во</th>
                <th className="py-3.5 px-3">Док / Ворота</th>
                <th className="py-3.5 px-3">Время прибытия</th>
                <th className="py-3.5 pl-3 pr-5 text-right">Статус</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 bg-white">
              {SAMPLE_RECEIVING.map((r) => (
                <tr key={r.id} className="hover:bg-slate-50/70 transition-colors">
                  <td className="py-4 pl-5 pr-3 font-mono text-xs font-bold text-blue-700">
                    <div className="flex items-center gap-1.5">
                      <FileText className="h-3.5 w-3.5 text-slate-400" />
                      <span>{r.docNumber}</span>
                    </div>
                  </td>
                  <td className="py-4 px-3 font-medium text-slate-900">{r.supplier}</td>
                  <td className="py-4 px-3 text-slate-600 text-xs">
                    {r.itemsCount} SKU ({r.totalQuantity} ед.)
                  </td>
                  <td className="py-4 px-3">
                    <span className="inline-flex items-center gap-1 rounded bg-slate-100 px-2 py-0.5 font-mono text-xs text-slate-700">
                      <Truck className="h-3 w-3 text-slate-400" />
                      {r.dock}
                    </span>
                  </td>
                  <td className="py-4 px-3 font-mono text-xs text-slate-500">{r.arrivalDate}</td>
                  <td className="py-4 pl-3 pr-5 text-right">
                    <span
                      className={`inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-xs font-medium border ${
                        r.status === 'Принято'
                          ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                          : r.status === 'Идет приемка'
                          ? 'bg-blue-50 text-blue-700 border-blue-200'
                          : r.status === 'На контроле'
                          ? 'bg-amber-50 text-amber-700 border-amber-200'
                          : 'bg-slate-50 text-slate-600 border-slate-200'
                      }`}
                    >
                      {r.status === 'Принято' ? (
                        <CheckCircle2 className="h-3 w-3" />
                      ) : (
                        <Clock className="h-3 w-3" />
                      )}
                      <span>{r.status}</span>
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
