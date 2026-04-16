import { useState } from "react";
import { Link } from "react-router-dom";
import { ShoppingBag, Menu, X, Search, User } from "lucide-react";
import { useCart } from "@/context/CartContext";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { totalItems } = useCart();

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        <button
          className="md:hidden text-foreground"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>

        <div className="hidden md:flex items-center gap-8">
          <Link to="/clothing" className="text-sm font-medium tracking-wide text-foreground hover:text-accent transition-colors">Clothing</Link>
          <Link to="/shoes" className="text-sm font-medium tracking-wide text-foreground hover:text-accent transition-colors">Shoes</Link>
          <Link to="/bags" className="text-sm font-medium tracking-wide text-foreground hover:text-accent transition-colors">Bags</Link>
        </div>

        <Link to="/" className="font-heading text-2xl md:text-3xl font-semibold tracking-tight text-foreground absolute left-1/2 -translate-x-1/2">
          Bambika Designs
        </Link>

        <div className="flex items-center gap-4">
          <button className="text-foreground hover:text-accent transition-colors hidden md:block">
            <Search size={20} />
          </button>
          <button className="text-foreground hover:text-accent transition-colors hidden md:block">
            <User size={20} />
          </button>
          <Link
            to="/cart"
            aria-label={`Cart — ${totalItems} item${totalItems !== 1 ? "s" : ""}`}
            className="text-foreground hover:text-accent transition-colors relative"
          >
            <ShoppingBag size={20} />
            {totalItems > 0 && (
              <span className="absolute -top-1.5 -right-1.5 bg-accent text-accent-foreground text-[10px] font-semibold rounded-full w-4 h-4 flex items-center justify-center">
                {totalItems > 99 ? "99+" : totalItems}
              </span>
            )}
          </Link>
        </div>
      </div>

      {isOpen && (
        <div className="md:hidden border-t border-border bg-background px-6 py-4 space-y-3 animate-fade-in">
          <Link to="/clothing" className="block text-sm font-medium tracking-wide text-foreground">Clothing</Link>
          <Link to="/shoes" className="block text-sm font-medium tracking-wide text-foreground">Shoes</Link>
          <Link to="/bags" className="block text-sm font-medium tracking-wide text-foreground">Bags</Link>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
