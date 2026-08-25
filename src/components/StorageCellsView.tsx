import React, { useState } from 'react';
import { CheckCircle, Layers } from 'lucide-react';


interface StorageZone {
  zoneCode: string;
  name: string;
  totalCells: number;
  occupiedCells: number;
  racks: Array<{
    rackId: string;
    cells: Array<{ code: string; occupied: boolean; currentItem?: string }>;
  }>;
}

const STORAGE_ZONES: StorageZone[] = [
  {
    zoneCode: 'A',
    name: 'Зона A (Мезонин 1 — Легкий штучный товар)',
    totalCells: 24,
    occupiedCells: 18,
    racks: [
      {
        rackId: 'Ряд A-01..A-08',
        cells: [
          { code: 'A-02-05', occupied: true, currentItem: 'WB-006 Носки набор' },
          { code: 'A-02-06', occupied: false },
          { code: 'A-03-01', occupied: true, currentItem: 'Упаковка 100шт' },
          { code: 'A-04-02', occupied: true, currentItem: 'Пакеты курьерские' },
          { code: 'A-05-01', occupied: false },
          { code: 'A-06-03', occupied: true, currentItem: 'Спецодежда' },
        ],
      },
      {
        rackId: 'Ряд A-09..A-16',
        cells: [
          { code: 'A-12-04', occupied: true, currentItem: 'WB-004 Кепка (Брак)' },
          { code: 'A-13-01', occupied: false },
          { code: 'A-14-02', occupied: true, currentItem: 'WB-001 Футболка базовая' },
          { code: 'A-15-01', occupied: true, currentItem: 'Футболка поло' },
          { code: 'A-16-02', occupied: false },
          { code: 'A-16-03', occupied: true, currentItem: 'Лонгслив M' },
        ],
      },
    ],
  },
  {
    zoneCode: 'B',
    name: 'Зона B (Стеллажное хранение — Коробки и обувь)',
    totalCells: 30,
    occupiedCells: 22,
    racks: [
      {
        rackId: 'Ряд B-01..B-06',
        cells: [
          { code: 'B-03-01', occupied: true, currentItem: 'WB-002 Кроссовки' },
          { code: 'B-03-02', occupied: true, currentItem: 'Кеды низкие' },
          { code: 'B-04-01', occupied: false },
          { code: 'B-05-02', occupied: true, currentItem: 'WB-003 Рюкзак' },
          { code: 'B-06-01', occupied: true, currentItem: 'Сумка дорожная' },
          { code: 'B-06-02', occupied: false },
        ],
      },
      {
        rackId: 'Ряд B-07..B-12',
        cells: [
          { code: 'B-08-03', occupied: true, currentItem: 'WB-007 Куртка демисезонная' },
          { code: 'B-09-01', occupied: false },
          { code: 'B-10-02', occupied: true, currentItem: 'Ветровка спорт' },
          { code: 'B-11-01', occupied: true, currentItem: 'Жилет утепленный' },
          { code: 'B-12-02', occupied: false },
          { code: 'B-12-03', occupied: true, currentItem: 'Плащ влагозащитный' },
        ],
      },
    ],
  },
  {
    zoneCode: 'C',
    name: 'Зона C (Крупногабарит и паллетный ряд)',
    totalCells: 16,
    occupiedCells: 9,
    racks: [
      {
        rackId: 'Ряд C-01..C-04',
        cells: [
          { code: 'C-01-11', occupied: true, currentItem: 'WB-005 Худи оверсайз' },
          { code: 'C-02-01', occupied: true, currentItem: 'Паллета WB-BOX-4' },
          { code: 'C-03-01', occupied: false },
          { code: 'C-04-02', occupied: false },
        ],
      },
    ],
  },
];

export const StorageCellsView: React.FC<{ onBackToGoods: () => void }> = ({ onBackToGoods }) => {
  const [selectedZone, setSelectedZone] = useState<'A' | 'B' | 'C'>('A');

  const currentZone = STORAGE_ZONES.find((z) => z.zoneCode === selectedZone) || STORAGE_ZONES[0];
  const occupancyPercent = Math.round((currentZone.occupiedCells / currentZone.totalCells) * 100);

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
            Карта адресного хранения
          </h1>
          <p className="mt-1 text-xs sm:text-sm text-slate-500">
            Схема складских стеллажей, мониторинг занятости ячеек и оперативная топология
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

      {/* Zone Switcher */}
      <div className="flex items-center gap-2 border-b border-slate-200 pb-3">
        {STORAGE_ZONES.map((z) => (
          <button
            key={z.zoneCode}
            type="button"
            onClick={() => setSelectedZone(z.zoneCode as 'A' | 'B' | 'C')}
            className={`rounded-xl px-4 py-2 text-xs font-semibold transition-all shadow-2xs ${
              selectedZone === z.zoneCode
                ? 'bg-blue-600 text-white'
                : 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-50'
            }`}
          >
            Зона {z.zoneCode}
          </button>
        ))}
      </div>

      {/* Zone summary banner */}
      <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-2xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h3 className="text-base font-bold text-slate-900">{currentZone.name}</h3>
            <p className="text-xs text-slate-500 mt-0.5">
              Всего ячеек: {currentZone.totalCells} · Занято: {currentZone.occupiedCells} · Свободно: {currentZone.totalCells - currentZone.occupiedCells}
            </p>
          </div>

          <div className="flex items-center gap-3">
            <div className="text-right">
              <div className="text-xs text-slate-400">Заполненность</div>
              <div className="font-mono text-lg font-bold text-slate-900">
                {occupancyPercent}%
              </div>
            </div>
            <div className="h-10 w-24 rounded-full bg-slate-100 p-1 flex items-center">
              <div
                className={`h-full rounded-full transition-all ${
                  occupancyPercent > 80 ? 'bg-amber-500' : 'bg-blue-600'
                }`}
                style={{ width: `${occupancyPercent}%` }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Visual Racks */}
      <div className="space-y-4">
        {currentZone.racks.map((rack, idx) => (
          <div key={idx} className="rounded-2xl border border-slate-200 bg-white p-5 shadow-2xs">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3 mb-4">
              <div className="flex items-center gap-2 font-semibold text-slate-800 text-sm">
                <Layers className="h-4 w-4 text-blue-600" />
                <span>{rack.rackId}</span>
              </div>
              <span className="text-xs text-slate-400">
                {rack.cells.length} ячеек в блоке
              </span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3">
              {rack.cells.map((cell) => (
                <div
                  key={cell.code}
                  className={`flex flex-col justify-between rounded-xl border p-3 min-h-[90px] transition-all ${
                    cell.occupied
                      ? 'border-blue-200 bg-blue-50/50 hover:border-blue-400'
                      : 'border-dashed border-slate-300 bg-slate-50/70 hover:bg-slate-100'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-xs font-bold text-slate-800">
                      {cell.code}
                    </span>
                    {cell.occupied ? (
                      <CheckCircle className="h-3.5 w-3.5 text-blue-600" />
                    ) : (
                      <span className="h-2 w-2 rounded-full bg-slate-300" />
                    )}
                  </div>

                  <div className="mt-2 text-[11px] leading-tight">
                    {cell.occupied ? (
                      <span className="font-medium text-slate-700 line-clamp-2">
                        {cell.currentItem}
                      </span>
                    ) : (
                      <span className="text-slate-400 italic">Свободна</span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
