import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  AreaChart, Area,
  BarChart, Bar,
  PieChart, Pie, Cell, Tooltip as PieTooltip, Legend,
  XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer,
} from "recharts";
import { TrendingUp, TrendingDown, DollarSign } from "lucide-react";

const monthly = [
  { month: "Jul", revenue: 3800, orders: 41 },
  { month: "Aug", revenue: 4500, orders: 50 },
  { month: "Sep", revenue: 4100, orders: 47 },
  { month: "Oct", revenue: 5200, orders: 59 },
  { month: "Nov", revenue: 4200, orders: 46 },
  { month: "Dec", revenue: 7800, orders: 88 },
  { month: "Jan", revenue: 5100, orders: 57 },
  { month: "Feb", revenue: 6300, orders: 70 },
  { month: "Mar", revenue: 8900, orders: 99 },
  { month: "Apr", revenue: 7200, orders: 80 },
];

const byCategory = [
  { name: "Clothing", value: 18400 },
  { name: "Shoes", value: 14200 },
  { name: "Bags", value: 9700 },
];
const PIE_COLORS = ["#d97706", "#78716c", "#a8a29e"];

const topProducts = [
  { name: "Wool Overcoat", sold: 38, revenue: "$14,250" },
  { name: "Classic Trench Coat", sold: 34, revenue: "$9,826" },
  { name: "Structured Tote", sold: 31, revenue: "$6,975" },
  { name: "Suede Chelsea Boots", sold: 28, revenue: "$7,420" },
  { name: "Linen Blazer (Men)", sold: 25, revenue: "$6,375" },
];

const totalRevenue = monthly.reduce((s, m) => s + m.revenue, 0);
const lastMonth = monthly[monthly.length - 1].revenue;
const prevMonth = monthly[monthly.length - 2].revenue;
const growth = (((lastMonth - prevMonth) / prevMonth) * 100).toFixed(1);
const isUp = lastMonth >= prevMonth;

export default function AdminRevenue() {
  return (
    <div className="p-8 space-y-8">
      <div>
        <h2 className="text-2xl font-playfair font-bold text-stone-900">Revenue</h2>
        <p className="text-sm text-stone-500 mt-1">Sales performance over the last 10 months.</p>
      </div>

      {/* KPI cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
        <Card className="border-stone-200">
          <CardContent className="flex items-start gap-4 pt-5">
            <div className="p-2.5 rounded-lg bg-amber-50">
              <DollarSign size={20} className="text-amber-600" />
            </div>
            <div>
              <p className="text-xs text-stone-500 font-medium">Total Revenue (10 mo)</p>
              <p className="text-2xl font-bold text-stone-900">${totalRevenue.toLocaleString()}</p>
            </div>
          </CardContent>
        </Card>

        <Card className="border-stone-200">
          <CardContent className="flex items-start gap-4 pt-5">
            <div className={`p-2.5 rounded-lg ${isUp ? "bg-green-50" : "bg-red-50"}`}>
              {isUp
                ? <TrendingUp size={20} className="text-green-600" />
                : <TrendingDown size={20} className="text-red-500" />}
            </div>
            <div>
              <p className="text-xs text-stone-500 font-medium">Month-on-Month Growth</p>
              <p className={`text-2xl font-bold ${isUp ? "text-green-600" : "text-red-500"}`}>
                {isUp ? "+" : ""}{growth}%
              </p>
            </div>
          </CardContent>
        </Card>

        <Card className="border-stone-200">
          <CardContent className="flex items-start gap-4 pt-5">
            <div className="p-2.5 rounded-lg bg-blue-50">
              <TrendingUp size={20} className="text-blue-600" />
            </div>
            <div>
              <p className="text-xs text-stone-500 font-medium">Avg Monthly Revenue</p>
              <p className="text-2xl font-bold text-stone-900">
                ${Math.round(totalRevenue / monthly.length).toLocaleString()}
              </p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Area chart */}
      <Card className="border-stone-200">
        <CardHeader className="pb-2">
          <CardTitle className="text-base font-semibold text-stone-800">Monthly Revenue Trend</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={240}>
            <AreaChart data={monthly}>
              <defs>
                <linearGradient id="revGrad2" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#d97706" stopOpacity={0.25} />
                  <stop offset="95%" stopColor="#d97706" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#f5f5f4" />
              <XAxis dataKey="month" tick={{ fontSize: 12 }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 12 }} axisLine={false} tickLine={false} tickFormatter={(v) => `$${v / 1000}k`} />
              <Tooltip formatter={(v: number) => [`$${v.toLocaleString()}`, "Revenue"]} />
              <Area type="monotone" dataKey="revenue" stroke="#d97706" strokeWidth={2} fill="url(#revGrad2)" />
            </AreaChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-5">
        {/* Orders bar chart */}
        <Card className="border-stone-200">
          <CardHeader className="pb-2">
            <CardTitle className="text-base font-semibold text-stone-800">Orders per Month</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={220}>
              <BarChart data={monthly}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f5f5f4" />
                <XAxis dataKey="month" tick={{ fontSize: 12 }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fontSize: 12 }} axisLine={false} tickLine={false} />
                <Tooltip />
                <Bar dataKey="orders" fill="#78716c" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Pie by category */}
        <Card className="border-stone-200">
          <CardHeader className="pb-2">
            <CardTitle className="text-base font-semibold text-stone-800">Revenue by Category</CardTitle>
          </CardHeader>
          <CardContent className="flex items-center justify-center">
            <ResponsiveContainer width="100%" height={220}>
              <PieChart>
                <Pie data={byCategory} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={80} label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}>
                  {byCategory.map((_, i) => (
                    <Cell key={i} fill={PIE_COLORS[i]} />
                  ))}
                </Pie>
                <PieTooltip formatter={(v: number) => [`$${v.toLocaleString()}`, "Revenue"]} />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Top products table */}
      <Card className="border-stone-200">
        <CardHeader className="pb-2">
          <CardTitle className="text-base font-semibold text-stone-800">Top-Selling Products</CardTitle>
        </CardHeader>
        <CardContent>
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-stone-100">
                {["#", "Product", "Units Sold", "Revenue"].map((h) => (
                  <th key={h} className="text-left py-2 px-3 text-xs font-medium text-stone-500">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {topProducts.map((p, i) => (
                <tr key={p.name} className="border-b border-stone-50 hover:bg-stone-50 transition-colors">
                  <td className="py-2.5 px-3 text-stone-400 font-medium">{i + 1}</td>
                  <td className="py-2.5 px-3 text-stone-800 font-medium">{p.name}</td>
                  <td className="py-2.5 px-3 text-stone-600">{p.sold}</td>
                  <td className="py-2.5 px-3 font-semibold text-stone-900">{p.revenue}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </CardContent>
      </Card>
    </div>
  );
}
