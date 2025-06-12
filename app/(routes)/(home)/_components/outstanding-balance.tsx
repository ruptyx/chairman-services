// components/outstanding-balance-section.tsx
'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';

interface Statement {
  id: string;
  name: string;
  amount: number;
  updated_at: string;
}

interface OutstandingBalance {
  id: string;
  name: string;
  sector: string;
  balance: number;
  updated_at: string;
}

interface OutstandingBalanceSectionProps {
  data: OutstandingBalance[];
  statements: Statement[];
}

// Deep navy color palette for pie charts
const COLORS = ['#1e293b', '#334155', '#475569', '#64748b', '#94a3b8', '#cbd5e1', '#e2e8f0', '#f1f5f9'];

export function OutstandingBalanceSection({ data, statements }: OutstandingBalanceSectionProps) {
  // Calculate Allergan Outstandings total
  const allerganTotal = statements.reduce((sum, statement) => sum + statement.amount, 0);

  // Fixed amounts for Credit Note and Inventory
  const inventoryAmount = 378600; // KWD
  const creditNoteAmount = allerganTotal - inventoryAmount; // Calculate credit note as difference

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-KW', {
      style: 'currency',
      currency: 'KWD',
      minimumFractionDigits: 3,
    }).format(amount);
  };

  // Prepare data for pie charts
  const allerganPieData = statements.map(statement => ({
    name: statement.name,
    value: statement.amount
  }));

  // Data for Credit Note and Inventory pie chart
  const balancePieData = [
    { name: 'Credit Note', value: creditNoteAmount },
    { name: 'Inventory', value: inventoryAmount }
  ];

  // Custom label renderer for pie charts
  const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent }: any) => {
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * Math.PI / 180);
    const y = cy + radius * Math.sin(-midAngle * Math.PI / 180);

    return (
      <text x={x} y={y} fill="white" textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central" className="text-xs font-semibold">
        {`${(percent * 100).toFixed(0)}%`}
      </text>
    );
  };

  return (
    <div className="space-y-6">
      {/* Allergan Outstandings Card */}
      <Card className="border-slate-200 bg-white shadow-sm">
        <CardHeader className=" text-black">
          <CardTitle className="text-black">Allergan Outstandings</CardTitle>
        </CardHeader>
        <CardContent className="pt-6">
          <div className="space-y-4">
            <Alert className="border-amber-200 bg-amber-50">
              <AlertDescription className="text-amber-800 text-sm">
                ⚠️ This is an approximation and may not reflect accurate values.
              </AlertDescription>
            </Alert>
            
            <div className="flex items-center justify-center mb-4">
              <span className="text-2xl font-bold text-slate-900">{formatCurrency(allerganTotal)}</span>
            </div>

            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={allerganPieData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={renderCustomizedLabel}
                    outerRadius={100}
                    fill="#1e293b"
                    dataKey="value"
                  >
                    {allerganPieData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(value: number) => formatCurrency(value)} />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Total Outstanding Balance by Sector Card */}
      <Card className="border-slate-200 bg-white shadow-sm">
        <CardHeader className="text-white">
          <CardTitle className="text-black">Credit Note and Inventory Amounts</CardTitle>
        </CardHeader>
        <CardContent className="pt-6">
          <div className="space-y-4">
            <div className="flex items-center justify-center mb-4">
              <span className="text-2xl font-bold text-slate-900">{formatCurrency(allerganTotal)}</span>
            </div>

            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={balancePieData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={renderCustomizedLabel}
                    outerRadius={100}
                    fill="#1e293b"
                    dataKey="value"
                  >
                    {balancePieData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(value: number) => formatCurrency(value)} />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>
            
            <div className="space-y-2 mt-4">
              <div className="flex justify-between items-center p-3 rounded-lg bg-white border-2 border-slate-200">
                <span className="font-medium text-slate-700">Credit Note:</span>
                <span className="font-semibold text-slate-900">{formatCurrency(creditNoteAmount)}</span>
              </div>
              <div className="flex justify-between items-center p-3 rounded-lg bg-white border-2 border-slate-200">
                <span className="font-medium text-slate-700">Inventory:</span>
                <span className="font-semibold text-slate-900">{formatCurrency(inventoryAmount)}</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}