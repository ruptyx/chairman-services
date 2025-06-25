// components/soa-section.tsx
'use client';

import { useState, useMemo } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

type FilterPeriod = 'Total' | 'YTD' | 'MTD';

interface SOA {
  id: string;
  type: string;
  amount: number;
  year: string;
  month: string;
  created_at: string;
}

interface SOASectionProps {
  data: SOA[];
}

// Mapping of month names to month numbers
const monthNameToNumber: { [key: string]: number } = {
  'January': 1,
  'February': 2,
  'March': 3,
  'April': 4,
  'May': 5,
  'June': 6,
  'July': 7,
  'August': 8,
  'September': 9,
  'October': 10,
  'November': 11,
  'December': 12
};

// USD to KWD conversion rate (original values are in USD)
const USD_TO_KWD_RATE = 0.308;

export function SOASection({ data }: SOASectionProps) {
  const [filterPeriod, setFilterPeriod] = useState<FilterPeriod>('Total'); // Default to 'Total'
  const [showInKWD, setShowInKWD] = useState(false);

  const currentDate = new Date();
  const currentYear = currentDate.getFullYear();
  const currentMonth = currentDate.getMonth() + 1; // JavaScript months are 0-indexed

  // Filter data based on selected period
  const filteredData = useMemo(() => {
    if (filterPeriod === 'Total') {
      return data; // Return all data for 'Total' view
    }
    return data.filter(item => {
      const itemYear = parseInt(item.year, 10);
      if (filterPeriod === 'YTD') {
        return itemYear === currentYear;
      } else { // MTD
        const itemMonth = monthNameToNumber[item.month];
        return itemYear === currentYear && itemMonth === currentMonth;
      }
    });
  }, [data, filterPeriod, currentYear, currentMonth]);

  // Calculate type summary from filtered data
  const typeSummary = filteredData.reduce((acc, item) => {
    acc[item.type] = (acc[item.type] || 0) + item.amount;
    return acc;
  }, {} as Record<string, number>);

  const totalAmount = Object.values(typeSummary).reduce((sum, amount) => sum + amount, 0);

  const formatCurrency = (amount: number, inKWD: boolean = false) => {
    if (inKWD) {
      return new Intl.NumberFormat('en-KW', {
        style: 'currency',
        currency: 'KWD',
        minimumFractionDigits: 3,
      }).format(amount * USD_TO_KWD_RATE);
    }
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2,
    }).format(amount);
  };

  const getMonthName = (month: number) => {
    const months = [
      'January', 'February', 'March', 'April', 'May', 'June',
      'July', 'August', 'September', 'October', 'November', 'December'
    ];
    return months[month - 1];
  };

  // Helper to get the display text for the current filter
  const getPeriodText = () => {
    switch (filterPeriod) {
      case 'YTD':
        return `Year ${currentYear}`;
      case 'MTD':
        return `${getMonthName(currentMonth)} ${currentYear}`;
      case 'Total':
        return 'Overall Total';
      default:
        return '';
    }
  };

  return (
    <Card className="border-slate-200 bg-white shadow-sm">
      <CardHeader className="">
        <CardTitle className="flex justify-between items-center text-black">
          <span>Due Amount by Category</span>
          <div className="flex gap-2">
            <Button
              variant={filterPeriod === 'Total' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setFilterPeriod('Total')}
              className={filterPeriod === 'Total' 
                ? 'bg-slate-800 text-white hover:bg-slate-700' 
                : 'border-slate-300 text-slate-700 hover:bg-slate-100'
              }
            >
              Total
            </Button>
            <Button
              variant={filterPeriod === 'YTD' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setFilterPeriod('YTD')}
              className={filterPeriod === 'YTD' 
                ? 'bg-slate-800 text-white hover:bg-slate-700' 
                : 'border-slate-300 text-slate-700 hover:bg-slate-100'
              }
            >
              YTD
            </Button>
            <Button
              variant={filterPeriod === 'MTD' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setFilterPeriod('MTD')}
              className={filterPeriod === 'MTD' 
                ? 'bg-slate-800 text-white hover:bg-slate-700' 
                : 'border-slate-300 text-slate-700 hover:bg-slate-100'
              }
            >
              MTD
            </Button>
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent className="pt-6">
        <div className="space-y-3">
          <div className="flex justify-end mb-3">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setShowInKWD(!showInKWD)}
              className="border-slate-300 text-slate-700 hover:bg-slate-100"
            >
              {showInKWD ? 'Show in USD' : 'Show in KWD'}
            </Button>
          </div>
          {Object.entries(typeSummary).map(([type, amount]) => (
            <div key={type} className="flex justify-between items-center p-3 rounded-lg bg-white border-2 border-slate-200 hover:bg-slate-50 transition-colors">
              <span className="font-medium capitalize text-slate-700">{type}:</span>
              <div className="text-right">
                <span className="text-lg font-semibold text-slate-900">{formatCurrency(amount, showInKWD)}</span>
                {showInKWD && (
                  <div className="text-xs text-slate-500">{formatCurrency(amount, false)}</div>
                )}
              </div>
            </div>
          ))}
          <div className="border-t-2 border-slate-300 pt-4 mt-6">
            <div className="flex justify-between items-center p-4 rounded-lg bg-slate-900 text-white">
              <span className="font-bold">Total:</span>
              <div className="text-right">
                <span className="text-xl font-bold">{formatCurrency(totalAmount, showInKWD)}</span>
                {showInKWD && (
                  <div className="text-sm text-slate-300">{formatCurrency(totalAmount, false)}</div>
                )}
              </div>
            </div>
          </div>
          <div className="text-sm text-slate-500 mt-3 p-2 bg-slate-50 rounded border border-slate-200">
            Period: {getPeriodText()}
            {showInKWD && <span className="ml-2">(Rate: 1 USD = {USD_TO_KWD_RATE} KWD)</span>}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}