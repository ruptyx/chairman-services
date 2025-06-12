// components/payment-schedule.tsx
'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { CheckCircle2, Circle, Clock, Package, TrendingUp, DollarSign } from 'lucide-react';

interface PaymentScheduleProps {
  // You can pass any relevant data here if needed
}

export function PaymentSchedule({}: PaymentScheduleProps) {
  const currentDate = new Date();
  const currentMonth = currentDate.getMonth(); // 0-based (0 = January, 5 = June)
  const currentYear = currentDate.getFullYear();

  // Generate schedule from June to December of current year
  const scheduleMonths = [
    { month: 'June', monthNum: 5, year: currentYear },
    { month: 'July', monthNum: 6, year: currentYear },
    { month: 'August', monthNum: 7, year: currentYear },
    { month: 'September', monthNum: 8, year: currentYear },
    { month: 'October', monthNum: 9, year: currentYear },
    { month: 'November', monthNum: 10, year: currentYear },
    { month: 'December', monthNum: 11, year: currentYear },
  ];

  // Generate realistic payment schedule with ~$1M per month
  const shipmentSchedule = scheduleMonths.map((month, index) => {
    const isPast = month.monthNum < currentMonth;
    const isCurrent = month.monthNum === currentMonth;
    
    // Base amount around $1M with slight variations
    const baseAmount = 1000000;
    const variation = (Math.random() * 100000) - 50000; // ±$50k variation
    const shipmentAmount = baseAmount + variation;
    
    // Bank interest at 2% annual (monthly: 2%/12)
    const monthlyInterestRate = 0.02 / 12;
    const bankInterest = shipmentAmount * monthlyInterestRate;
    
    // Markup percentage (20.2% as specified)
    const markupPercentage = 0.202;
    const markupAmount = shipmentAmount * markupPercentage;
    
    return {
      ...month,
      shipmentDate: `${month.month} 15, ${month.year}`,
      amount: shipmentAmount,
      bankInterest: bankInterest,
      markup: markupAmount,
      totalDue: shipmentAmount - markupAmount,
      status: isPast ? 'completed' : isCurrent ? 'in-progress' : 'pending',
    };
  });

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const formatPercentage = (amount: number, total: number) => {
    return `${((amount / total) * 100).toFixed(1)}%`;
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed':
        return <CheckCircle2 className="w-5 h-5 text-green-600" />;
      case 'in-progress':
        return <Clock className="w-5 h-5 text-blue-600" />;
      default:
        return <Circle className="w-5 h-5 text-gray-400" />;
    }
  };

  const getStatusBadge = (status: string) => {
    const badges = {
      'completed': 'bg-green-100 text-green-800 border-green-200',
      'in-progress': 'bg-blue-100 text-blue-800 border-blue-200',
      'pending': 'bg-gray-100 text-gray-600 border-gray-200'
    };
    
    const labels = {
      'completed': 'Paid',
      'in-progress': 'Processing',
      'pending': 'Scheduled'
    };
    
    return (
      <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium border ${badges[status as keyof typeof badges]}`}>
        {labels[status as keyof typeof labels]}
      </span>
    );
  };

  const totalScheduled = shipmentSchedule.reduce((sum, item) => sum + item.totalDue, 0);
  const totalPaid = shipmentSchedule
    .filter(item => item.status === 'completed')
    .reduce((sum, item) => sum + item.totalDue, 0);
  const totalPending = totalScheduled - totalPaid;
  
  const totalInterest = shipmentSchedule.reduce((sum, item) => sum + item.bankInterest, 0);

  return (
    <Card className="border-slate-200 bg-white shadow-sm">
      <CardHeader className="">
        <div className="flex justify-between items-center">
          <CardTitle className="text-black flex items-center gap-2">
            <Package className="w-6 h-6" />
            Allergan Shipment Payment Schedule
          </CardTitle>
          <div className="text-sm text-slate-300">
            June - December {currentYear}
          </div>
        </div>
      </CardHeader>
      <CardContent className="pt-6">
        <div className="space-y-6">
          {/* Summary Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <div className="bg-white p-4 rounded-lg border-2 border-slate-200">
              <div className="text-sm text-slate-600 mb-1">Total Scheduled</div>
              <div className="text-xl font-bold text-slate-900">{formatCurrency(totalScheduled)}</div>
            </div>
            <div className="bg-white p-4 rounded-lg border-2 border-slate-200">
              <div className="text-sm text-slate-600 mb-1">Total Paid</div>
              <div className="text-xl font-bold text-green-700">{formatCurrency(totalPaid)}</div>
            </div>
            <div className="bg-white p-4 rounded-lg border-2 border-slate-200">
              <div className="text-sm text-slate-600 mb-1 flex items-center gap-1">
                <DollarSign className="w-4 h-4" />
                Total Interest
              </div>
              <div className="text-xl font-bold text-slate-900">{formatCurrency(totalInterest)}</div>
            </div>
          </div>

          {/* Schedule Table */}
          <div className="relative overflow-hidden rounded-md border-2 border-slate-200 bg-white">
            <div className="overflow-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="bg-slate-100 text-black">
                    <th className="p-4 text-left font-semibold border-b border-slate-200">Status</th>
                    <th className="p-4 text-left font-semibold border-b border-slate-200">Month</th>
                    <th className="p-4 text-left font-semibold border-b border-slate-200">Shipment Date</th>
                    <th className="p-4 text-right font-semibold border-b border-slate-200">Shipment Amount</th>
                    <th className="p-4 text-right font-semibold border-b border-slate-200">Bank Interest (2%)</th>
                    <th className="p-4 text-right font-semibold border-b border-slate-200">Shipment Markup</th>
                    <th className="p-4 text-right font-semibold border-b border-slate-200">Total Due</th>
                    <th className="p-4 text-center font-semibold border-b border-slate-200">Payment Status</th>
                  </tr>
                </thead>
                <tbody>
                  {shipmentSchedule.map((item, index) => (
                    <tr key={index} className={`hover:bg-slate-50 border-b border-slate-100 ${item.status === 'completed' ? 'bg-gray-50' : ''}`}>
                      <td className="p-4">
                        <div className="flex items-center justify-center">
                          {getStatusIcon(item.status)}
                        </div>
                      </td>
                      <td className="p-4 font-medium text-slate-900">{item.month}</td>
                      <td className="p-4 text-slate-600">{item.shipmentDate}</td>
                      <td className="p-4 text-right font-semibold text-slate-900">{formatCurrency(item.amount)}</td>
                      <td className="p-4 text-right text-slate-700">
                        <div>{formatCurrency(item.bankInterest)}</div>
                        <div className="text-xs text-slate-500">{formatPercentage(item.bankInterest, item.amount)}</div>
                      </td>
                      <td className="p-4 text-right text-slate-700">
                        <div>{formatCurrency(item.markup)}</div>
                        <div className="text-xs text-slate-500">{formatPercentage(item.markup, item.amount)}</div>
                      </td>
                      <td className="p-4 text-right font-bold text-slate-900">{formatCurrency(item.totalDue)}</td>
                      <td className="p-4 text-center">
                        {getStatusBadge(item.status)}
                      </td>
                    </tr>
                  ))}
                </tbody>
                <tfoot>
                  <tr className="bg-slate-100 font-semibold">
                    <td colSpan={3} className="p-4 text-slate-900">Totals</td>
                    <td className="p-4 text-right text-slate-900">{formatCurrency(shipmentSchedule.reduce((sum, item) => sum + item.amount, 0))}</td>
                    <td className="p-4 text-right text-slate-900">{formatCurrency(totalInterest)}</td>
                    <td className="p-4 text-right text-slate-900">{formatCurrency(shipmentSchedule.reduce((sum, item) => sum + item.markup, 0))}</td>
                    <td className="p-4 text-right text-slate-900">{formatCurrency(totalScheduled)}</td>
                    <td></td>
                  </tr>
                </tfoot>
              </table>
            </div>
          </div>

          <div className="text-sm text-slate-500 flex justify-between">
            <span>Showing {shipmentSchedule.length} scheduled shipments</span>
            <span>Average monthly payment: {formatCurrency(totalScheduled / shipmentSchedule.length)}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}