import { Link } from "react-router-dom";
import { Trash2, Plus, Minus, ShoppingBag } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useCart } from "@/context/CartContext";

const Cart = () => {
  const { items, removeItem, updateQuantity, subtotal, clearCart } = useCart();

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navbar />

      <main className="flex-1 max-w-5xl mx-auto w-full px-6 py-12 mt-[73px]">
        <h1 className="font-heading text-3xl md:text-4xl font-semibold text-foreground mb-10">
          Your Bag
        </h1>

        {items.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-32 text-center">
            <ShoppingBag size={48} className="text-muted-foreground mb-6" strokeWidth={1.2} />
            <p className="font-heading text-2xl text-foreground mb-2">Your bag is empty</p>
            <p className="text-muted-foreground font-body text-sm mb-8">
              Looks like you haven't added anything yet.
            </p>
            <Link
              to="/"
              className="text-sm font-semibold tracking-widest uppercase border-b border-foreground pb-0.5 hover:text-accent hover:border-accent transition-colors"
            >
              Continue Shopping
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
            {/* Item list */}
            <div className="lg:col-span-2 flex flex-col divide-y divide-border">
              {items.map((item) => (
                <div
                  key={`${item.productId}-${item.size}`}
                  className="flex gap-5 py-6 first:pt-0"
                >
                  {/* Thumbnail */}
                  <div className="w-24 h-32 md:w-32 md:h-40 flex-shrink-0 overflow-hidden bg-secondary rounded-lg">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  {/* Details */}
                  <div className="flex flex-col justify-between flex-1 min-w-0">
                    <div>
                      <p className="text-xs text-muted-foreground uppercase tracking-wider mb-1 font-body">
                        {item.category}
                      </p>
                      <h3 className="text-sm font-semibold text-foreground font-body leading-snug mb-1">
                        {item.name}
                      </h3>
                      <p className="text-xs text-muted-foreground font-body">
                        Size: {item.size}
                      </p>
                    </div>

                    <div className="flex items-center justify-between mt-3">
                      {/* Quantity */}
                      <div className="flex items-center border border-border rounded-md overflow-hidden">
                        <button
                          aria-label="Decrease quantity"
                          onClick={() =>
                            updateQuantity(item.productId, item.size, item.quantity - 1)
                          }
                          className="px-2.5 py-1.5 text-foreground hover:bg-secondary transition-colors"
                        >
                          <Minus size={13} />
                        </button>
                        <span className="px-3 py-1.5 text-sm font-medium text-foreground border-x border-border font-body">
                          {item.quantity}
                        </span>
                        <button
                          aria-label="Increase quantity"
                          onClick={() =>
                            updateQuantity(item.productId, item.size, item.quantity + 1)
                          }
                          className="px-2.5 py-1.5 text-foreground hover:bg-secondary transition-colors"
                        >
                          <Plus size={13} />
                        </button>
                      </div>

                      <div className="flex items-center gap-4">
                        <span className="text-sm font-semibold text-foreground font-body">
                          ${(item.priceNum * item.quantity).toFixed(2)}
                        </span>
                        <button
                          aria-label="Remove item"
                          onClick={() => removeItem(item.productId, item.size)}
                          className="text-muted-foreground hover:text-red-500 transition-colors"
                        >
                          <Trash2 size={15} />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}

              <button
                onClick={clearCart}
                className="mt-4 self-start text-xs text-muted-foreground hover:text-red-500 transition-colors font-body underline underline-offset-2"
              >
                Clear bag
              </button>
            </div>

            {/* Order summary */}
            <div className="lg:col-span-1">
              <div className="border border-border rounded-xl p-6 sticky top-28">
                <h2 className="font-heading text-lg font-semibold text-foreground mb-6">
                  Order Summary
                </h2>

                <div className="space-y-3 text-sm font-body">
                  <div className="flex justify-between text-muted-foreground">
                    <span>Subtotal</span>
                    <span>${subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-muted-foreground">
                    <span>Shipping</span>
                    <span>{subtotal >= 200 ? "Free" : "$12.00"}</span>
                  </div>
                  {subtotal < 200 && (
                    <p className="text-xs text-accent">
                      Add ${(200 - subtotal).toFixed(2)} more for free shipping
                    </p>
                  )}
                  <div className="border-t border-border pt-3 flex justify-between font-semibold text-foreground text-base">
                    <span>Total</span>
                    <span>
                      ${(subtotal + (subtotal >= 200 ? 0 : 12)).toFixed(2)}
                    </span>
                  </div>
                </div>

                <button className="mt-6 w-full bg-foreground text-background text-sm font-semibold tracking-widest uppercase py-3.5 rounded-lg hover:opacity-90 transition-opacity">
                  Checkout
                </button>

                <Link
                  to="/"
                  className="mt-4 block text-center text-xs text-muted-foreground hover:text-foreground transition-colors font-body"
                >
                  Continue Shopping
                </Link>
              </div>
            </div>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
};

export default Cart;
