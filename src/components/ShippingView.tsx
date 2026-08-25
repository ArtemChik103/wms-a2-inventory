import React from 'react';
import { ArrowUpRight, CheckCircle2, Clock, Truck, FileCheck2, User } from 'lucide-react';

interface OutboundOrder {
  id: string;
  orderNumber: string;
  destination: string;
  carrier: string;
  packagesCount: number;
  status: 'Формирование' | 'Собран' | 'Отгружен' | 'В пути';
  dispatchTime: string;
  driver: string;
}

const SAMPLE_SHIPPING: OutboundOrder[] = [
  {
    id: 'shp-1',
    orderNumber: 'ОТГ-8012',
    destination: 'СЦ Маркетплейс Коледино',
    carrier: 'WB Логистика',
    packagesCount: 148,
    status: 'Отгружен',
    dispatchTime: '25.08.2026 14:00',
    driver: 'Сидоров М. (А148УМ)',
  },
  {
    id: 'shp-2',
    orderNumber: 'ОТГ-8013',
    destination: 'Хаб Санкт-Петербург Шушары',
    carrier: 'Деловые Линии',
    packagesCount: 65,
    status: 'Собран',
    dispatchTime: '25.08.2026 16:30',
    driver: 'Григорьев П. (В902ВК)',
  },
  {
    id: 'shp-3',
    orderNumber: 'ОТГ-8014',
    destination: 'Экспресс Доставка Город',
    carrier: 'СДЭК Курьер',
    packagesCount: 12,
    status: 'Формирование',
    dispatchTime: '25.08.2026 18:00',
    driver: 'Назначение водителя...',
  },
];

export const ShippingView: React.FC<{ onBackToGoods: () => void }> = ({ onBackToGoods }) => {
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
            Отгрузка и логистика
          </h1>
          <p className="mt-1 text-xs sm:text-sm text-slate-500">
            Контроль комплектации заказов, упаковка паллет и отправка транспортным компаниям
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
          <div className="text-xs text-slate-500">Заказов на отгрузку</div>
          <div className="mt-1 font-mono text-2xl font-bold text-slate-900">3</div>
        </div>
        <div className="rounded-xl border border-amber-200 bg-amber-50/40 p-4 shadow-2xs">
          <div className="text-xs text-amber-700 font-medium">На комплектации</div>
          <div className="mt-1 font-mono text-2xl font-bold text-amber-800">1</div>
        </div>
        <div className="rounded-xl border border-blue-200 bg-blue-50/40 p-4 shadow-2xs">
          <div className="text-xs text-blue-700 font-medium">Готовы к загрузке</div>
          <div className="mt-1 font-mono text-2xl font-bold text-blue-800">1</div>
        </div>
        <div className="rounded-xl border border-emerald-200 bg-emerald-50/40 p-4 shadow-2xs">
          <div className="text-xs text-emerald-700 font-medium">Отправлено рейсов</div>
          <div className="mt-1 font-mono text-2xl font-bold text-emerald-800">1</div>
        </div>
      </div>

      {/* Outbound Table */}
      <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-2xs">
        <div className="border-b border-slate-200 bg-slate-50/75 px-5 py-3.5 flex items-center justify-between">
          <div className="flex items-center gap-2 font-semibold text-slate-800 text-sm">
            <ArrowUpRight className="h-4 w-4 text-emerald-600" />
            <span>План отгрузки на сегодня</span>
          </div>
          <span className="text-xs text-slate-400 font-mono">Контроль ворот: Онлайн</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm border-collapse">
            <thead>
              <tr className="border-b border-slate-200 bg-slate-50/50 text-xs font-semibold text-slate-600 uppercase tracking-wider">
                <th className="py-3.5 pl-5 pr-3">Номер рейса</th>
                <th className="py-3.5 px-3">Направление</th>
                <th className="py-3.5 px-3">Перевозчик / Водитель</th>
                <th className="py-3.5 px-3">Мест (коробов)</th>
                <th className="py-3.5 px-3">Время отгрузки</th>
                <th className="py-3.5 pl-3 pr-5 text-right">Статус</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 bg-white">
              {SAMPLE_SHIPPING.map((s) => (
                <tr key={s.id} className="hover:bg-slate-50/70 transition-colors">
                  <td className="py-4 pl-5 pr-3 font-mono text-xs font-bold text-emerald-700">
                    <div className="flex items-center gap-1.5">
                      <FileCheck2 className="h-3.5 w-3.5 text-slate-400" />
                      <span>{s.orderNumber}</span>
                    </div>
                  </td>
                  <td className="py-4 px-3 font-medium text-slate-900">{s.destination}</td>
                  <td className="py-4 px-3 text-slate-600 text-xs">
                    <div className="font-medium text-slate-800">{s.carrier}</div>
                    <div className="text-[11px] text-slate-400 flex items-center gap-1 mt-0.5">
                      <User className="h-3 w-3" />
                      {s.driver}
                    </div>
                  </td>
                  <td className="py-4 px-3">
                    <span className="inline-flex items-center gap-1 rounded bg-slate-100 px-2 py-0.5 font-mono text-xs text-slate-700">
                      <Truck className="h-3 w-3 text-slate-400" />
                      {s.packagesCount} кор.
                    </span>
                  </td>
                  <td className="py-4 px-3 font-mono text-xs text-slate-500">{s.dispatchTime}</td>
                  <td className="py-4 pl-3 pr-5 text-right">
                    <span
                      className={`inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-xs font-medium border ${
                        s.status === 'Отгружен'
                          ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                          : s.status === 'Собран'
                          ? 'bg-blue-50 text-blue-700 border-blue-200'
                          : 'bg-amber-50 text-amber-700 border-amber-200'
                      }`}
                    >
                      {s.status === 'Отгружен' ? (
                        <CheckCircle2 className="h-3 w-3" />
                      ) : (
                        <Clock className="h-3 w-3" />
                      )}
                      <span>{s.status}</span>
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
