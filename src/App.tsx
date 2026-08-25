import { useState, useMemo } from 'react';
import type { InventoryItem, ItemStatus, SortField, SortOrder } from './types';
import { INITIAL_ITEMS } from './data';

import { Header, type MainTab } from './components/Header';
import { StatsBar } from './components/StatsBar';
import { SearchBar } from './components/SearchBar';
import { InventoryTable } from './components/InventoryTable';
import { ProductDetailModal } from './components/ProductDetailModal';
import { ReceivingView } from './components/ReceivingView';
import { ShippingView } from './components/ShippingView';
import { StorageCellsView } from './components/StorageCellsView';
import { Plus, Check, RefreshCw } from 'lucide-react';

export function App() {
  const [activeTab, setActiveTab] = useState<MainTab>('goods');
  const [items, setItems] = useState<InventoryItem[]>(() => {
    const saved = localStorage.getItem('wms_a2_inventory');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch {
        return INITIAL_ITEMS;
      }
    }
    return INITIAL_ITEMS;
  });

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedStatus, setSelectedStatus] = useState<ItemStatus | 'all'>('all');
  const [sortField, setSortField] = useState<SortField>('sku');
  const [sortOrder, setSortOrder] = useState<SortOrder>('asc');
  const [selectedItem, setSelectedItem] = useState<InventoryItem | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Save to localStorage on update
  const updateItemsAndPersist = (newItems: InventoryItem[]) => {
    setItems(newItems);
    localStorage.setItem('wms_a2_inventory', JSON.stringify(newItems));
  };

  const showToast = (message: string) => {
    setToastMessage(message);
    setTimeout(() => {
      setToastMessage(null);
    }, 2500);
  };

  // Status update handler for item modal
  const handleUpdateStatus = (id: string, newStatus: ItemStatus) => {
    const updated = items.map((item) =>
      item.id === id ? { ...item, status: newStatus, updatedAt: 'Только что' } : item
    );
    updateItemsAndPersist(updated);
    if (selectedItem && selectedItem.id === id) {
      setSelectedItem({ ...selectedItem, status: newStatus, updatedAt: 'Только что' });
    }
    showToast(`Статус товара изменен на «${newStatus}»`);
  };

  // Sorting handler
  const handleSort = (field: SortField) => {
    if (sortField === field) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortOrder('asc');
    }
  };

  // Filtering and sorting items
  const filteredAndSortedItems = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();

    const filtered = items.filter((item) => {
      // Status filter
      if (selectedStatus !== 'all' && item.status !== selectedStatus) {
        return false;
      }

      // Search filter (name, SKU, category, cell)
      if (query) {
        const matchesName = item.name.toLowerCase().includes(query);
        const matchesSku = item.sku.toLowerCase().includes(query);
        const matchesCategory = item.category.toLowerCase().includes(query);
        const matchesCell = item.cell.toLowerCase().includes(query);
        return matchesName || matchesSku || matchesCategory || matchesCell;
      }

      return true;
    });

    return [...filtered].sort((a, b) => {
      let valA: string | number = a[sortField];
      let valB: string | number = b[sortField];

      if (typeof valA === 'string') {
        valA = valA.toLowerCase();
        valB = (valB as string).toLowerCase();
      }

      if (valA < valB) return sortOrder === 'asc' ? -1 : 1;
      if (valA > valB) return sortOrder === 'asc' ? 1 : -1;
      return 0;
    });
  }, [items, searchQuery, selectedStatus, sortField, sortOrder]);

  const handleResetFilters = () => {
    setSearchQuery('');
    setSelectedStatus('all');
    showToast('Фильтры сброшены');
  };

  const handleResetInitialData = () => {
    updateItemsAndPersist(INITIAL_ITEMS);
    setSearchQuery('');
    setSelectedStatus('all');
    showToast('Данные склада восстановлены к начальным');
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col text-slate-900 font-sans selection:bg-blue-600 selection:text-white">
      {/* Header */}
      <Header
        totalItemsCount={items.length}
        activeTab={activeTab}
        onTabChange={(tab) => {
          setActiveTab(tab);
        }}
      />

      {/* Main Content Area */}
      <main className="flex-1 mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8 py-6 space-y-6">
        {activeTab === 'receiving' && (
          <ReceivingView onBackToGoods={() => setActiveTab('goods')} />
        )}

        {activeTab === 'shipping' && (
          <ShippingView onBackToGoods={() => setActiveTab('goods')} />
        )}

        {activeTab === 'cells' && (
          <StorageCellsView onBackToGoods={() => setActiveTab('goods')} />
        )}

        {activeTab === 'goods' && (
          <>
            {/* Page Title and Action Bar */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div>
                <h1 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
                  Товары на складе
                </h1>
                <p className="mt-1 text-xs sm:text-sm text-slate-500">
                  Учет номенклатуры, адресное хранение и оперативные статусы заказов
                </p>
              </div>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={handleResetInitialData}
                  className="inline-flex items-center gap-1.5 rounded-xl border border-slate-200 bg-white px-3 py-2 text-xs font-medium text-slate-600 hover:bg-slate-50 hover:text-slate-900 transition-colors shadow-2xs"
                  title="Сбросить тестовые данные"
                >
                  <RefreshCw className="h-3.5 w-3.5 text-slate-400" />
                  <span>Сброс данных</span>
                </button>

                <button
                  type="button"
                  onClick={() => {
                    const nextSkuNum = items.length + 1;
                    const padded = String(nextSkuNum).padStart(3, '0');
                    const newItem: InventoryItem = {
                      id: String(Date.now()),
                      sku: `WB-${padded}`,
                      name: `Новая позиция #${padded}`,
                      category: 'Разное',
                      cell: `A-01-${padded.slice(-2)}`,
                      zone: 'Зона A (Основная)',
                      status: 'На хранении',
                      quantity: 50,
                      unit: 'шт.',
                      barcode: `460718293${padded}0`,
                      updatedAt: 'Только что',
                      weightKg: 0.5,
                      description: 'Позиция добавлена через терминал оператора.',
                      history: [
                        {
                          time: 'Только что',
                          event: 'Создана карточка товара',
                          user: 'Оператор А2',
                        },
                      ],
                    };
                    updateItemsAndPersist([newItem, ...items]);
                    setSelectedItem(newItem);
                    showToast(`Добавлен товар ${newItem.sku}`);
                  }}
                  className="inline-flex items-center gap-1.5 rounded-xl bg-blue-600 px-3.5 py-2 text-xs font-semibold text-white hover:bg-blue-700 active:bg-blue-800 transition-colors shadow-2xs"
                >
                  <Plus className="h-4 w-4" />
                  <span>Добавить SKU</span>
                </button>
              </div>
            </div>

            {/* Stats Summary Bar */}
            <StatsBar
              items={items}
              selectedStatus={selectedStatus}
              onSelectStatus={(st) => setSelectedStatus(st)}
            />

            {/* Search & Filter Toolbar */}
            <SearchBar
              searchQuery={searchQuery}
              onSearchChange={setSearchQuery}
              selectedStatus={selectedStatus}
              onStatusChange={setSelectedStatus}
              resultsCount={filteredAndSortedItems.length}
              totalCount={items.length}
              onReset={handleResetFilters}
            />

            {/* Inventory Data Table */}
            <InventoryTable
              items={filteredAndSortedItems}
              sortField={sortField}
              sortOrder={sortOrder}
              onSort={handleSort}
              onOpenItem={(item) => setSelectedItem(item)}
              onResetFilter={handleResetFilters}
            />
          </>
        )}
      </main>

      {/* Product Detail Modal */}
      <ProductDetailModal
        item={selectedItem}
        onClose={() => setSelectedItem(null)}
        onUpdateStatus={handleUpdateStatus}
      />

      {/* Toast Feedback Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 flex items-center gap-2 rounded-xl border border-slate-800 bg-slate-900 px-4 py-3 text-xs font-medium text-white shadow-xl animate-in slide-in-from-bottom-4 duration-150">
          <Check className="h-4 w-4 text-emerald-400" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* System Footer */}
      <footer className="border-t border-slate-200 bg-white py-4 mt-auto">
        <div className="mx-auto flex max-w-7xl flex-col sm:flex-row items-center justify-between px-4 sm:px-6 lg:px-8 text-xs text-slate-500 gap-2">
          <div className="flex items-center gap-2">
            <span className="font-bold font-mono text-slate-700">WMS А2</span>
            <span>·</span>
            <span>Система управления складом</span>
          </div>
          <div className="flex items-center gap-4 text-slate-400 text-[11px]">
            <span>
              Горячая клавиша:{' '}
              <kbd className="font-mono bg-slate-100 px-1 py-0.5 rounded border border-slate-200">
                /
              </kbd>{' '}
              (поиск)
            </span>
            <span>·</span>
            <span>Тестовое задание Web-разработчик</span>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;

