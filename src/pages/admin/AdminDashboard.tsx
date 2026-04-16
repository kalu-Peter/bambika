import { products } from "@/data/products";
import { Package, TrendingUp, PackageX, Bell, ShoppingBag } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

// Mock data helpers
const LOW_STOCK_THRESHOLD = 3;
const mockStock: Record<number, number> = Object.fromEntries(
  products.map((p) => [p.id, Math.floor(Math.random() * 10)])
);
const outOfStockCount = products.filter((p) => mockStock[p.id] <= LOW_STOCK_THRESHOLD).length;

const revenueData = [
  { month: "Nov", revenue: 4200 },
  { month: "Dec", revenue: 7800 },
  { month: "Jan", revenue: 5100 },
  { month: "Feb", revenue: 6300 },
  { month: "Mar", revenue: 8900 },
  { month: "Apr", revenue: 7200 },
];

const recentOrders = [
  { id: "#ORD-1042", customer: "Sophie Martin", product: "Classic Trench Coat", amount: "$289", status: "Delivered" },
  { id: "#ORD-1041", customer: "James Oduya", product: "Derby Leather Shoes", amount: "$225", status: "Shipped" },
  { id: "#ORD-1040", customer: "Amara Diallo", product: "Structured Tote", amount: "$225", status: "Processing" },
  { id: "#ORD-1039", customer: "Lena Bauer", product: "Suede Chelsea Boots", amount: "$265", status: "Delivered" },
  { id: "#ORD-1038", customer: "Kwame Asante", product: "Wool Overcoat", amount: "$375", status: "Cancelled" },
];

const statusColor: Record<string, string> = {
  Delivered: "text-green-600 bg-green-50",
  Shipped: "text-blue-600 bg-blue-50",
  Processing: "text-amber-600 bg-amber-50",
  Cancelled: "text-red-500 bg-red-50",
};

const statCards = [
  {
    title: "Total Products",
    value: products.length,
    icon: Package,
    color: "text-blue-600",
    bg: "bg-blue-50",
    sub: "across all categories",
  },
  {
    title: "Monthly Revenue",
    value: "$7,200",
    icon: TrendingUp,
    color: "text-green-600",
    bg: "bg-green-50",
    sub: "+14% from last month",
  },
  {
    title: "Low / Out of Stock",
    value: outOfStockCount,
    icon: PackageX,
    color: "text-red-500",
    bg: "bg-red-50",
    sub: "items need restocking",
  },
  {
    title: "New Notifications",
    value: 5,
    icon: Bell,
    color: "text-amber-600",
    bg: "bg-amber-50",
    sub: "unread alerts",
  },
];

export default function AdminDashboard() {
  return (
    <div className="p-8 space-y-8">
      {/* Header */}
      <div>
        <h2 className="text-2xl font-playfair font-bold text-stone-900">Dashboard</h2>
        <p className="text-sm text-stone-500 mt-1">Welcome back. Here's what's happening today.</p>
      </div>

      {/* Stat cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5">
        {statCards.map(({ title, value, icon: Icon, color, bg, sub }) => (
          <Card key={title} className="border-stone-200">
            <CardContent className="flex items-start gap-4 pt-5">
              <div className={`p-2.5 rounded-lg ${bg}`}>
                <Icon size={20} className={color} />
              </div>
              <div>
                <p className="text-xs text-stone-500 font-medium">{title}</p>
                <p className="text-2xl font-bold text-stone-900 mt-0.5">{value}</p>
                <p className="text-xs text-stone-400 mt-0.5">{sub}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Revenue chart */}
      <Card className="border-stone-200">
        <CardHeader className="pb-2">
          <CardTitle className="text-base font-semibold text-stone-800 flex items-center gap-2">
            <ShoppingBag size={16} className="text-amber-500" />
            Revenue Overview
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={220}>
            <AreaChart data={revenueData}>
              <defs>
                <linearGradient id="revGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#d97706" stopOpacity={0.25} />
                  <stop offset="95%" stopColor="#d97706" stopOpacity={0} />
                </linearGradient>
              </defs>
              <XAxis dataKey="month" tick={{ fontSize: 12 }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 12 }} axisLine={false} tickLine={false} tickFormatter={(v) => `$${v / 1000}k`} />
              <Tooltip formatter={(v: number) => [`$${v.toLocaleString()}`, "Revenue"]} />
              <Area
                type="monotone"
                dataKey="revenue"
                stroke="#d97706"
                strokeWidth={2}
                fill="url(#revGrad)"
              />
            </AreaChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Recent orders */}
      <Card className="border-stone-200">
        <CardHeader className="pb-2">
          <CardTitle className="text-base font-semibold text-stone-800">Recent Orders</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-stone-100">
                  {["Order", "Customer", "Product", "Amount", "Status"].map((h) => (
                    <th key={h} className="text-left py-2 px-3 text-xs font-medium text-stone-500">
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {recentOrders.map((o) => (
                  <tr key={o.id} className="border-b border-stone-50 hover:bg-stone-50 transition-colors">
                    <td className="py-2.5 px-3 font-mono text-stone-600">{o.id}</td>
                    <td className="py-2.5 px-3 text-stone-800">{o.customer}</td>
                    <td className="py-2.5 px-3 text-stone-600">{o.product}</td>
                    <td className="py-2.5 px-3 font-medium text-stone-800">{o.amount}</td>
                    <td className="py-2.5 px-3">
                      <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${statusColor[o.status]}`}>
                        {o.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
