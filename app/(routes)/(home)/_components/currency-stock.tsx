// components/currency-stock.tsx
'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Package2, Pill, Syringe } from 'lucide-react';

interface StockItem {
  type: string;
  quantity: number;
  totalCost: number;
}

export function CurrencyStock() {
  // Stock data
  const stockData: StockItem[] = [
    { type: "BOTOX", quantity: 8311, totalCost: 361645.17 },
    { type: "FILLERS VOLUMA", quantity: 1807, totalCost: 130310.80 },
    { type: "FILLERS ULTRA4", quantity: 1470, totalCost: 79600.82 },
    { type: "FILLERS VOLITE", quantity: 1116, totalCost: 55130.95 },
    { type: "FILLERS VOLBELLA", quantity: 458, totalCost: 33016.45 },
    { type: "FILLERS VOLIFT", quantity: 173, totalCost: 12458.01 },
    { type: "EQUIPMENTS", quantity: 363, totalCost: 49210.32 }
  ];

  // Calculate totals
  const totalQuantity = stockData.reduce((sum, item) => sum + item.quantity, 0);
  const totalCost = stockData.reduce((sum, item) => sum + item.totalCost, 0);

  // Format currency in KWD
  const formatKWD = (amount: number) => {
    return new Intl.NumberFormat('en-KW', {
      style: 'currency',
      currency: 'KWD',
      minimumFractionDigits: 3,
      maximumFractionDigits: 3,
    }).format(amount);
  };

  // Format number with commas
  const formatNumber = (num: number) => {
    return new Intl.NumberFormat('en-US').format(num);
  };

  // Get icon based on type
  const getIcon = (type: string) => {
    if (type === "BOTOX") return <Syringe className="w-4 h-4" />;
    if (type.includes("FILLERS")) return <Pill className="w-4 h-4" />;
    return <Package2 className="w-4 h-4" />;
  };

  // Get color class based on type
  const getTypeColor = (type: string) => {
    if (type === "BOTOX") return "bg-blue-100 text-blue-800 border-blue-200";
    if (type.includes("FILLERS")) return "bg-purple-100 text-purple-800 border-purple-200";
    return "bg-gray-100 text-gray-800 border-gray-200";
  };

  return (
    <Card className="border-slate-200 bg-white shadow-sm">
      <CardHeader>
        <CardTitle className="text-black flex items-center gap-2">
          <Package2 className="w-6 h-6" />
          Currency Stock
        </CardTitle>
      </CardHeader>
      <CardContent className="pt-6">
        <div className="overflow-hidden rounded-lg border-2 border-slate-200">
          <table className="w-full">
            <thead>
              <tr className="bg-slate-100">
                <th className="px-6 py-4 text-left font-semibold text-slate-900 border-b border-slate-200">
                  Type
                </th>
                <th className="px-6 py-4 text-right font-semibold text-slate-900 border-b border-slate-200">
                  Quantity
                </th>
                <th className="px-6 py-4 text-right font-semibold text-slate-900 border-b border-slate-200">
                  Total Qty Cost (KWD)
                </th>
              </tr>
            </thead>
            <tbody>
              {stockData.map((item, index) => (
                <tr 
                  key={index} 
                  className="hover:bg-slate-50 transition-colors border-b border-slate-100 last:border-b-0"
                >
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className={`p-2 rounded-lg ${getTypeColor(item.type)}`}>
                        {getIcon(item.type)}
                      </div>
                      <span className="font-medium text-slate-900">{item.type}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <span className="font-semibold text-slate-900">
                      {formatNumber(item.quantity)}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <span className="font-semibold text-slate-900">
                      {formatKWD(item.totalCost)}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
            <tfoot>
              <tr className="bg-slate-900 text-white">
                <td className="px-6 py-4 font-bold">
                  Total
                </td>
                <td className="px-6 py-4 text-right font-bold">
                  {formatNumber(totalQuantity)}
                </td>
                <td className="px-6 py-4 text-right font-bold">
                  {formatKWD(totalCost)}
                </td>
              </tr>
            </tfoot>
          </table>
        </div>
        
        {/* Summary Statistics */}
        <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
            <div className="text-sm text-blue-600 mb-1">BOTOX Units</div>
            <div className="text-xl font-bold text-blue-900">
              {formatNumber(stockData.find(item => item.type === "BOTOX")?.quantity || 0)}
            </div>
          </div>
          <div className="bg-purple-50 p-4 rounded-lg border border-purple-200">
            <div className="text-sm text-purple-600 mb-1">Total Fillers</div>
            <div className="text-xl font-bold text-purple-900">
              {formatNumber(
                stockData
                  .filter(item => item.type.includes("FILLERS"))
                  .reduce((sum, item) => sum + item.quantity, 0)
              )}
            </div>
          </div>
          <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
            <div className="text-sm text-gray-600 mb-1">Equipment Units</div>
            <div className="text-xl font-bold text-gray-900">
              {formatNumber(stockData.find(item => item.type === "EQUIPMENTS")?.quantity || 0)}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}