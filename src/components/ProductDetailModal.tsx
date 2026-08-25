import React, { useEffect, useState } from 'react';
import type { InventoryItem, ItemStatus } from '../types';
import { StatusBadge } from './StatusBadge';
import {
  X,
  MapPin,
  Barcode,
  Clock,
  Printer,
  Layers,
} from 'lucide-react';


interface ProductDetailModalProps {
  item: InventoryItem | null;
  onClose: () => void;
  onUpdateStatus?: (id: string, newStatus: ItemStatus) => void;
}

const ALL_STATUSES: ItemStatus[] = [
  'Готов к отгрузке',
  'На хранении',
  'На сборке',
  'Списан',
];

export const ProductDetailModal: React.FC<ProductDetailModalProps> = ({
  item,
  onClose,
  onUpdateStatus,
}) => {
  const [copiedBarcode, setCopiedBarcode] = useState(false);
  const [printSuccess, setPrintSuccess] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  if (!item) return null;

  const handleCopyBarcode = () => {
    navigator.clipboard.writeText(item.barcode);
    setCopiedBarcode(true);
    setTimeout(() => setCopiedBarcode(false), 1500);
  };

  const handlePrint = () => {
    setPrintSuccess(true);
    setTimeout(() => setPrintSuccess(false), 2000);
  };

  // Разбор структуры адреса ячейки (например: A-14-02 -> Зона A, Стеллаж 14, Полка 02)
  const cellParts = item.cell.split('-');
  const zoneLetter = cellParts[0] || 'A';
  const rackNum = cellParts[1] || '01';
  const tierNum = cellParts[2] || '01';

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-xs animate-in fade-in duration-150"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-xl rounded-2xl bg-white shadow-2xl border border-slate-200 overflow-hidden animate-in zoom-in-95 duration-150"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Шапка модального окна */}
        <div className="flex items-start justify-between border-b border-slate-100 bg-slate-50/75 p-5">
          <div className="flex flex-col gap-1">
            <div className="flex items-center gap-2">
              <span className="rounded bg-blue-100 px-2 py-0.5 font-mono text-xs font-bold text-blue-800">
                {item.sku}
              </span>
              <span className="text-xs text-slate-500 font-medium">
                {item.category}
              </span>
            </div>
            <h2 className="text-lg font-bold text-slate-900 leading-tight">
              {item.name}
            </h2>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="rounded-lg p-1.5 text-slate-400 hover:bg-slate-200 hover:text-slate-700 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500"
            title="Закрыть (Esc)"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Тело модального окна */}
        <div className="max-h-[75vh] overflow-y-auto p-5 space-y-5">
          {/* Статус товара и быстрое переключение */}
          <div className="rounded-xl border border-slate-200/80 bg-slate-50/50 p-4">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-xs font-medium text-slate-500">
                  Текущий статус
                </div>
                <div className="mt-1">
                  <StatusBadge status={item.status} size="md" />
                </div>
              </div>

              {onUpdateStatus && (
                <div className="flex flex-col items-end">
                  <label htmlFor="status-select" className="text-[11px] text-slate-400 mb-1">
                    Сменить статус:
                  </label>
                  <select
                    id="status-select"
                    value={item.status}
                    onChange={(e) =>
                      onUpdateStatus(item.id, e.target.value as ItemStatus)
                    }
                    className="rounded-lg border border-slate-200 bg-white px-2.5 py-1 text-xs font-semibold text-slate-700 shadow-2xs focus:border-blue-500 focus:outline-none cursor-pointer"
                  >
                    {ALL_STATUSES.map((st) => (
                      <option key={st} value={st}>
                        {st}
                      </option>
                    ))}
                  </select>
                </div>
              )}
            </div>
          </div>

          {/* Складское размещение и параметры хранения */}
          <div>
            <h4 className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2.5">
              Складское размещение
            </h4>
            <div className="grid grid-cols-3 gap-2.5">
              <div className="rounded-xl border border-slate-200 bg-white p-3 text-center">
                <div className="text-[11px] text-slate-400 font-medium">Зона / Сектор</div>
                <div className="mt-1 font-mono text-base font-bold text-slate-800">
                  {zoneLetter}
                </div>
                <div className="text-[10px] text-slate-400 mt-0.5 truncate">
                  {item.zone}
                </div>
              </div>

              <div className="rounded-xl border border-slate-200 bg-white p-3 text-center">
                <div className="text-[11px] text-slate-400 font-medium">Стеллаж / Ряд</div>
                <div className="mt-1 font-mono text-base font-bold text-slate-800">
                  {rackNum}
                </div>
                <div className="text-[10px] text-slate-400 mt-0.5">
                  Уровень 2
                </div>
              </div>

              <div className="rounded-xl border border-blue-200 bg-blue-50/40 p-3 text-center">
                <div className="text-[11px] text-blue-600 font-medium">Ячейка хранения</div>
                <div className="mt-1 font-mono text-base font-bold text-blue-700 flex items-center justify-center gap-1">
                  <MapPin className="h-3.5 w-3.5" />
                  {item.cell}
                </div>
                <div className="text-[10px] text-blue-500 mt-0.5">
                  Полка {tierNum}
                </div>
              </div>
            </div>
          </div>

          {/* Остаток, штрихкод и параметры */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {/* Остаток на складе */}
            <div className="rounded-xl border border-slate-200 bg-white p-3.5">
              <div className="flex items-center justify-between text-xs text-slate-500">
                <span>Остаток в ячейке</span>
                <Layers className="h-3.5 w-3.5 text-slate-400" />
              </div>
              <div className="mt-1 flex items-baseline gap-1.5">
                <span className="font-mono text-2xl font-bold text-slate-900">
                  {item.quantity}
                </span>
                <span className="text-xs font-medium text-slate-600">
                  {item.unit}
                </span>
              </div>
              <div className="mt-1 text-[11px] text-slate-400">
                Вес ед.: {item.weightKg} кг
              </div>
            </div>

            {/* Штрихкод */}
            <div className="rounded-xl border border-slate-200 bg-white p-3.5">
              <div className="flex items-center justify-between text-xs text-slate-500">
                <span>Штрихкод (EAN-13)</span>
                <Barcode className="h-3.5 w-3.5 text-slate-400" />
              </div>
              <div className="mt-1 flex items-center justify-between">
                <span className="font-mono text-sm font-semibold text-slate-800 tracking-wider">
                  {item.barcode}
                </span>
                <button
                  type="button"
                  onClick={handleCopyBarcode}
                  className="rounded px-2 py-0.5 text-[11px] font-medium text-blue-600 bg-blue-50 hover:bg-blue-100"
                >
                  {copiedBarcode ? 'Скопировано' : 'Копия'}
                </button>
              </div>
              <div className="mt-1 text-[11px] text-slate-400">
                Обновлено: {item.updatedAt}
              </div>
            </div>
          </div>

          {/* Описание */}
          {item.description && (
            <div>
              <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1">
                Описание товара
              </div>
              <div className="rounded-xl bg-slate-50 p-3 text-xs text-slate-700 leading-relaxed border border-slate-200/60">
                {item.description}
              </div>
            </div>
          )}

          {/* История операций */}
          {item.history && item.history.length > 0 && (
            <div>
              <div className="flex items-center gap-1.5 text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">
                <Clock className="h-3.5 w-3.5" />
                <span>История перемещений</span>
              </div>
              <div className="space-y-2 border-l-2 border-slate-200 pl-3 ml-1.5">
                {item.history.map((h, i) => (
                  <div key={i} className="text-xs">
                    <div className="flex items-center gap-2 text-slate-500 font-mono text-[11px]">
                      <span>{h.time}</span>
                      <span>·</span>
                      <span className="font-sans font-medium text-slate-600">{h.user}</span>
                    </div>
                    <div className="text-slate-800 font-medium mt-0.5">
                      {h.event}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Кнопки действий в подвале модального окна */}
        <div className="flex items-center justify-between border-t border-slate-100 bg-slate-50/75 p-4">
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handlePrint}
              className="inline-flex items-center gap-1.5 rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-xs font-medium text-slate-700 hover:bg-slate-50 shadow-2xs transition-colors"
            >
              <Printer className="h-3.5 w-3.5 text-slate-500" />
              <span>{printSuccess ? 'Печать отправлена!' : 'Печать этикетки'}</span>
            </button>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="rounded-lg bg-slate-900 px-4 py-2 text-xs font-semibold text-white shadow-2xs hover:bg-slate-800 transition-colors focus:outline-none focus:ring-2 focus:ring-slate-900"
          >
            Закрыть карточку
          </button>
        </div>
      </div>
    </div>
  );
};
