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

// Credit Note Details
const creditNoteDetails = [
  { description: "REF PLUS TRSF TO FPC FOR CMS COMPENSATION 8277 PCS", amount: 30128.28 },
  { description: "DIS margin after comission inv#22012881 C2704/20 inv#22012883 under G1523/22 inv#22012883 under G1523/22", amount: 7078.67 },
  { description: "DIS MARGIN after comission inv#22011461 under C2704/20", amount: 194.27 },
  { description: "REF STANDERED COM INV #1915911 INV#1915841 INV#1915511", amount: 908.86 },
  { description: "CUSTOMES & AIRFRIGHT CHARGES FOR FILLERS SAMPLE PO122-320BG INV#9052719", amount: 8545.35 },
  { description: "RECALL OF 5 APPLICATORS EL SEEF HOSPITAL", amount: 2500.00 },
  { description: "Charges of Ref Stand-2233511", amount: 638.02 },
  { description: "Charges of Optive Fusion Lubricant from BAHRAIN (insurance+freight)", amount: 5083.30 },
  { description: "PRICE DIF & DISTR MARGIN INV#23014250 OPTIVE FUSION KOC", amount: 20587.84 },
  { description: "DEMURRAGE INV#0111483323B PO123-225BG", amount: 1822.64 },
  { description: "OPTIVE FUSION UD-6800 PACKS INVOICES #23013166/PO1368683 &220 PACKS INV#23012820/PO1336715", amount: 8777.52 },
  { description: "charges of fillers foc shipments inv#9064230 po 124-98bg", amount: 23547.87 },
  { description: "CHARGES OF REF STANDERED INV#2574191", amount: 804.33 },
  { description: "OPTIVE FUSION UD-9020 UNDER PO1432799 INV#24006988", amount: 8797.03 },
  { description: "VARIATION FEESACUVAIL RESTASIS, REFRESH LIQUIGEL AND ACULAR", amount: 1954.40 },
  { description: "ALLERGAN OFFICE SUPPLIES /KS TILL OCTOBER", amount: 1274.82 },
  { description: "VARIATION REGISTRAION /MOH ANALYSIS FEES", amount: 7360.66 },
  { description: "VARIATION REGISTRAION /MOH ANALYSIS FEES", amount: 1819.67 },
  { description: "PHONE BILL#51773771 FOR DECEMBER 2024", amount: 4294.72 },
  { description: "CHARGES OF CUSTOMES AND INSURANCE FOR BOTOX SAMPLE SHIPMENT PO124-182BG INV#9070065", amount: 637.16 },
  { description: "SAMPLES FOR RELEASE FOR BOTOX PO124-93BG INV#713077894 /FILLERS 124-113BG INV#713077683", amount: 10866.98 },
  { description: "DISCOUNT ON SALES FEBRUARY 2025", amount: 142208.13 },
  { description: "DISCOUNT ON SALES MARCH 2025", amount: 171783.17 },
  { description: "DISCOUNT ON SALES APRIL 2025", amount: 85660.43 },
  { description: "20PCS OF BOTOX NEURO FOR TRAINING ADAN HOSPITAL", amount: 2839.49 },
  { description: "AIREFAIRE FOR JESSICA AND SAYED", amount: 1798.54 },
  { description: "PHONE BILL Mar & Apr 2025 INV#54476033 & INV#56175571", amount: 9117.17 },
  { description: "DISCOUNT ON SALES MAY 2025", amount: 31329.31 },
  { description: "DISCOUNT ON SALES BOTOX N", amount: 7416.74 },
  { description: "DESTRUCTION 25026", amount: 148127.72 },
  { description: "DESTRUCTION 24063/24086", amount: 71940.50 },
  { description: "DESTRUCTION 24109", amount: 10193.04 },
  { description: "DESTRUCTION 24108", amount: 9147.80 },
  { description: "DESTRUCTION 25013/25019/25020/25021/25035", amount: 8046.37 },
  { description: "DESTRUCTION 24100", amount: 478.37 },
  { description: "DESTRUCTION MOH 24084", amount: 411.85 },
  { description: "Demurrage charges for shipment INV#9074588 BOTOX LC", amount: 333.72 },
  { description: "MOH release samples closing 2024", amount: 10636.67 },
];

export function OutstandingBalanceSection({ data, statements }: OutstandingBalanceSectionProps) {
  // Calculate Allergan Outstandings total
  const allerganTotal = statements.reduce((sum, statement) => sum + statement.amount, 0);

  // Calculate total from credit note details
  const creditNoteTotal = creditNoteDetails.reduce((sum, item) => sum + item.amount, 0);

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-KW', {
      style: 'currency',
      currency: 'KWD',
      minimumFractionDigits: 3,
    }).format(amount);
  };

  const formatUSD = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2,
    }).format(amount);
  };

  // Prepare data for pie charts
  const allerganPieData = statements.map(statement => ({
    name: statement.name,
    value: statement.amount
  }));

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
    <>
      {/* Allergan Outstandings Card - Keep original */}
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
    </>
  );
}

// Separate component for Credit Note Details that will span full width
export function CreditNoteDetails() {
  const creditNoteTotal = creditNoteDetails.reduce((sum, item) => sum + item.amount, 0);

  const formatUSD = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2,
    }).format(amount);
  };

  return (
    <Card className="border-slate-200 bg-white shadow-sm">
      <CardHeader>
        <CardTitle className="text-black">Credit Note Details</CardTitle>
      </CardHeader>
      <CardContent className="pt-6">
        <div className="overflow-hidden">
          <div className="overflow-x-auto max-h-[400px] overflow-y-auto border border-slate-200 rounded-lg">
            <table className="w-full text-sm">
              <thead className="sticky top-0 z-10 bg-white">
                <tr className="border-b border-slate-200">
                  <th className="px-4 py-3 text-left font-semibold text-slate-900 bg-white">Description</th>
                  <th className="px-4 py-3 text-right font-semibold text-slate-900 min-w-[150px] bg-white">USD Amount</th>
                </tr>
              </thead>
              <tbody>
                {creditNoteDetails.map((item, index) => (
                  <tr key={index} className="border-b border-slate-100 hover:bg-slate-50 transition-colors">
                    <td className="px-4 py-3 text-slate-700">{item.description}</td>
                    <td className="px-4 py-3 text-right font-medium text-slate-900">
                      {formatUSD(item.amount)}
                    </td>
                  </tr>
                ))}
              </tbody>
              <tfoot className="sticky bottom-0 z-10">
                <tr className="border-t-2 border-slate-300 bg-slate-100">
                  <td className="px-4 py-3 font-bold text-slate-900 bg-slate-100">Total</td>
                  <td className="px-4 py-3 text-right font-bold text-slate-900 bg-slate-100">
                    {formatUSD(creditNoteTotal)}
                  </td>
                </tr>
              </tfoot>
            </table>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}