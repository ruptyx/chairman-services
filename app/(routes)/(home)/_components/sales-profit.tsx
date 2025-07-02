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

export const description = "An interactive area chart showing sales, profit, and total quantities."

const chartData = [
  {
    "date": "2023-01-01",
    "sales": 485525.51,
    "profit": -80541.396,
    "quantity": 8102
  },
  {
    "date": "2023-02-01",
    "sales": 584606.672,
    "profit": -154561.817,
    "quantity": 9481
  },
  {
    "date": "2023-03-01",
    "sales": 356815.143,
    "profit": -54128.464,
    "quantity": 6069
  },
  {
    "date": "2023-04-01",
    "sales": 529065.844,
    "profit": -122653.576,
    "quantity": 8995
  },
  {
    "date": "2023-05-01",
    "sales": 294867.805,
    "profit": -35325.827000000005,
    "quantity": 5253
  },
  {
    "date": "2023-06-01",
    "sales": 275037.992,
    "profit": -32107.566,
    "quantity": 4918
  },
  {
    "date": "2023-07-01",
    "sales": 218319.09399999998,
    "profit": -31004.336000000003,
    "quantity": 3764
  },
  {
    "date": "2023-08-01",
    "sales": 359456.331,
    "profit": -68379.126,
    "quantity": 6134
  },
  {
    "date": "2023-09-01",
    "sales": 377156.722,
    "profit": -61666.245,
    "quantity": 6527
  },
  {
    "date": "2023-10-01",
    "sales": 322807.797,
    "profit": -27836.288,
    "quantity": 5780
  },
  {
    "date": "2023-11-01",
    "sales": 330704.893,
    "profit": -68537.519,
    "quantity": 6046
  },
  {
    "date": "2023-12-01",
    "sales": 171668.128,
    "profit": -32056.302,
    "quantity": 3112
  },
  {
    "date": "2024-01-01",
    "sales": 516189.802,
    "profit": -134564.985,
    "quantity": 9143
  },
  {
    "date": "2024-02-01",
    "sales": 379156.14,
    "profit": -113967.6,
    "quantity": 6815
  },
  {
    "date": "2024-03-01",
    "sales": 475233.019,
    "profit": -114697.696,
    "quantity": 8519
  },
  {
    "date": "2024-04-01",
    "sales": 362708.417,
    "profit": -69775.754,
    "quantity": 6698
  },
  {
    "date": "2024-05-01",
    "sales": 371694.95,
    "profit": -35080.862,
    "quantity": 6888
  },
  {
    "date": "2024-06-01",
    "sales": 299888.539,
    "profit": -6811.518,
    "quantity": 5555
  },
  {
    "date": "2024-07-01",
    "sales": 253478.525,
    "profit": 6452.923000000001,
    "quantity": 4707
  },
  {
    "date": "2024-08-01",
    "sales": 312070.746,
    "profit": 2468.1199999999985,
    "quantity": 5612
  },
  {
    "date": "2024-09-01",
    "sales": 387744.153,
    "profit": -10627.109999999999,
    "quantity": 7098
  },
  {
    "date": "2024-10-01",
    "sales": 378936.071,
    "profit": -10117.723000000002,
    "quantity": 6866
  },
  {
    "date": "2024-11-01",
    "sales": 427380.898,
    "profit": -574.742,
    "quantity": 7688
  },
  {
    "date": "2024-12-01",
    "sales": 231440.02000000002,
    "profit": 15149.485000000002,
    "quantity": 4422
  },
  {
    "date": "2025-01-01",
    "sales": 441556.976,
    "profit": 22203.689000000002,
    "quantity": 7978
  },
  {
    "date": "2025-02-01",
    "sales": 341446.294,
    "profit": 4259.351000000001,
    "quantity": 6283
  },
  {
    "date": "2025-03-01",
    "sales": 478435.154,
    "profit": 18092.439,
    "quantity": 9181
  },
  {
    "date": "2025-04-01",
    "sales": 350784.77999999997,
    "profit": 23356.238,
    "quantity": 6530
  },
  {
    "date": "2025-05-01",
    "sales": 182986.751,
    "profit": 14540.033,
    "quantity": 3273
  },
  {
    "date": "2025-06-01",
    "sales": 213610.828,
    "profit": 21301.056,
    "quantity": 3933
  },
  {
    "date": "2025-07-01",
    "sales": 4811.403,
    "profit": 516.3969999999999,
    "quantity": 80
  }
]

const chartConfig = {
  sales: {
    label: "Sales (KWD)",
    color: "hsl(var(--chart-1))",
  },
  profit: {
    label: "Profit (KWD)",
    color: "hsl(var(--chart-2))",
  },
  quantity: {
    label: "Quantity",
    color: "hsl(var(--chart-3))",
  },
} satisfies ChartConfig

export function SalesProfitQuantityChart() {
  const [timeRange, setTimeRange] = React.useState("all")

  const filteredData = chartData.filter((item) => {
    if (timeRange === "all") {
      return true
    }
    const date = new Date(item.date)
    const now = new Date()
    let monthsToSubtract = 0
    if (timeRange === "12m") {
      monthsToSubtract = 12
    } else if (timeRange === "6m") {
      monthsToSubtract = 6
    } else if (timeRange === "3m") {
        monthsToSubtract = 3
    }
    const startDate = new Date(now.getFullYear(), now.getMonth() - monthsToSubtract, 1)
    return date >= startDate
  })

  return (
    <Card className="pt-0">
      <CardHeader className="flex items-center gap-2 space-y-0 border-b py-5 sm:flex-row">
        <div className="grid flex-1 gap-1">
          <CardTitle>Sales, Profit & Quantity</CardTitle>
          <CardDescription>
            Interactive chart showing sales, profit, and total quantities over time.
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
            <SelectItem value="all" className="rounded-lg">
              All Time
            </SelectItem>
            <SelectItem value="12m" className="rounded-lg">
              Last 12 months
            </SelectItem>
            <SelectItem value="6m" className="rounded-lg">
              Last 6 months
            </SelectItem>
            <SelectItem value="3m" className="rounded-lg">
              Last 3 months
            </SelectItem>
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
                <stop
                  offset="5%"
                  stopColor="var(--color-sales)"
                  stopOpacity={0.8}
                />
                <stop
                  offset="95%"
                  stopColor="var(--color-sales)"
                  stopOpacity={0.1}
                />
              </linearGradient>
              <linearGradient id="fillProfit" x1="0" y1="0" x2="0" y2="1">
                <stop
                  offset="5%"
                  stopColor="var(--color-profit)"
                  stopOpacity={0.8}
                />
                <stop
                  offset="95%"
                  stopColor="var(--color-profit)"
                  stopOpacity={0.1}
                />
              </linearGradient>
              <linearGradient id="fillQuantity" x1="0" y1="0" x2="0" y2="1">
                <stop
                  offset="5%"
                  stopColor="var(--color-quantity)"
                  stopOpacity={0.8}
                />
                <stop
                  offset="95%"
                  stopColor="var(--color-quantity)"
                  stopOpacity={0.1}
                />
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
                const date = new Date(value)
                return date.toLocaleDateString("en-US", {
                  month: "short",
                  year: "numeric"
                })
              }}
            />
            <YAxis
              tickLine={false}
              axisLine={false}
              tickMargin={8}
            />
            <ChartTooltip
              cursor={false}
              content={
                <ChartTooltipContent
                  labelFormatter={(value) => {
                    return new Date(value).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                      year: "numeric"
                    })
                  }}
                  indicator="dot"
                />
              }
            />
            <Area
              dataKey="quantity"
              type="natural"
              fill="url(#fillQuantity)"
              stroke="var(--color-quantity)"
              stackId="c"
              yAxisId={0}
            />
            <Area
              dataKey="sales"
              type="natural"
              fill="url(#fillSales)"
              stroke="var(--color-sales)"
              stackId="a"
              yAxisId={0}
            />
            <Area
              dataKey="profit"
              type="natural"
              fill="url(#fillProfit)"
              stroke="var(--color-profit)"
              stackId="b"
              yAxisId={0}
            />
            <ChartLegend content={<ChartLegendContent />} />
          </AreaChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}