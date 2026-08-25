import React, { useState } from 'react';
import type { InventoryItem, SortField, SortOrder } from '../types';
import { StatusBadge } from './StatusBadge';

import {
  ArrowUpDown,
  ArrowUp,
  ArrowDown,
  ExternalLink,
  MapPin,
  Copy,
  Check,
  PackageSearch,
} from 'lucide-react';

interface InventoryTableProps {
  items: InventoryItem[];
  sortField: SortField;
  sortOrder: SortOrder;
  onSort: (field: SortField) => void;
  onOpenItem: (item: InventoryItem) => void;
  onResetFilter?: () => void;
}

export const InventoryTable: React.FC<InventoryTableProps> = ({
  items,
  sortField,
  sortOrder,
  onSort,
  onOpenItem,
  onResetFilter,
}) => {
  const [copiedSku, setCopiedSku] = useState<string | null>(null);

  const handleCopySku = (e: React.MouseEvent, sku: string) => {
    e.stopPropagation();
    navigator.clipboard.writeText(sku);
    setCopiedSku(sku);
    setTimeout(() => setCopiedSku(null), 1500);
  };

  const renderSortIcon = (field: SortField) => {
    if (sortField !== field) {
      return <ArrowUpDown className="h-3.5 w-3.5 text-slate-300 group-hover:text-slate-500" />;
    }
    return sortOrder === 'asc' ? (
      <ArrowUp className="h-3.5 w-3.5 text-blue-600" />
    ) : (
      <ArrowDown className="h-3.5 w-3.5 text-blue-600" />
    );
  };

  if (items.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-slate-300 bg-white p-12 text-center shadow-2xs">
        <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-slate-100 text-slate-400">
          <PackageSearch className="h-7 w-7" />
        </div>
        <h3 className="mt-4 text-base font-semibold text-slate-900">
          Товары не найдены
        </h3>
        <p className="mt-1 max-w-sm text-xs text-slate-500">
          По текущему поисковому запросу или фильтру статуса на складе ничего не обнаружено.
        </p>
        {onResetFilter && (
          <button
            type="button"
            onClick={onResetFilter}
            className="mt-4 inline-flex items-center rounded-lg bg-blue-600 px-3.5 py-2 text-xs font-semibold text-white hover:bg-blue-700 transition-colors shadow-2xs"
          >
            Сбросить фильтры
          </button>
        )}
      </div>
    );
  }

  return (
    <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-2xs">
      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm border-collapse">
          <thead>
            <tr className="border-b border-slate-200 bg-slate-50/75 text-xs font-semibold text-slate-600 uppercase tracking-wider">
              {/* SKU */}
              <th scope="col" className="py-3.5 pl-5 pr-3">
                <button
                  type="button"
                  onClick={() => onSort('sku')}
                  className="group inline-flex items-center gap-1.5 hover:text-slate-900 focus:outline-none"
                >
                  <span>SKU</span>
                  {renderSortIcon('sku')}
                </button>
              </th>

              {/* Товар */}
              <th scope="col" className="py-3.5 px-3">
                <button
                  type="button"
                  onClick={() => onSort('name')}
                  className="group inline-flex items-center gap-1.5 hover:text-slate-900 focus:outline-none"
                >
                  <span>Товар</span>
                  {renderSortIcon('name')}
                </button>
              </th>

              {/* Ячейка */}
              <th scope="col" className="py-3.5 px-3">
                <button
                  type="button"
                  onClick={() => onSort('cell')}
                  className="group inline-flex items-center gap-1.5 hover:text-slate-900 focus:outline-none"
                >
                  <span>Ячейка</span>
                  {renderSortIcon('cell')}
                </button>
              </th>

              {/* Статус */}
              <th scope="col" className="py-3.5 px-3">
                <button
                  type="button"
                  onClick={() => onSort('status')}
                  className="group inline-flex items-center gap-1.5 hover:text-slate-900 focus:outline-none"
                >
                  <span>Статус</span>
                  {renderSortIcon('status')}
                </button>
              </th>

              {/* Действия */}
              <th scope="col" className="py-3.5 pl-3 pr-5 text-right font-medium">
                Действия
              </th>
            </tr>
          </thead>

          <tbody className="divide-y divide-slate-100 bg-white">
            {items.map((item) => (
              <tr
                key={item.id}
                onClick={() => onOpenItem(item)}
                className="group cursor-pointer transition-colors hover:bg-blue-50/30"
              >
                {/* SKU */}
                <td className="py-4 pl-5 pr-3 whitespace-nowrap">
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-xs font-bold text-slate-800 bg-slate-100/90 px-2 py-0.5 rounded border border-slate-200">
                      {item.sku}
                    </span>
                    <button
                      type="button"
                      onClick={(e) => handleCopySku(e, item.sku)}
                      className="rounded p-1 text-slate-400 opacity-0 group-hover:opacity-100 hover:bg-slate-200 hover:text-slate-700 transition-all focus:opacity-100 focus:outline-none"
                      title="Скопировать SKU"
                      aria-label={`Скопировать SKU ${item.sku}`}
                    >
                      {copiedSku === item.sku ? (
                        <Check className="h-3.5 w-3.5 text-emerald-600" />
                      ) : (
                        <Copy className="h-3.5 w-3.5" />
                      )}
                    </button>
                  </div>
                </td>

                {/* Товар */}
                <td className="py-4 px-3">
                  <div className="flex flex-col">
                    <span className="font-medium text-slate-900 group-hover:text-blue-600 transition-colors">
                      {item.name}
                    </span>
                    <span className="text-xs text-slate-500">
                      {item.category} · {item.quantity} {item.unit}
                    </span>
                  </div>
                </td>

                {/* Ячейка */}
                <td className="py-4 px-3 whitespace-nowrap">
                  <div className="inline-flex items-center gap-1.5 font-mono text-xs font-medium text-slate-700 bg-slate-50 px-2.5 py-1 rounded-md border border-slate-200/80">
                    <MapPin className="h-3.5 w-3.5 text-slate-400" />
                    <span>{item.cell}</span>
                  </div>
                </td>

                {/* Статус */}
                <td className="py-4 px-3 whitespace-nowrap">
                  <StatusBadge status={item.status} />
                </td>

                {/* Действие Открыть */}
                <td className="py-4 pl-3 pr-5 text-right whitespace-nowrap">
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      onOpenItem(item);
                    }}
                    className="inline-flex items-center gap-1.5 rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-xs font-semibold text-slate-700 shadow-2xs hover:border-blue-400 hover:bg-blue-50/50 hover:text-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                  >
                    <span>Открыть</span>
                    <ExternalLink className="h-3.5 w-3.5 opacity-70" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Нижняя информационная строка таблицы */}
      <div className="flex items-center justify-between border-t border-slate-200 bg-slate-50/50 px-5 py-3 text-xs text-slate-500">

        <div>
          Отображено строк: <span className="font-mono font-semibold text-slate-700">{items.length}</span>
        </div>
        <div className="text-[11px] text-slate-400">
          Нажмите на строку или кнопку «Открыть» для подробной информации
        </div>
      </div>
    </div>
  );
};
