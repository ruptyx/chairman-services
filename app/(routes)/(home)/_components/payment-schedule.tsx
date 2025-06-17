'use client';

import { useState } from 'react';

// Type definitions
type MonthData = {
  [key: string]: number;
};

type PaymentData = {
  [rowLabel: string]: MonthData;
};

export default function AllerganPaymentSchedule() {
  // Define the row labels
  const rowLabels = [
    "Total AA INVOICES (4 SHIPMENTS)",
    "CUSTOMES DIFRENCES CLAIM",
    "CN FOR 32% MARKUP",
    "CN for 40% discount",
    "TOTAL BOTOX INVOICES (4 SHIPMENTS)",
    "CN for BOTOX COMISSION 5%",
    "PAYMENT FOR BOTOX LC",
    "PAYMENT FOR FILLERS LC",
    "Paid to allergan to close 800k",
    "TOTAL TO BE PAID TO BANK FOR AA & BOTOX LC",
    "TOTAL DUES FOR ALLERGAN & BANK"
  ];

  // Define the column headers (months)
  const columns = [
    "Jul-25", "Aug-25", "Sep-25", "Oct-25", "Nov-25", "Dec-25",
    "Jan-26", "Feb-26", "Mar-26", "Apr-26", "May-26", "Jun-26",
    "Jul-26", "Aug-26", "Sep-26", "Oct-26", "Nov-26", "Dec-26"
  ];

  // Initialize data with all values
  const initialData: PaymentData = {
    "Total AA INVOICES (4 SHIPMENTS)": {
      "Jul-25": 967071.00,
      "Aug-25": 967071.00,
      "Sep-25": 967071.00,
      "Oct-25": 967071.00,
      "Nov-25": 898242.97,
      "Dec-25": 898242.97,
      "Jan-26": 898242.97,
      "Feb-26": 898242.97,
      "Mar-26": 841695.96,
      "Apr-26": 841695.96,
      "May-26": 841695.96,
      "Jun-26": 841695.96,
      "Jul-26": 725407.64,
      "Aug-26": 725407.64,
      "Sep-26": 725407.64,
      "Oct-26": 725407.64,
      "Nov-26": 357631.41,
      "Dec-26": 357631.41,
    },
    "CUSTOMES DIFRENCES CLAIM": {
      "Jul-25": -19341.42,
      "Aug-25": -19341.42,
      "Sep-25": -19341.42,
      "Oct-25": -19341.42,
      "Nov-25": -17964.86,
      "Dec-25": -17964.86,
      "Jan-26": -17964.86,
      "Feb-26": -17964.86,
      "Mar-26": -16833.92,
      "Apr-26": -16833.92,
      "May-26": -16833.92,
      "Jun-26": -16833.92,
      "Jul-26": -14508.15,
      "Aug-26": -14508.15,
      "Sep-26": -14508.15,
      "Oct-26": -14508.15,
      "Nov-26": -7152.63,
      "Dec-26": -7152.63,
    },
    "CN FOR 32% MARKUP": {
      "Jul-25": -86450.34,
      "Aug-25": -86450.34,
      "Sep-25": -86450.34,
      "Oct-25": -86450.34,
      "Nov-25": -80297.53,
      "Dec-25": -80297.53,
      "Jan-26": -80297.53,
      "Feb-26": -80297.53,
      "Mar-26": -75242.57,
      "Apr-26": -75242.57,
      "May-26": -75242.57,
      "Jun-26": -75242.57,
      "Jul-26": -64847.09,
      "Aug-26": -64847.09,
      "Sep-26": -64847.09,
      "Oct-26": -64847.09,
      "Nov-26": -31970.10,
      "Dec-26": -31970.10,
    },
    "CN for 40% discount": {
      "Jul-25": -386828.40,
      "Aug-25": -386828.40,
      "Sep-25": -386828.40,
      "Oct-25": -386828.40,
      "Nov-25": -359297.19,
      "Dec-25": -359297.19,
      "Jan-26": -359297.19,
      "Feb-26": -359297.19,
      "Mar-26": -336678.38,
      "Apr-26": -336678.38,
      "May-26": -336678.38,
      "Jun-26": -336678.38,
      "Jul-26": -290163.06,
      "Aug-26": -290163.06,
      "Sep-26": -290163.06,
      "Oct-26": -290163.06,
      "Nov-26": -143052.56,
      "Dec-26": -143052.56,
    },
    "TOTAL BOTOX INVOICES (4 SHIPMENTS)": {
      "Jul-25": 0,
      "Aug-25": 0,
      "Sep-25": 374975.00,
      "Oct-25": 374975.00,
      "Nov-25": 374975.00,
      "Dec-25": 374975.00,
      "Jan-26": 437014.95,
      "Feb-26": 437014.95,
      "Mar-26": 437014.95,
      "Apr-26": 437014.95,
      "May-26": 398304.74,
      "Jun-26": 398304.74,
      "Jul-26": 398304.74,
      "Aug-26": 398304.74,
      "Sep-26": 357671.97,
      "Oct-26": 357671.97,
      "Nov-26": 357671.97,
      "Dec-26": 357671.97,
    },
    "CN for BOTOX COMISSION 5%": {
      "Jul-25": -74995.00,
      "Aug-25": 0,
      "Sep-25": -18748.75,
      "Oct-25": -18748.75,
      "Nov-25": -18748.75,
      "Dec-25": -18748.75,
      "Jan-26": -21850.75,
      "Feb-26": -21850.75,
      "Mar-26": -21850.75,
      "Apr-26": -21850.75,
      "May-26": -19915.24,
      "Jun-26": -19915.24,
      "Jul-26": -19915.24,
      "Aug-26": -19915.24,
      "Sep-26": -17883.60,
      "Oct-26": -17883.60,
      "Nov-26": -17883.60,
      "Dec-26": -17883.60,
    },
    "PAYMENT FOR BOTOX LC": {
      "Jul-25": 374975.00,
      "Aug-25": 374975.00,
      "Sep-25": 374975.00,
      "Oct-25": 374975.00,
      "Nov-25": 374975.00,
      "Dec-25": 374975.00,
      "Jan-26": 374975.00,
      "Feb-26": 374975.00,
      "Mar-26": 437014.95,
      "Apr-26": 437014.95,
      "May-26": 437014.95,
      "Jun-26": 437014.95,
      "Jul-26": 398304.74,
      "Aug-26": 398304.74,
      "Sep-26": 398304.74,
      "Oct-26": 398304.74,
      "Nov-26": 357671.97,
      "Dec-26": 357671.97,
    },
    "PAYMENT FOR FILLERS LC": {
      "Jul-25": 0,
      "Aug-25": 307379.84,
      "Sep-25": 288631.09,
      "Oct-25": 288631.09,
      "Nov-25": 323691.67,
      "Dec-25": 323691.67,
      "Jan-26": 967071.00,
      "Feb-26": 967071.00,
      "Mar-26": 967071.00,
      "Apr-26": 967071.00,
      "May-26": 898242.97,
      "Jun-26": 898242.97,
      "Jul-26": 898242.97,
      "Aug-26": 898242.97,
      "Sep-26": 841695.96,
      "Oct-26": 841695.96,
      "Nov-26": 841695.96,
      "Dec-26": 841695.96,
    },
    "Paid to allergan to close 800k": {
      "Jul-25": 232384.84,
      "Aug-25": 0,
      "Sep-25": 0,
      "Oct-25": 0,
      "Nov-25": 0,
      "Dec-25": 0,
      "Jan-26": 320589.67,
      "Feb-26": 320589.67,
      "Mar-26": 349394.38,
      "Apr-26": 349394.38,
      "May-26": 351329.89,
      "Jun-26": 351329.89,
      "Jul-26": 410566.46,
      "Aug-26": 410566.46,
      "Sep-26": 412598.10,
      "Oct-26": 412598.10,
      "Nov-26": 599941.11,
      "Dec-26": 599941.11,
    },
    "TOTAL TO BE PAID TO BANK FOR AA & BOTOX LC": {
      "Jul-25": 374975.00,
      "Aug-25": 374975.00,
      "Sep-25": 374975.00,
      "Oct-25": 374975.00,
      "Nov-25": 374975.00,
      "Dec-25": 374975.00,
      "Jan-26": 1342046.00,
      "Feb-26": 1342046.00,
      "Mar-26": 1404085.95,
      "Apr-26": 1404085.95,
      "May-26": 1335257.92,
      "Jun-26": 1335257.92,
      "Jul-26": 1296547.72,
      "Aug-26": 1296547.72,
      "Sep-26": 1240000.70,
      "Oct-26": 1240000.70,
      "Nov-26": 1199367.92,
      "Dec-26": 1199367.92,
    },
    "TOTAL DUES FOR ALLERGAN & BANK": {
      "Jul-25": 607359.84,
      "Aug-25": 682354.84,
      "Sep-25": 663606.09,
      "Oct-25": 663606.09,
      "Nov-25": 698666.67,
      "Dec-25": 698666.67,
      "Jan-26": 1662635.67,
      "Feb-26": 1662635.67,
      "Mar-26": 1753480.33,
      "Apr-26": 1753480.33,
      "May-26": 1686587.82,
      "Jun-26": 1686587.82,
      "Jul-26": 1707114.18,
      "Aug-26": 1707114.18,
      "Sep-26": 1652598.80,
      "Oct-26": 1652598.80,
      "Nov-26": 1799309.03,
      "Dec-26": 1799309.03,
    }
  };

  const [data, setData] = useState<PaymentData>(initialData);

  // Format number as currency
  const formatCurrency = (value: number | undefined) => {
    if (value === undefined || value === 0) return '-';
    return new Intl.NumberFormat('en-US', {
      style: 'decimal',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(value);
  };

  // Calculate totals for specific rows
  const calculateTotals = () => {
    const updatedData = { ...data };
    
    columns.forEach(month => {
      // Calculate TOTAL TO BE PAID TO BANK FOR AA & BOTOX LC
      const botoxLC = updatedData["PAYMENT FOR BOTOX LC"]?.[month] || 0;
      const fillersLC = updatedData["PAYMENT FOR FILLERS LC"]?.[month] || 0;
      
      if (!updatedData["TOTAL TO BE PAID TO BANK FOR AA & BOTOX LC"]) {
        updatedData["TOTAL TO BE PAID TO BANK FOR AA & BOTOX LC"] = {};
      }
      updatedData["TOTAL TO BE PAID TO BANK FOR AA & BOTOX LC"][month] = botoxLC + fillersLC;
      
      // Calculate TOTAL DUES FOR ALLERGAN & BANK
      const totalToPay = botoxLC + fillersLC;
      const paidToAllergan = updatedData["Paid to allergan to close 800k"]?.[month] || 0;
      
      if (!updatedData["TOTAL DUES FOR ALLERGAN & BANK"]) {
        updatedData["TOTAL DUES FOR ALLERGAN & BANK"] = {};
      }
      updatedData["TOTAL DUES FOR ALLERGAN & BANK"][month] = totalToPay + paidToAllergan;
    });
    
    setData(updatedData);
  };

  return (
    <div className="w-full bg-white rounded-lg shadow-sm border border-slate-200">
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-slate-200 bg-white">
              <th className="sticky left-0 bg-white z-30 px-4 py-3 text-left font-semibold text-slate-900 min-w-[300px] border-r border-slate-200 shadow-[2px_0_5px_-2px_rgba(0,0,0,0.1)]">
                Description
              </th>
              {columns.map((month) => (
                <th key={month} className="px-4 py-3 text-right font-medium text-slate-700 min-w-[120px] bg-white">
                  {month}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rowLabels.map((row, index) => {
              const isSubtotalRow = row.includes("TOTAL TO BE PAID") || row.includes("TOTAL DUES");
              const isTotalRow = row.includes("TOTAL DUES FOR ALLERGAN & BANK");
              
              return (
                <tr 
                  key={index} 
                  className={`
                    border-b border-slate-100 hover:bg-slate-50 transition-colors group
                    ${isSubtotalRow ? 'bg-slate-50 font-medium' : ''}
                    ${isTotalRow ? 'bg-slate-100 font-semibold' : ''}
                  `}
                >
                  <td className={`
                    sticky left-0 z-10 px-4 py-3 text-slate-900 border-r border-slate-200 transition-colors shadow-[2px_0_5px_-2px_rgba(0,0,0,0.1)]
                    ${isTotalRow ? 'bg-slate-100' : isSubtotalRow ? 'bg-slate-50' : 'bg-white group-hover:bg-slate-50'}
                  `}>
                    {row}
                  </td>
                  {columns.map((month) => {
                    const value = data[row]?.[month];
                    const isNegative = value && value < 0;
                    
                    return (
                      <td 
                        key={month} 
                        className={`
                          px-4 py-3 text-right
                          ${isNegative ? 'text-red-600' : 'text-slate-900'}
                          ${isTotalRow ? 'font-semibold' : ''}
                        `}
                      >
                        {formatCurrency(value)}
                      </td>
                    );
                  })}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      
      {/* Legend */}
      <div className="px-4 py-3 border-t border-slate-200 bg-slate-50">
        <div className="flex flex-wrap gap-4 text-xs text-slate-600">
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 bg-red-100 border border-red-300 rounded"></span>
            <span>Negative values (Credits/Deductions)</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 bg-slate-100 border border-slate-300 rounded"></span>
            <span>Subtotals</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 bg-slate-200 border border-slate-400 rounded"></span>
            <span>Grand Total</span>
          </div>
        </div>
      </div>
    </div>
  );
}