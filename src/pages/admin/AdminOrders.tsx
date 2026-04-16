import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Search,
  ShoppingBag,
  Eye,
  ChevronDown,
  ChevronUp,
  Package,
  Truck,
  CheckCircle2,
  XCircle,
  Clock,
  RefreshCw,
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

type OrderStatus = "Pending" | "Processing" | "Shipped" | "Delivered" | "Cancelled" | "Refunded";

interface OrderItem {
  name: string;
  category: string;
  size: string;
  qty: number;
  price: number;
}

interface Order {
  id: string;
  customer: string;
  email: string;
  date: string;
  items: OrderItem[];
  total: number;
  status: OrderStatus;
  shipping: string;
  address: string;
}

const initialOrders: Order[] = [
  {
    id: "#ORD-1042", customer: "Sophie Martin", email: "sophie.m@email.com", date: "2026-04-16",
    items: [{ name: "Classic Trench Coat", category: "Clothing", size: "M", qty: 1, price: 299 }],
    total: 299, status: "Delivered", shipping: "Free", address: "14 Rue de Rivoli, Paris, France",
  },
  {
    id: "#ORD-1041", customer: "James Oduya", email: "j.oduya@email.com", date: "2026-04-15",
    items: [
      { name: "Derby Leather Shoes", category: "Shoes", size: "US 10", qty: 1, price: 235 },
      { name: "Slim Fit Chinos", category: "Clothing", size: "32", qty: 1, price: 120 },
    ],
    total: 355, status: "Shipped", shipping: "Free", address: "8 Victoria Island, Lagos, Nigeria",
  },
  {
    id: "#ORD-1040", customer: "Amara Diallo", email: "amara.d@email.com", date: "2026-04-15",
    items: [{ name: "Structured Tote", category: "Bags", size: "Medium", qty: 1, price: 225 }],
    total: 225, status: "Processing", shipping: "Free", address: "22 Av. Hassan II, Casablanca, Morocco",
  },
  {
    id: "#ORD-1039", customer: "Lena Bauer", email: "lena.b@email.com", date: "2026-04-14",
    items: [
      { name: "Suede Chelsea Boots", category: "Shoes", size: "US 7", qty: 1, price: 265 },
      { name: "Merino Wool Sweater", category: "Clothing", size: "S", qty: 1, price: 165 },
    ],
    total: 430, status: "Delivered", shipping: "Free", address: "Unter den Linden 5, Berlin, Germany",
  },
  {
    id: "#ORD-1038", customer: "Kwame Asante", email: "k.asante@email.com", date: "2026-04-13",
    items: [{ name: "Wool Overcoat", category: "Clothing", size: "L", qty: 1, price: 385 }],
    total: 385, status: "Cancelled", shipping: "$12.00", address: "45 Ring Road, Accra, Ghana",
  },
  {
    id: "#ORD-1037", customer: "Priya Sharma", email: "priya.s@email.com", date: "2026-04-12",
    items: [
      { name: "Leather Crossbody", category: "Bags", size: "Small", qty: 1, price: 175 },
      { name: "Pointed-Toe Flats", category: "Shoes", size: "US 6", qty: 1, price: 145 },
    ],
    total: 320, status: "Delivered", shipping: "Free", address: "12 MG Road, Bengaluru, India",
  },
  {
    id: "#ORD-1036", customer: "Marco Rossi", email: "m.rossi@email.com", date: "2026-04-11",
    items: [{ name: "Linen Blazer", category: "Clothing", size: "M", qty: 1, price: 265 }],
    total: 277, status: "Shipped", shipping: "$12.00", address: "Corso Vittorio Emanuele 34, Milan, Italy",
  },
  {
    id: "#ORD-1035", customer: "Aiko Tanaka", email: "aiko.t@email.com", date: "2026-04-10",
    items: [
      { name: "Silk Slip Dress", category: "Clothing", size: "XS", qty: 1, price: 215 },
      { name: "Mini Shoulder Bag", category: "Bags", size: "Mini", qty: 1, price: 145 },
    ],
    total: 360, status: "Refunded", shipping: "Free", address: "Shibuya 2-chome, Tokyo, Japan",
  },
  {
    id: "#ORD-1034", customer: "Carlos Mendez", email: "c.mendez@email.com", date: "2026-04-09",
    items: [{ name: "Canvas Low-Tops", category: "Shoes", size: "US 9", qty: 2, price: 125 }],
    total: 262, status: "Delivered", shipping: "Free", address: "Av. Insurgentes Sur 100, Mexico City, Mexico",
  },
  {
    id: "#ORD-1033", customer: "Fatima Al-Rashid", email: "fatima.r@email.com", date: "2026-04-08",
    items: [{ name: "Raffia Basket Bag", category: "Bags", size: "Large", qty: 1, price: 155 }],
    total: 167, status: "Pending", shipping: "$12.00", address: "Al Olaya District, Riyadh, Saudi Arabia",
  },
];

const STATUS_CONFIG: Record<OrderStatus, { label: string; cls: string; icon: React.ReactNode }> = {
  Pending:    { label: "Pending",    cls: "bg-stone-100 text-stone-600 border-stone-300",   icon: <Clock size={12} /> },
  Processing: { label: "Processing", cls: "bg-amber-100 text-amber-700 border-amber-300",   icon: <RefreshCw size={12} /> },
  Shipped:    { label: "Shipped",    cls: "bg-blue-100 text-blue-700 border-blue-300",      icon: <Truck size={12} /> },
  Delivered:  { label: "Delivered",  cls: "bg-green-100 text-green-700 border-green-300",   icon: <CheckCircle2 size={12} /> },
  Cancelled:  { label: "Cancelled",  cls: "bg-red-100 text-red-600 border-red-300",         icon: <XCircle size={12} /> },
  Refunded:   { label: "Refunded",   cls: "bg-purple-100 text-purple-700 border-purple-300",icon: <RefreshCw size={12} /> },
};

const ALL_STATUSES: OrderStatus[] = ["Pending", "Processing", "Shipped", "Delivered", "Cancelled", "Refunded"];

const STAT_CARDS = (orders: Order[]) => [
  { label: "Total Orders", value: orders.length, icon: <ShoppingBag size={18} className="text-blue-600" />, bg: "bg-blue-50" },
  { label: "Pending",      value: orders.filter(o => o.status === "Pending" || o.status === "Processing").length, icon: <Clock size={18} className="text-amber-600" />, bg: "bg-amber-50" },
  { label: "Shipped",      value: orders.filter(o => o.status === "Shipped").length, icon: <Truck size={18} className="text-blue-500" />, bg: "bg-blue-50" },
  { label: "Delivered",    value: orders.filter(o => o.status === "Delivered").length, icon: <CheckCircle2 size={18} className="text-green-600" />, bg: "bg-green-50" },
];

export default function AdminOrders() {
  const { toast } = useToast();
  const [orders, setOrders] = useState<Order[]>(initialOrders);
  const [search, setSearch] = useState("");
  const [filterStatus, setFilterStatus] = useState<string>("All");
  const [sortField, setSortField] = useState<"date" | "total">("date");
  const [sortDir, setSortDir] = useState<"asc" | "desc">("desc");
  const [selected, setSelected] = useState<Order | null>(null);

  // Filter + sort
  const visible = orders
    .filter((o) => {
      const matchStatus = filterStatus === "All" || o.status === filterStatus;
      const q = search.toLowerCase();
      const matchSearch =
        o.id.toLowerCase().includes(q) ||
        o.customer.toLowerCase().includes(q) ||
        o.email.toLowerCase().includes(q);
      return matchStatus && matchSearch;
    })
    .sort((a, b) => {
      const mul = sortDir === "asc" ? 1 : -1;
      if (sortField === "date") return mul * a.date.localeCompare(b.date);
      return mul * (a.total - b.total);
    });

  const toggleSort = (field: "date" | "total") => {
    if (sortField === field) setSortDir((d) => (d === "asc" ? "desc" : "asc"));
    else { setSortField(field); setSortDir("desc"); }
  };

  const updateStatus = (id: string, status: OrderStatus) => {
    setOrders((prev) => prev.map((o) => (o.id === id ? { ...o, status } : o)));
    if (selected?.id === id) setSelected((s) => s ? { ...s, status } : s);
    toast({ title: "Status updated", description: `${id} marked as ${status}.` });
  };

  const SortIcon = ({ field }: { field: "date" | "total" }) =>
    sortField === field
      ? sortDir === "asc" ? <ChevronUp size={13} /> : <ChevronDown size={13} />
      : <ChevronDown size={13} className="opacity-30" />;

  return (
    <div className="p-8 space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-2xl font-playfair font-bold text-stone-900">Orders</h2>
        <p className="text-sm text-stone-500 mt-1">Manage and track all customer orders.</p>
      </div>

      {/* KPI cards */}
      <div className="grid grid-cols-2 xl:grid-cols-4 gap-4">
        {STAT_CARDS(orders).map(({ label, value, icon, bg }) => (
          <Card key={label} className="border-stone-200">
            <CardContent className="flex items-center gap-3 pt-4">
              <div className={`p-2 rounded-lg ${bg} shrink-0`}>{icon}</div>
              <div>
                <p className="text-xs text-stone-500">{label}</p>
                <p className="text-2xl font-bold text-stone-900">{value}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1 max-w-xs">
          <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-stone-400" />
          <Input
            placeholder="Search order, customer…"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-9 border-stone-300 h-9 text-sm"
          />
        </div>
        <Select value={filterStatus} onValueChange={setFilterStatus}>
          <SelectTrigger className="w-44 h-9 border-stone-300 text-sm">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="All">All Statuses</SelectItem>
            {ALL_STATUSES.map((s) => (
              <SelectItem key={s} value={s}>{s}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Table */}
      <Card className="border-stone-200">
        <CardHeader className="pb-2">
          <CardTitle className="text-base font-semibold text-stone-800">
            {visible.length} order{visible.length !== 1 ? "s" : ""}
          </CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          {visible.length === 0 ? (
            <div className="py-16 text-center">
              <Package size={36} className="mx-auto text-stone-200 mb-3" />
              <p className="text-stone-400 text-sm">No orders match your filters.</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-stone-100 bg-stone-50">
                    <th className="text-left py-2.5 px-4 text-xs font-medium text-stone-500">Order</th>
                    <th className="text-left py-2.5 px-4 text-xs font-medium text-stone-500">Customer</th>
                    <th
                      className="text-left py-2.5 px-4 text-xs font-medium text-stone-500 cursor-pointer select-none hover:text-stone-800 transition-colors"
                      onClick={() => toggleSort("date")}
                    >
                      <span className="flex items-center gap-1">Date <SortIcon field="date" /></span>
                    </th>
                    <th className="text-left py-2.5 px-4 text-xs font-medium text-stone-500">Items</th>
                    <th
                      className="text-left py-2.5 px-4 text-xs font-medium text-stone-500 cursor-pointer select-none hover:text-stone-800 transition-colors"
                      onClick={() => toggleSort("total")}
                    >
                      <span className="flex items-center gap-1">Total <SortIcon field="total" /></span>
                    </th>
                    <th className="text-left py-2.5 px-4 text-xs font-medium text-stone-500">Status</th>
                    <th className="text-left py-2.5 px-4 text-xs font-medium text-stone-500">Update</th>
                    <th className="py-2.5 px-4" />
                  </tr>
                </thead>
                <tbody>
                  {visible.map((order) => {
                    const { cls, icon } = STATUS_CONFIG[order.status];
                    return (
                      <tr
                        key={order.id}
                        className="border-b border-stone-50 hover:bg-stone-50 transition-colors"
                      >
                        <td className="py-3 px-4 font-mono text-xs text-stone-600 font-medium">
                          {order.id}
                        </td>
                        <td className="py-3 px-4">
                          <p className="text-stone-800 font-medium text-sm">{order.customer}</p>
                          <p className="text-stone-400 text-xs">{order.email}</p>
                        </td>
                        <td className="py-3 px-4 text-stone-500 text-xs whitespace-nowrap">
                          {order.date}
                        </td>
                        <td className="py-3 px-4 text-stone-600 text-xs">
                          {order.items.length} item{order.items.length !== 1 ? "s" : ""}
                        </td>
                        <td className="py-3 px-4 font-semibold text-stone-900">
                          ${order.total.toLocaleString()}
                        </td>
                        <td className="py-3 px-4">
                          <Badge
                            variant="outline"
                            className={`gap-1 text-xs font-medium ${cls}`}
                          >
                            {icon}
                            {order.status}
                          </Badge>
                        </td>
                        <td className="py-3 px-4">
                          <Select
                            value={order.status}
                            onValueChange={(v) => updateStatus(order.id, v as OrderStatus)}
                          >
                            <SelectTrigger className="h-7 w-36 border-stone-200 text-xs">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              {ALL_STATUSES.map((s) => (
                                <SelectItem key={s} value={s} className="text-xs">
                                  {s}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </td>
                        <td className="py-3 px-4">
                          <Button
                            variant="ghost"
                            size="sm"
                            className="h-7 w-7 p-0 text-stone-400 hover:text-amber-600"
                            onClick={() => setSelected(order)}
                          >
                            <Eye size={14} />
                          </Button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Order detail dialog */}
      <Dialog open={!!selected} onOpenChange={(open) => !open && setSelected(null)}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle className="text-stone-900 font-playfair text-lg">
              Order {selected?.id}
            </DialogTitle>
          </DialogHeader>

          {selected && (
            <div className="space-y-5 text-sm">
              {/* Customer */}
              <div className="grid grid-cols-2 gap-3">
                <div className="bg-stone-50 rounded-lg p-3">
                  <p className="text-xs text-stone-400 mb-1">Customer</p>
                  <p className="font-medium text-stone-900">{selected.customer}</p>
                  <p className="text-xs text-stone-500">{selected.email}</p>
                </div>
                <div className="bg-stone-50 rounded-lg p-3">
                  <p className="text-xs text-stone-400 mb-1">Order Date</p>
                  <p className="font-medium text-stone-900">{selected.date}</p>
                  <p className="text-xs text-stone-500">Shipping: {selected.shipping}</p>
                </div>
              </div>

              {/* Shipping address */}
              <div className="bg-stone-50 rounded-lg p-3">
                <p className="text-xs text-stone-400 mb-1">Shipping Address</p>
                <p className="text-stone-700">{selected.address}</p>
              </div>

              {/* Items */}
              <div>
                <p className="text-xs font-semibold text-stone-500 uppercase tracking-wider mb-2">
                  Items
                </p>
                <div className="divide-y divide-stone-100 border border-stone-200 rounded-lg overflow-hidden">
                  {selected.items.map((item, i) => (
                    <div key={i} className="flex items-center justify-between px-3 py-2.5">
                      <div>
                        <p className="font-medium text-stone-800">{item.name}</p>
                        <p className="text-xs text-stone-400">
                          {item.category} · Size {item.size} · Qty {item.qty}
                        </p>
                      </div>
                      <p className="font-semibold text-stone-900">
                        ${(item.price * item.qty).toLocaleString()}
                      </p>
                    </div>
                  ))}
                  <div className="flex justify-between px-3 py-2.5 bg-stone-50">
                    <p className="font-semibold text-stone-700">Total</p>
                    <p className="font-bold text-stone-900">${selected.total.toLocaleString()}</p>
                  </div>
                </div>
              </div>

              {/* Status update */}
              <div>
                <p className="text-xs font-semibold text-stone-500 uppercase tracking-wider mb-2">
                  Update Status
                </p>
                <div className="flex flex-wrap gap-2">
                  {ALL_STATUSES.map((s) => {
                    const { cls } = STATUS_CONFIG[s];
                    const isActive = selected.status === s;
                    return (
                      <button
                        key={s}
                        onClick={() => updateStatus(selected.id, s)}
                        className={`px-3 py-1.5 rounded-full text-xs font-medium border transition-all ${
                          isActive
                            ? `${cls} ring-2 ring-offset-1 ring-amber-400`
                            : "border-stone-200 text-stone-500 hover:border-stone-400"
                        }`}
                      >
                        {s}
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
