import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import Index from "./pages/Index.tsx";
import Clothing from "./pages/Clothing.tsx";
import Shoes from "./pages/Shoes.tsx";
import Bags from "./pages/Bags.tsx";
import ClothingWomen from "./pages/ClothingWomen.tsx";
import ClothingMen from "./pages/ClothingMen.tsx";
import ShoesWomen from "./pages/ShoesWomen.tsx";
import ShoesMen from "./pages/ShoesMen.tsx";
import Cart from "./pages/Cart.tsx";
import NotFound from "./pages/NotFound.tsx";
import { CartProvider } from "./context/CartContext.tsx";
import { AdminAuthProvider } from "./context/AdminAuthContext.tsx";
import ProtectedRoute from "./components/admin/ProtectedRoute.tsx";
import AdminLayout from "./components/admin/AdminLayout.tsx";
import AdminLogin from "./pages/admin/AdminLogin.tsx";
import AdminDashboard from "./pages/admin/AdminDashboard.tsx";
import AdminRevenue from "./pages/admin/AdminRevenue.tsx";
import AdminOutOfStock from "./pages/admin/AdminOutOfStock.tsx";
import AdminAddProduct from "./pages/admin/AdminAddProduct.tsx";
import AdminNotifications from "./pages/admin/AdminNotifications.tsx";
import AdminOrders from "./pages/admin/AdminOrders.tsx";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <AdminAuthProvider>
          <CartProvider>
            <Routes>
              {/* ── Public store routes ── */}
              <Route path="/" element={<Index />} />
              <Route path="/clothing" element={<Clothing />} />
              <Route path="/shoes" element={<Shoes />} />
              <Route path="/bags" element={<Bags />} />
              <Route path="/clothing/women" element={<ClothingWomen />} />
              <Route path="/clothing/men" element={<ClothingMen />} />
              <Route path="/shoes/women" element={<ShoesWomen />} />
              <Route path="/shoes/men" element={<ShoesMen />} />
              <Route path="/cart" element={<Cart />} />

              {/* ── Admin routes (hidden) ── */}
              <Route path="/admin" element={<Navigate to="/admin/login" replace />} />
              <Route path="/admin/login" element={<AdminLogin />} />
              <Route element={<ProtectedRoute />}>
                <Route element={<AdminLayout />}>
                  <Route path="/admin/dashboard" element={<AdminDashboard />} />
                  <Route path="/admin/revenue" element={<AdminRevenue />} />
                  <Route path="/admin/out-of-stock" element={<AdminOutOfStock />} />
                  <Route path="/admin/add-product" element={<AdminAddProduct />} />
                  <Route path="/admin/orders" element={<AdminOrders />} />
                  <Route path="/admin/notifications" element={<AdminNotifications />} />
                </Route>
              </Route>

              {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </CartProvider>
        </AdminAuthProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
