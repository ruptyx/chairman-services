"use client"

import * as React from "react"
import { Area, AreaChart, CartesianGrid, XAxis, YAxis } from "recharts"

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  ChartConfig,
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

export const description = "An interactive area chart showing sales, net value, and total quantities with accessible RGB colors."

const chartData = [
  { "date": "2023-01-31", "sales": 485525.51, "quantity": 8102, "net_value": 75440.22300000001 },
  { "date": "2023-02-28", "sales": 584606.672, "quantity": 9481, "net_value": 83873.27600000001 },
  { "date": "2023-03-31", "sales": 356815.143, "quantity": 6069, "net_value": 45710.126 },
  { "date": "2023-04-30", "sales": 529065.844, "quantity": 8995, "net_value": 86165.924 },
  { "date": "2023-05-31", "sales": 294867.805, "quantity": 5253, "net_value": 46022.201 },
  { "date": "2023-06-30", "sales": 275037.992, "quantity": 4918, "net_value": 40640.583999999995 },
  { "date": "2023-07-31", "sales": 218319.09399999998, "quantity": 3764, "net_value": 36504.19699999999 },
  { "date": "2023-08-31", "sales": 359456.331, "quantity": 6134, "net_value": 54447.94499999999 },
  { "date": "2023-09-30", "sales": 377156.722, "quantity": 6527, "net_value": 97478.677 },
  { "date": "2023-10-31", "sales": 322807.797, "quantity": 5780, "net_value": 53988.774000000005 },
  { "date": "2023-11-30", "sales": 330704.893, "quantity": 6046, "net_value": 53418.422000000006 },
  { "date": "2023-12-31", "sales": 171668.128, "quantity": 3112, "net_value": 27417.740999999998 },
  { "date": "2024-01-31", "sales": 516189.802, "quantity": 9143, "net_value": 80544.82100000003 },
  { "date": "2024-02-29", "sales": 379156.14, "quantity": 6815, "net_value": 62418.869999999995 },
  { "date": "2024-03-31", "sales": 475233.019, "quantity": 8519, "net_value": 87830.674 },
  { "date": "2024-04-30", "sales": 362708.417, "quantity": 6698, "net_value": 65131.69600000001 },
  { "date": "2024-05-31", "sales": 371694.95, "quantity": 6888, "net_value": 57144.147999999994 },
  { "date": "2024-06-30", "sales": 299888.539, "quantity": 5555, "net_value": 55186.861999999994 },
  { "date": "2024-07-31", "sales": 253478.525, "quantity": 4707, "net_value": 38458.033 },
  { "date": "2024-08-31", "sales": 312070.746, "quantity": 5612, "net_value": 46179.95999999999 },
  { "date": "2024-09-30", "sales": 387744.153, "quantity": 7098, "net_value": 67745.79 },
  { "date": "2024-10-31", "sales": 378936.071, "quantity": 6866, "net_value": 55149.492 },
  { "date": "2024-11-30", "sales": 427380.898, "quantity": 7688, "net_value": 67947.308 },
  { "date": "2024-12-31", "sales": 231440.02000000002, "quantity": 4422, "net_value": 39762.535 },
  { "date": "2025-01-31", "sales": 441556.976, "quantity": 7978, "net_value": 74175.514 },
  { "date": "2025-02-28", "sales": 341446.294, "quantity": 6283, "net_value": 48206.171 },
  { "date": "2025-03-31", "sales": 478435.154, "quantity": 9181, "net_value": 71173.439 },
  { "date": "2025-04-30", "sales": 350784.77999999997, "quantity": 6530, "net_value": 49825.308000000005 },
  { "date": "2025-05-31", "sales": 182986.751, "quantity": 3273, "net_value": 24252.119 },
  { "date": "2025-06-30", "sales": 213610.828, "quantity": 3933, "net_value": 21301.056 },
  { "date": "2025-07-31", "sales": 4811.403, "quantity": 80, "net_value": 516.3969999999999 }
]

const chartConfig = {
  sales: {
    label: "Sales (KWD)",
    color: "rgb(59, 130, 246)",
  },
  net_value: {
    label: "Net Value (KWD)",
    color: "rgb(251, 146, 60)",
  },
  quantity: {
    label: "Quantity",
    color: "rgb(139, 92, 246)",
  },
} satisfies ChartConfig

export function CombinedChart() {
  const [timeRange, setTimeRange] = React.useState("all")

  const filteredData = chartData.filter((item) => {
    if (timeRange === "all") return true;
    const date = new Date(item.date);
    const now = new Date();
    let monthsToSubtract = 0;
    if (timeRange === "12m") monthsToSubtract = 12;
    else if (timeRange === "6m") monthsToSubtract = 6;
    else if (timeRange === "3m") monthsToSubtract = 3;
    const startDate = new Date(now.getFullYear(), now.getMonth() - monthsToSubtract, 1);
    return date >= startDate;
  })

  return (
    <Card className="pt-0">
      <CardHeader className="flex items-center gap-2 space-y-0 border-b py-5 sm:flex-row">
        <div className="grid flex-1 gap-1">
          <CardTitle>Combined Monthly Report</CardTitle>
          <CardDescription>
            Sales, Net Value (Profit + Credit), and Quantity over time.
          </CardDescription>
        </div>
        <Select value={timeRange} onValueChange={setTimeRange}>
          <SelectTrigger
            className="hidden w-[160px] rounded-lg sm:ml-auto sm:flex"
            aria-label="Select a value"
          >
            <SelectValue placeholder="Select time range" />
          </SelectTrigger>
          <SelectContent className="rounded-xl">
            <SelectItem value="all" className="rounded-lg">All Time</SelectItem>
            <SelectItem value="12m" className="rounded-lg">Last 12 months</SelectItem>
            <SelectItem value="6m" className="rounded-lg">Last 6 months</SelectItem>
            <SelectItem value="3m" className="rounded-lg">Last 3 months</SelectItem>
          </SelectContent>
        </Select>
      </CardHeader>
      <CardContent className="px-2 pt-4 sm:px-6 sm:pt-6">
        <ChartContainer
          config={chartConfig}
          className="aspect-auto h-[350px] w-full"
        >
          <AreaChart data={filteredData}>
            <defs>
              <linearGradient id="fillSales" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="rgb(59, 130, 246)" stopOpacity={0.8} />
                <stop offset="95%" stopColor="rgb(59, 130, 246)" stopOpacity={0.1} />
              </linearGradient>
              <linearGradient id="fillNetValue" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="rgb(251, 146, 60)" stopOpacity={0.8} />
                <stop offset="95%" stopColor="rgb(251, 146, 60)" stopOpacity={0.1} />
              </linearGradient>
              <linearGradient id="fillQuantity" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="rgb(139, 92, 246)" stopOpacity={0.8} />
                <stop offset="95%" stopColor="rgb(139, 92, 246)" stopOpacity={0.1} />
              </linearGradient>
            </defs>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="date"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              minTickGap={32}
              tickFormatter={(value) => {
                const date = new Date(value);
                return date.toLocaleDateString("en-US", { month: "short", year: "numeric" });
              }}
            />
            <YAxis tickLine={false} axisLine={false} tickMargin={8} />
            <ChartTooltip
              cursor={false}
              content={
                <ChartTooltipContent
                  labelFormatter={(value) => new Date(value).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
                  indicator="dot"
                />
              }
            />
            <Area
              dataKey="sales"
              type="natural"
              fill="url(#fillSales)"
              stroke="rgb(59, 130, 246)"
              stackId="a"
            />
            <Area
              dataKey="net_value"
              type="natural"
              fill="url(#fillNetValue)"
              stroke="rgb(251, 146, 60)"
              stackId="b"
            />
            <Area
              dataKey="quantity"
              type="natural"
              fill="url(#fillQuantity)"
              stroke="rgb(139, 92, 246)"
              stackId="c"
            />
            <ChartLegend content={<ChartLegendContent />} />
          </AreaChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}