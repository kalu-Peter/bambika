import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Bell, PackageX, TrendingUp, ShoppingCart, AlertTriangle, CheckCheck, Trash2 } from "lucide-react";

type NotifType = "order" | "stock" | "revenue" | "alert";

interface Notification {
  id: number;
  type: NotifType;
  title: string;
  message: string;
  time: string;
  read: boolean;
}

const initialNotifications: Notification[] = [
  { id: 1, type: "order", title: "New order received", message: "Order #ORD-1042 from Sophie Martin — Classic Trench Coat (M).", time: "2 min ago", read: false },
  { id: 2, type: "stock", title: "Low stock alert", message: "Wool Overcoat (Men) is down to 1 unit. Consider restocking.", time: "15 min ago", read: false },
  { id: 3, type: "revenue", title: "Revenue milestone", message: "Monthly revenue crossed $7,000 for April — on track for best month.", time: "1 hr ago", read: false },
  { id: 4, type: "stock", title: "Out of stock", message: "Suede Chelsea Boots (Women, US 6) is now out of stock.", time: "3 hrs ago", read: false },
  { id: 5, type: "alert", title: "Payment issue", message: "Order #ORD-1037 flagged for failed payment. Review required.", time: "5 hrs ago", read: false },
  { id: 6, type: "order", title: "Order delivered", message: "Order #ORD-1035 marked as delivered by courier.", time: "Yesterday", read: true },
  { id: 7, type: "revenue", title: "Weekly summary", message: "This week's sales: 18 orders, $3,420 revenue — up 12% from last week.", time: "2 days ago", read: true },
  { id: 8, type: "alert", title: "Suspicious activity", message: "Multiple failed login attempts detected. Please review admin access logs.", time: "3 days ago", read: true },
];

const typeIcon: Record<NotifType, JSX.Element> = {
  order: <ShoppingCart size={16} className="text-blue-600" />,
  stock: <PackageX size={16} className="text-red-500" />,
  revenue: <TrendingUp size={16} className="text-green-600" />,
  alert: <AlertTriangle size={16} className="text-amber-600" />,
};

const typeBg: Record<NotifType, string> = {
  order: "bg-blue-50",
  stock: "bg-red-50",
  revenue: "bg-green-50",
  alert: "bg-amber-50",
};

export default function AdminNotifications() {
  const [notifications, setNotifications] = useState<Notification[]>(initialNotifications);

  const unread = notifications.filter((n) => !n.read).length;

  const markAllRead = () =>
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));

  const markRead = (id: number) =>
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, read: true } : n))
    );

  const dismiss = (id: number) =>
    setNotifications((prev) => prev.filter((n) => n.id !== id));

  const clearAll = () => setNotifications([]);

  return (
    <div className="p-8 space-y-6">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div>
          <h2 className="text-2xl font-playfair font-bold text-stone-900">Notifications</h2>
          <p className="text-sm text-stone-500 mt-1">
            {unread > 0 ? `${unread} unread notification${unread > 1 ? "s" : ""}` : "All caught up!"}
          </p>
        </div>
        <div className="flex gap-2">
          {unread > 0 && (
            <Button
              variant="outline"
              size="sm"
              className="gap-1.5 text-sm border-stone-300"
              onClick={markAllRead}
            >
              <CheckCheck size={14} /> Mark all read
            </Button>
          )}
          {notifications.length > 0 && (
            <Button
              variant="ghost"
              size="sm"
              className="gap-1.5 text-sm text-red-500 hover:text-red-600 hover:bg-red-50"
              onClick={clearAll}
            >
              <Trash2 size={14} /> Clear all
            </Button>
          )}
        </div>
      </div>

      {/* Filter badges */}
      <div className="flex gap-2 flex-wrap">
        {(["order", "stock", "revenue", "alert"] as NotifType[]).map((type) => {
          const count = notifications.filter((n) => n.type === type && !n.read).length;
          return (
            <Badge
              key={type}
              variant="outline"
              className={`capitalize gap-1 border-stone-200 ${count > 0 ? "font-semibold" : "text-stone-400"}`}
            >
              {typeIcon[type]}
              {type}
              {count > 0 && (
                <span className="ml-0.5 bg-stone-200 text-stone-700 rounded-full px-1.5 text-xs">
                  {count}
                </span>
              )}
            </Badge>
          );
        })}
      </div>

      {/* Notification list */}
      <Card className="border-stone-200">
        <CardHeader className="pb-2">
          <CardTitle className="text-base font-semibold text-stone-800 flex items-center gap-2">
            <Bell size={16} className="text-amber-500" />
            All Notifications ({notifications.length})
          </CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          {notifications.length === 0 ? (
            <div className="py-16 text-center">
              <Bell size={36} className="mx-auto text-stone-200 mb-3" />
              <p className="text-stone-400 text-sm">No notifications.</p>
            </div>
          ) : (
            <ul className="divide-y divide-stone-100">
              {notifications.map((n) => (
                <li
                  key={n.id}
                  className={`flex items-start gap-3 px-5 py-4 transition-colors ${
                    n.read ? "bg-white" : "bg-stone-50"
                  }`}
                >
                  {/* Icon */}
                  <div className={`mt-0.5 p-2 rounded-full shrink-0 ${typeBg[n.type]}`}>
                    {typeIcon[n.type]}
                  </div>

                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <p className={`text-sm font-medium ${n.read ? "text-stone-600" : "text-stone-900"}`}>
                        {n.title}
                      </p>
                      {!n.read && (
                        <span className="w-2 h-2 rounded-full bg-amber-500 shrink-0" />
                      )}
                    </div>
                    <p className="text-xs text-stone-500 mt-0.5 leading-relaxed">{n.message}</p>
                    <p className="text-xs text-stone-400 mt-1">{n.time}</p>
                  </div>

                  {/* Actions */}
                  <div className="flex gap-1 shrink-0">
                    {!n.read && (
                      <Button
                        variant="ghost"
                        size="sm"
                        className="h-7 px-2 text-xs text-stone-400 hover:text-stone-700"
                        onClick={() => markRead(n.id)}
                      >
                        <CheckCheck size={13} />
                      </Button>
                    )}
                    <Button
                      variant="ghost"
                      size="sm"
                      className="h-7 px-2 text-xs text-stone-400 hover:text-red-500"
                      onClick={() => dismiss(n.id)}
                    >
                      <Trash2 size={13} />
                    </Button>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
