// app/page.tsx (Server Component)

import { OutstandingBalanceSection, CreditNoteDetails } from "@/app/(routes)/(home)/_components/outstanding-balance";
import AllerganPaymentSchedule from "@/app/(routes)/(home)/_components/payment-schedule";
import { SOASection } from "@/app/(routes)/(home)/_components/soa";
import { CurrencyStock } from "@/app/(routes)/(home)/_components/currency-stock";
import { MonthlySales } from "@/app/(routes)/(home)/_components/monthly-sales";
import { SessionWarningModal } from "@/components/ActivityProvider";
import { getOutstandingBalances, getSOAEntries, getStatements } from "@/data";
import { SalesProfitQuantityChart } from "@/app/(routes)/(home)/_components/sales-profit";

export default async function AllerganBalancePage() {
  // Fetch data server-side
  const [outstandingBalances, soaEntries, statements] = await Promise.all([
    getOutstandingBalances(),
    getSOAEntries(),
    getStatements(),
  ]);

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="container mx-auto py-8 px-4">
        <div className="mb-8">
          <h1 className="text-4xl font-bold tracking-tight text-slate-900">Allergan Balance</h1>
          <p className="text-slate-600 mt-2">
            Comprehensive overview of outstanding balances and statement of accounts
          </p>
        </div>

        {/* Two cards side by side */}
        <div className="grid gap-8 lg:grid-cols-2 mb-8">
          <div>
            <h2 className="text-2xl font-semibold mb-4 text-slate-900">Outstanding Balance</h2>
            <OutstandingBalanceSection data={outstandingBalances} statements={statements} />
          </div>

          <div>
            <h2 className="text-2xl font-semibold mb-4 text-slate-900">Statement of Account</h2>
            {/* @ts-ignore */}
            <SOASection data={soaEntries} />
          </div>
        </div>

        {/* Full-width Credit Note Details */}
        <div className="mb-8">
          <h2 className="text-2xl font-semibold mb-4 text-slate-900">Financial Details</h2>
          <CreditNoteDetails />
        </div>

        {/* Currency Stock Section */}
        <div className="mb-8">
          <h2 className="text-2xl font-semibold mb-4 text-slate-900">Inventory Overview</h2>
          <CurrencyStock />
        </div>

        {/* Monthly Sales Section */}
        <div className="mb-8">
          <h2 className="text-2xl font-semibold mb-4 text-slate-900">Sales Analysis</h2>
          <MonthlySales />
        </div>

        <SalesProfitQuantityChart />

        {/* Full Width Payment Schedule Section */}
        <div className="mt-12">
          <h2 className="text-2xl font-semibold mb-4 text-slate-900">Payment Schedule</h2>
          <AllerganPaymentSchedule />
          <SessionWarningModal 
            timeoutMs={30 * 1000} // 20 seconds total for testing
            warningMs={10 * 1000} // Show warning at 10 seconds (halfway)
          />
        </div>
      </div>
    </div>
  );
}