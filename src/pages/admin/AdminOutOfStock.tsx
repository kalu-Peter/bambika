import { useState } from "react";
import { products, Product } from "@/data/products";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { PackageX, Search, RefreshCw } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

// Deterministic mock stock based on product id (avoids re-renders randomising)
function mockStockLevel(id: number) {
  return ((id * 7) % 11); // 0-10, biased low for demo
}

interface StockItem extends Product {
  stock: number;
}

const stockItems: StockItem[] = products.map((p) => ({
  ...p,
  stock: mockStockLevel(p.id),
}));

function stockLabel(stock: number) {
  if (stock === 0) return { label: "Out of Stock", cls: "bg-red-100 text-red-600 border-red-200" };
  if (stock <= 2) return { label: "Critical", cls: "bg-orange-100 text-orange-600 border-orange-200" };
  return { label: "Low Stock", cls: "bg-amber-100 text-amber-600 border-amber-200" };
}

const LOW_THRESHOLD = 4;

export default function AdminOutOfStock() {
  const { toast } = useToast();
  const [search, setSearch] = useState("");
  const [restocked, setRestocked] = useState<Set<number>>(new Set());

  const lowItems = stockItems
    .filter((p) => p.stock < LOW_THRESHOLD && !restocked.has(p.id))
    .filter((p) =>
      [p.name, p.category, p.gender ?? ""].join(" ").toLowerCase().includes(search.toLowerCase())
    );

  const handleRestock = (id: number, name: string) => {
    setRestocked((prev) => new Set([...prev, id]));
    toast({ title: "Restock requested", description: `${name} has been flagged for restocking.` });
  };

  return (
    <div className="p-8 space-y-6">
      <div>
        <h2 className="text-2xl font-playfair font-bold text-stone-900">Out of Stock</h2>
        <p className="text-sm text-stone-500 mt-1">Items below the restocking threshold ({LOW_THRESHOLD} units).</p>
      </div>

      {/* Summary */}
      <div className="flex gap-4 flex-wrap">
        <Card className="border-stone-200 flex-1 min-w-[150px]">
          <CardContent className="pt-4 flex items-center gap-3">
            <PackageX size={20} className="text-red-500 shrink-0" />
            <div>
              <p className="text-xs text-stone-500">Out of Stock</p>
              <p className="text-xl font-bold text-stone-900">
                {lowItems.filter((p) => p.stock === 0).length}
              </p>
            </div>
          </CardContent>
        </Card>
        <Card className="border-stone-200 flex-1 min-w-[150px]">
          <CardContent className="pt-4 flex items-center gap-3">
            <PackageX size={20} className="text-orange-500 shrink-0" />
            <div>
              <p className="text-xs text-stone-500">Critical (&le;2)</p>
              <p className="text-xl font-bold text-stone-900">
                {lowItems.filter((p) => p.stock > 0 && p.stock <= 2).length}
              </p>
            </div>
          </CardContent>
        </Card>
        <Card className="border-stone-200 flex-1 min-w-[150px]">
          <CardContent className="pt-4 flex items-center gap-3">
            <PackageX size={20} className="text-amber-500 shrink-0" />
            <div>
              <p className="text-xs text-stone-500">Low Stock (3)</p>
              <p className="text-xl font-bold text-stone-900">
                {lowItems.filter((p) => p.stock === 3).length}
              </p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Search */}
      <div className="relative max-w-xs">
        <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-stone-400" />
        <Input
          placeholder="Search products…"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="pl-9 border-stone-300"
        />
      </div>

      {/* Table */}
      <Card className="border-stone-200">
        <CardHeader className="pb-2">
          <CardTitle className="text-base font-semibold text-stone-800">
            Low / Out-of-Stock Items ({lowItems.length})
          </CardTitle>
        </CardHeader>
        <CardContent>
          {lowItems.length === 0 ? (
            <div className="py-16 text-center">
              <PackageX size={36} className="mx-auto text-stone-300 mb-3" />
              <p className="text-stone-500 text-sm">No items match your search, or all have been restocked.</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-stone-100">
                    {["Product", "Category", "Gender", "Price", "Stock", "Status", "Action"].map((h) => (
                      <th key={h} className="text-left py-2 px-3 text-xs font-medium text-stone-500">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {lowItems.map((item) => {
                    const { label, cls } = stockLabel(item.stock);
                    return (
                      <tr key={item.id} className="border-b border-stone-50 hover:bg-stone-50 transition-colors">
                        <td className="py-2.5 px-3 font-medium text-stone-800">{item.name}</td>
                        <td className="py-2.5 px-3 text-stone-500">{item.category}</td>
                        <td className="py-2.5 px-3 text-stone-500">{item.gender ?? "—"}</td>
                        <td className="py-2.5 px-3 text-stone-600">{item.price}</td>
                        <td className="py-2.5 px-3 font-semibold text-stone-900">{item.stock}</td>
                        <td className="py-2.5 px-3">
                          <Badge variant="outline" className={`text-xs ${cls}`}>{label}</Badge>
                        </td>
                        <td className="py-2.5 px-3">
                          <Button
                            size="sm"
                            variant="outline"
                            className="h-7 text-xs gap-1 border-stone-300 hover:border-amber-400 hover:text-amber-600"
                            onClick={() => handleRestock(item.id, item.name)}
                          >
                            <RefreshCw size={12} />
                            Restock
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
    </div>
  );
}
