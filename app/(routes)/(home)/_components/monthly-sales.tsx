// components/monthly-sales.tsx
'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { TrendingUp, Calendar, DollarSign, ArrowLeftRight } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, LineChart, Line } from 'recharts';

interface SalesData {
  category: string;
  'Jan-25': number;
  'Feb-25': number;
  'Mar-25': number;
  'Apr-25': number;
  'May-25': number;
  'Jun-25': number;
  total: number;
}

export function MonthlySales() {
  const [showChart, setShowChart] = useState(true);
  const [currency, setCurrency] = useState<'KWD' | 'USD'>('KWD');
  
  // Conversion rate
  const KWD_TO_USD = 3.27;

  // Original sales data in KWD
  const salesDataKWD: SalesData[] = [
    {
      category: "Agn aesthetic Botox",
      'Jan-25': 194193.43,
      'Feb-25': 115858.23,
      'Mar-25': 222072.56,
      'Apr-25': 138339.88,
      'May-25': 53580.74,
      'Jun-25': 106790.39,
      total: 830835.23
    },
    {
      category: "Agn aesthetic Fillers",
      'Jan-25': 247363.54,
      'Feb-25': 225588.07,
      'Mar-25': 256362.60,
      'Apr-25': 212444.90,
      'May-25': 129406.02,
      'Jun-25': 39095.96,
      total: 1110261.09
    },
    {
      category: "Agn Equipment",
      'Jan-25': 1250.00,
      'Feb-25': 2900.00,
      'Mar-25': 5000.00,
      'Apr-25': 0,
      'May-25': 0,
      'Jun-25': 0,
      total: 9150.00
    },
    {
      category: "Agn Eyecare",
      'Jan-25': 1962.30,
      'Feb-25': 0,
      'Mar-25': 0,
      'Apr-25': 0,
      'May-25': 0,
      'Jun-25': 0,
      total: 1962.30
    },
    {
      category: "Agn MOH",
      'Jan-25': 170892.29,
      'Feb-25': 0,
      'Mar-25': 0,
      'Apr-25': 0,
      'May-25': 0,
      'Jun-25': 0,
      total: 170892.29
    },
    {
      category: "AGN NEURO",
      'Jan-25': 4738.36,
      'Feb-25': 3034.68,
      'Mar-25': 4898.08,
      'Apr-25': 266.20,
      'May-25': 532.40,
      'Jun-25': 0,
      total: 13469.72
    }
  ];

  // Convert data based on selected currency
  const convertValue = (value: number) => {
    return currency === 'USD' ? value * KWD_TO_USD : value;
  };

  // Get sales data in current currency
  const salesData: SalesData[] = salesDataKWD.map(item => ({
    ...item,
    'Jan-25': convertValue(item['Jan-25']),
    'Feb-25': convertValue(item['Feb-25']),
    'Mar-25': convertValue(item['Mar-25']),
    'Apr-25': convertValue(item['Apr-25']),
    'May-25': convertValue(item['May-25']),
    'Jun-25': convertValue(item['Jun-25']),
    total: convertValue(item.total)
  }));

  // Calculate grand totals for each month
  const monthlyTotalsKWD = {
    'Jan-25': 620399.93,
    'Feb-25': 344346.30,
    'Mar-25': 481469.84,
    'Apr-25': 360682.86,
    'May-25': 183252.95,
    'Jun-25': 146418.75,
  };

  const monthlyTotals = Object.fromEntries(
    Object.entries(monthlyTotalsKWD).map(([key, value]) => [key, convertValue(value)])
  );

  const grandTotal = convertValue(2136570.63);

  // Format currency
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: currency,
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(value);
  };

  // Format number for table display
  const formatNumber = (value: number) => {
    if (value === 0) return '-';
    return new Intl.NumberFormat('en-US', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(value);
  };

  // Prepare data for charts
  const chartData = Object.entries(monthlyTotals).map(([month, total]) => {
    const monthKey = month as keyof Omit<SalesData, 'category' | 'total'>;
    const botoxData = salesData.find(d => d.category === "Agn aesthetic Botox");
    const fillersData = salesData.find(d => d.category === "Agn aesthetic Fillers");
    
    const botoxValue = botoxData ? botoxData[monthKey] : 0;
    const fillersValue = fillersData ? fillersData[monthKey] : 0;
    
    return {
      month: month.replace('-25', ''),
      total: total,
      botox: botoxValue,
      fillers: fillersValue,
      other: total - botoxValue - fillersValue
    };
  });

  // Calculate percentage of total for each category
  const categoryPercentages = salesData.map(item => ({
    category: item.category,
    percentage: ((item.total / grandTotal) * 100).toFixed(1)
  }));

  // Custom tooltip for charts
  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-3 border border-slate-200 rounded-lg shadow-lg">
          <p className="font-semibold text-slate-900">{label} 2025</p>
          {payload.map((entry: any, index: number) => (
            <p key={index} className="text-sm" style={{ color: entry.color }}>
              {entry.name}: {formatCurrency(entry.value)}
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

  // Toggle currency
  const toggleCurrency = () => {
    setCurrency(prev => prev === 'KWD' ? 'USD' : 'KWD');
  };

  return (
    <Card className="border-slate-200 bg-white shadow-sm">
      <CardHeader>
        <div className="flex justify-between items-center">
          <CardTitle className="text-black flex items-center gap-2">
            <Calendar className="w-6 h-6" />
            Monthly Sales Report
          </CardTitle>
          <div className="flex items-center gap-4">
            <span className="text-sm text-slate-600">Data till June 24, 2025</span>
            <button
              onClick={toggleCurrency}
              className="text-sm px-3 py-1 rounded-md bg-blue-100 hover:bg-blue-200 transition-colors flex items-center gap-1"
            >
              <ArrowLeftRight className="w-4 h-4" />
              {currency === 'KWD' ? 'Convert to USD' : 'Convert to KWD'}
            </button>
            <button
              onClick={() => setShowChart(!showChart)}
              className="text-sm px-3 py-1 rounded-md bg-slate-100 hover:bg-slate-200 transition-colors"
            >
              {showChart ? 'Show Table' : 'Show Chart'}
            </button>
          </div>
        </div>
        {currency === 'USD' && (
          <div className="mt-2 text-sm text-slate-600">
            Exchange rate: 1 KWD = 3.27 USD
          </div>
        )}
      </CardHeader>
      <CardContent className="pt-6">
        {showChart ? (
          <div className="space-y-6">
            {/* Summary Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-sm text-blue-600 mb-1">Total Botox Sales</div>
                    <div className="text-xl font-bold text-blue-900">{formatCurrency(convertValue(830835.23))}</div>
                  </div>
                  <TrendingUp className="w-8 h-8 text-blue-500" />
                </div>
              </div>
              <div className="bg-purple-50 p-4 rounded-lg border border-purple-200">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-sm text-purple-600 mb-1">Total Fillers Sales</div>
                    <div className="text-xl font-bold text-purple-900">{formatCurrency(convertValue(1110261.09))}</div>
                  </div>
                  <TrendingUp className="w-8 h-8 text-purple-500" />
                </div>
              </div>
              <div className="bg-green-50 p-4 rounded-lg border border-green-200">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-sm text-green-600 mb-1">Grand Total</div>
                    <div className="text-xl font-bold text-green-900">{formatCurrency(grandTotal)}</div>
                  </div>
                  <DollarSign className="w-8 h-8 text-green-500" />
                </div>
              </div>
            </div>

            {/* Line Chart */}
            <div className="bg-white p-4 rounded-lg border border-slate-200">
              <h3 className="text-lg font-semibold mb-4 text-slate-900">Monthly Sales Trend</h3>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={chartData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                  <XAxis dataKey="month" stroke="#64748b" />
                  <YAxis stroke="#64748b" tickFormatter={(value) => `${currency === 'KWD' ? 'KD' : '$'}${(value / 1000).toFixed(0)}k`} />
                  <Tooltip content={<CustomTooltip />} />
                  <Legend />
                  <Line type="monotone" dataKey="total" stroke="#3b82f6" strokeWidth={3} name="Total Sales" />
                  <Line type="monotone" dataKey="botox" stroke="#8b5cf6" strokeWidth={2} name="Botox" />
                  <Line type="monotone" dataKey="fillers" stroke="#ec4899" strokeWidth={2} name="Fillers" />
                </LineChart>
              </ResponsiveContainer>
            </div>

            {/* Stacked Bar Chart */}
            <div className="bg-white p-4 rounded-lg border border-slate-200">
              <h3 className="text-lg font-semibold mb-4 text-slate-900">Sales by Category</h3>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={chartData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                  <XAxis dataKey="month" stroke="#64748b" />
                  <YAxis stroke="#64748b" tickFormatter={(value) => `${currency === 'KWD' ? 'KD' : '$'}${(value / 1000).toFixed(0)}k`} />
                  <Tooltip content={<CustomTooltip />} />
                  <Legend />
                  <Bar dataKey="botox" stackId="a" fill="#3b82f6" name="Botox" />
                  <Bar dataKey="fillers" stackId="a" fill="#8b5cf6" name="Fillers" />
                  <Bar dataKey="other" stackId="a" fill="#64748b" name="Other" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-slate-200 bg-slate-50">
                  <th className="px-4 py-3 text-left font-semibold text-slate-900 sticky left-0 bg-slate-50 z-10">Row Labels</th>
                  <th className="px-4 py-3 text-right font-semibold text-slate-900 min-w-[120px]">Jan-25</th>
                  <th className="px-4 py-3 text-right font-semibold text-slate-900 min-w-[120px]">Feb-25</th>
                  <th className="px-4 py-3 text-right font-semibold text-slate-900 min-w-[120px]">Mar-25</th>
                  <th className="px-4 py-3 text-right font-semibold text-slate-900 min-w-[120px]">Apr-25</th>
                  <th className="px-4 py-3 text-right font-semibold text-slate-900 min-w-[120px]">May-25</th>
                  <th className="px-4 py-3 text-right font-semibold text-slate-900 min-w-[120px]">Jun-25</th>
                  <th className="px-4 py-3 text-right font-semibold text-slate-900 min-w-[140px] bg-slate-100">TOTAL</th>
                </tr>
              </thead>
              <tbody>
                {salesData.map((row, index) => (
                  <tr key={index} className="border-b border-slate-100 hover:bg-slate-50 transition-colors">
                    <td className="px-4 py-3 font-medium text-slate-900 sticky left-0 bg-white z-10">{row.category}</td>
                    <td className="px-4 py-3 text-right text-slate-700">{formatNumber(row['Jan-25'])}</td>
                    <td className="px-4 py-3 text-right text-slate-700">{formatNumber(row['Feb-25'])}</td>
                    <td className="px-4 py-3 text-right text-slate-700">{formatNumber(row['Mar-25'])}</td>
                    <td className="px-4 py-3 text-right text-slate-700">{formatNumber(row['Apr-25'])}</td>
                    <td className="px-4 py-3 text-right text-slate-700">{formatNumber(row['May-25'])}</td>
                    <td className="px-4 py-3 text-right text-slate-700">{formatNumber(row['Jun-25'])}</td>
                    <td className="px-4 py-3 text-right font-semibold text-slate-900 bg-slate-50">{formatNumber(row.total)}</td>
                  </tr>
                ))}
                <tr className="border-t-2 border-slate-300 bg-slate-100 font-bold">
                  <td className="px-4 py-3 text-slate-900 sticky left-0 bg-slate-100 z-10">Grand Total</td>
                  <td className="px-4 py-3 text-right text-slate-900">{formatNumber(monthlyTotals['Jan-25'])}</td>
                  <td className="px-4 py-3 text-right text-slate-900">{formatNumber(monthlyTotals['Feb-25'])}</td>
                  <td className="px-4 py-3 text-right text-slate-900">{formatNumber(monthlyTotals['Mar-25'])}</td>
                  <td className="px-4 py-3 text-right text-slate-900">{formatNumber(monthlyTotals['Apr-25'])}</td>
                  <td className="px-4 py-3 text-right text-slate-900">{formatNumber(monthlyTotals['May-25'])}</td>
                  <td className="px-4 py-3 text-right text-slate-900">{formatNumber(monthlyTotals['Jun-25'])}</td>
                  <td className="px-4 py-3 text-right text-slate-900 bg-slate-200">{formatNumber(grandTotal)}</td>
                </tr>
              </tbody>
            </table>
          </div>
        )}
        
        {/* Category Performance */}
        <div className="mt-6 p-4 bg-slate-50 rounded-lg">
          <h3 className="text-sm font-semibold text-slate-700 mb-3">Category Performance</h3>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {categoryPercentages.map((item, index) => (
              <div key={index} className="flex justify-between items-center text-sm">
                <span className="text-slate-600">{item.category}:</span>
                <span className="font-semibold text-slate-900">{item.percentage}%</span>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}