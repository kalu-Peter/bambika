import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { useAdminAuth } from "@/context/AdminAuthContext";
import {
  LayoutDashboard,
  TrendingUp,
  PackageX,
  PlusSquare,
  Bell,
  LogOut,
  ShieldCheck,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

const navItems = [
  { to: "/admin/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { to: "/admin/revenue", label: "Revenue", icon: TrendingUp },
  { to: "/admin/out-of-stock", label: "Out of Stock", icon: PackageX },
  { to: "/admin/add-product", label: "Add Product", icon: PlusSquare },
  { to: "/admin/notifications", label: "Notifications", icon: Bell },
];

export default function AdminLayout() {
  const { logout } = useAdminAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/admin/login");
  };

  return (
    <div className="flex h-screen bg-stone-50 overflow-hidden">
      {/* Sidebar */}
      <aside className="w-60 shrink-0 bg-stone-900 text-stone-100 flex flex-col">
        {/* Brand */}
        <div className="flex items-center gap-2 px-6 py-5 border-b border-stone-700">
          <ShieldCheck size={20} className="text-amber-400" />
          <span className="font-playfair text-lg font-semibold tracking-wide">
            Bambika <span className="text-amber-400">Admin</span>
          </span>
        </div>

        {/* Nav */}
        <nav className="flex-1 py-4 overflow-y-auto">
          {navItems.map(({ to, label, icon: Icon }) => (
            <NavLink
              key={to}
              to={to}
              className={({ isActive }) =>
                cn(
                  "flex items-center gap-3 px-6 py-3 text-sm transition-colors",
                  isActive
                    ? "bg-amber-500/20 text-amber-400 border-r-2 border-amber-400"
                    : "text-stone-400 hover:text-stone-100 hover:bg-stone-800"
                )
              }
            >
              <Icon size={17} />
              {label}
            </NavLink>
          ))}
        </nav>

        {/* Logout */}
        <div className="px-4 py-4 border-t border-stone-700">
          <Button
            variant="ghost"
            size="sm"
            onClick={handleLogout}
            className="w-full justify-start gap-3 text-stone-400 hover:text-red-400 hover:bg-stone-800"
          >
            <LogOut size={16} />
            Logout
          </Button>
        </div>
      </aside>

      {/* Main content */}
      <main className="flex-1 overflow-y-auto">
        <Outlet />
      </main>
    </div>
  );
}
