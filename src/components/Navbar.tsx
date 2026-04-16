import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { ShoppingBag, Menu, X, Search, User } from "lucide-react";
import { useCart } from "@/context/CartContext";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { totalItems } = useCart();

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-stone-900 border-b border-stone-700">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        <button
          className="md:hidden text-stone-300 hover:text-amber-400 transition-colors"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>

        {/* Desktop nav links */}
        <div className="hidden md:flex items-center gap-8">
          {[
            { to: "/clothing", label: "Clothing" },
            { to: "/shoes",    label: "Shoes" },
            { to: "/bags",     label: "Bags" },
          ].map(({ to, label }) => (
            <NavLink
              key={to}
              to={to}
              className={({ isActive }) =>
                `text-sm font-medium tracking-wide transition-colors ${
                  isActive ? "text-amber-400" : "text-stone-300 hover:text-amber-400"
                }`
              }
            >
              {label}
            </NavLink>
          ))}
        </div>

        {/* Brand */}
        <Link
          to="/"
          className="font-heading text-2xl md:text-3xl font-semibold tracking-tight text-stone-100 hover:text-amber-400 transition-colors absolute left-1/2 -translate-x-1/2"
        >
          Bambika Designs
        </Link>

        {/* Right icons */}
        <div className="flex items-center gap-4">
          <button className="text-stone-300 hover:text-amber-400 transition-colors hidden md:block">
            <Search size={20} />
          </button>
          <button className="text-stone-300 hover:text-amber-400 transition-colors hidden md:block">
            <User size={20} />
          </button>
          <Link
            to="/cart"
            aria-label={`Cart — ${totalItems} item${totalItems !== 1 ? "s" : ""}`}
            className="text-stone-300 hover:text-amber-400 transition-colors relative"
          >
            <ShoppingBag size={20} />
            {totalItems > 0 && (
              <span className="absolute -top-1.5 -right-1.5 bg-amber-500 text-stone-900 text-[10px] font-bold rounded-full w-4 h-4 flex items-center justify-center">
                {totalItems > 99 ? "99+" : totalItems}
              </span>
            )}
          </Link>
        </div>
      </div>

      {/* Mobile menu */}
      {isOpen && (
        <div className="md:hidden border-t border-stone-700 bg-stone-900 px-6 py-4 space-y-1 animate-fade-in">
          {[
            { to: "/clothing", label: "Clothing" },
            { to: "/shoes",    label: "Shoes" },
            { to: "/bags",     label: "Bags" },
          ].map(({ to, label }) => (
            <NavLink
              key={to}
              to={to}
              onClick={() => setIsOpen(false)}
              className={({ isActive }) =>
                `block py-2 text-sm font-medium tracking-wide transition-colors ${
                  isActive
                    ? "text-amber-400 border-l-2 border-amber-400 pl-3"
                    : "text-stone-300 hover:text-amber-400 pl-0 hover:pl-1"
                }`
              }
            >
              {label}
            </NavLink>
          ))}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
