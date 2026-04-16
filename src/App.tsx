import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
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

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <CartProvider>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/clothing" element={<Clothing />} />
            <Route path="/shoes" element={<Shoes />} />
            <Route path="/bags" element={<Bags />} />
            <Route path="/clothing/women" element={<ClothingWomen />} />
            <Route path="/clothing/men" element={<ClothingMen />} />
            <Route path="/shoes/women" element={<ShoesWomen />} />
            <Route path="/shoes/men" element={<ShoesMen />} />
            <Route path="/cart" element={<Cart />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </CartProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
