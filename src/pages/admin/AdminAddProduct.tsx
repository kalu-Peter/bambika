import { useState } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { PlusCircle, Trash2, CheckCircle2 } from "lucide-react";

const sizeSchema = z.object({
  label: z.string().min(1, "Required"),
  price: z.string().min(1, "Required"),
});

const productSchema = z.object({
  name: z.string().min(2, "Product name must be at least 2 characters"),
  category: z.enum(["Clothing", "Shoes", "Bags"]),
  gender: z.enum(["Men", "Women", "Unisex"]).optional(),
  basePrice: z.string().min(1, "Base price is required"),
  stock: z.coerce.number().min(0, "Stock must be 0 or more"),
  sizes: z.array(sizeSchema).min(1, "Add at least one size"),
  imageUrl: z.string().optional(),
});

type ProductForm = z.infer<typeof productSchema>;

export default function AdminAddProduct() {
  const { toast } = useToast();
  const [submitted, setSubmitted] = useState(false);

  const {
    register,
    handleSubmit,
    control,
    setValue,
    watch,
    reset,
    formState: { errors },
  } = useForm<ProductForm>({
    resolver: zodResolver(productSchema),
    defaultValues: {
      sizes: [{ label: "", price: "" }],
    },
  });

  const { fields, append, remove } = useFieldArray({ control, name: "sizes" });
  const category = watch("category");

  const onSubmit = (data: ProductForm) => {
    console.log("New product:", data);
    toast({
      title: "Product added",
      description: `"${data.name}" has been saved to the catalogue.`,
    });
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      reset();
    }, 2500);
  };

  return (
    <div className="p-8 space-y-6 max-w-2xl">
      <div>
        <h2 className="text-2xl font-playfair font-bold text-stone-900">Add Product</h2>
        <p className="text-sm text-stone-500 mt-1">Fill in the details to add a new item to the catalogue.</p>
      </div>

      {submitted && (
        <div className="flex items-center gap-3 bg-green-50 border border-green-200 text-green-700 rounded-lg px-4 py-3 text-sm">
          <CheckCircle2 size={18} />
          Product saved successfully!
        </div>
      )}

      <Card className="border-stone-200">
        <CardHeader className="pb-2">
          <CardTitle className="text-base font-semibold text-stone-800">Product Details</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            {/* Name */}
            <div className="space-y-1.5">
              <Label className="text-stone-700 text-sm">Product Name *</Label>
              <Input
                {...register("name")}
                placeholder="e.g. Slim Fit Linen Shirt"
                className="border-stone-300"
              />
              {errors.name && <p className="text-xs text-red-500">{errors.name.message}</p>}
            </div>

            {/* Category + Gender */}
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <Label className="text-stone-700 text-sm">Category *</Label>
                <Select onValueChange={(v) => setValue("category", v as "Clothing" | "Shoes" | "Bags")}>
                  <SelectTrigger className="border-stone-300">
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Clothing">Clothing</SelectItem>
                    <SelectItem value="Shoes">Shoes</SelectItem>
                    <SelectItem value="Bags">Bags</SelectItem>
                  </SelectContent>
                </Select>
                {errors.category && <p className="text-xs text-red-500">{errors.category.message}</p>}
              </div>

              {category !== "Bags" && (
                <div className="space-y-1.5">
                  <Label className="text-stone-700 text-sm">Gender</Label>
                  <Select onValueChange={(v) => setValue("gender", v as "Men" | "Women" | "Unisex")}>
                    <SelectTrigger className="border-stone-300">
                      <SelectValue placeholder="Select gender" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Men">Men</SelectItem>
                      <SelectItem value="Women">Women</SelectItem>
                      <SelectItem value="Unisex">Unisex</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              )}
            </div>

            {/* Price + Stock */}
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <Label className="text-stone-700 text-sm">Base Price *</Label>
                <Input
                  {...register("basePrice")}
                  placeholder="$199"
                  className="border-stone-300"
                />
                {errors.basePrice && <p className="text-xs text-red-500">{errors.basePrice.message}</p>}
              </div>
              <div className="space-y-1.5">
                <Label className="text-stone-700 text-sm">Stock Quantity *</Label>
                <Input
                  {...register("stock")}
                  type="number"
                  min={0}
                  placeholder="0"
                  className="border-stone-300"
                />
                {errors.stock && <p className="text-xs text-red-500">{errors.stock.message}</p>}
              </div>
            </div>

            {/* Image URL */}
            <div className="space-y-1.5">
              <Label className="text-stone-700 text-sm">Image URL</Label>
              <Input
                {...register("imageUrl")}
                placeholder="https://example.com/image.jpg"
                className="border-stone-300"
              />
            </div>

            {/* Sizes */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label className="text-stone-700 text-sm">Sizes & Prices *</Label>
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className="h-7 text-xs gap-1 text-amber-600 hover:text-amber-700"
                  onClick={() => append({ label: "", price: "" })}
                >
                  <PlusCircle size={13} /> Add Size
                </Button>
              </div>

              {errors.sizes && !Array.isArray(errors.sizes) && (
                <p className="text-xs text-red-500">{errors.sizes.message}</p>
              )}

              <div className="space-y-2">
                {fields.map((field, i) => (
                  <div key={field.id} className="flex gap-2 items-start">
                    <div className="flex-1">
                      <Input
                        {...register(`sizes.${i}.label`)}
                        placeholder="Size (e.g. M, US 9)"
                        className="border-stone-300 h-9 text-sm"
                      />
                      {errors.sizes?.[i]?.label && (
                        <p className="text-xs text-red-500 mt-0.5">{errors.sizes[i]?.label?.message}</p>
                      )}
                    </div>
                    <div className="flex-1">
                      <Input
                        {...register(`sizes.${i}.price`)}
                        placeholder="Price (e.g. $199)"
                        className="border-stone-300 h-9 text-sm"
                      />
                      {errors.sizes?.[i]?.price && (
                        <p className="text-xs text-red-500 mt-0.5">{errors.sizes[i]?.price?.message}</p>
                      )}
                    </div>
                    {fields.length > 1 && (
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        className="h-9 w-9 p-0 text-stone-400 hover:text-red-500"
                        onClick={() => remove(i)}
                      >
                        <Trash2 size={14} />
                      </Button>
                    )}
                  </div>
                ))}
              </div>
            </div>

            <Button
              type="submit"
              className="w-full bg-stone-900 hover:bg-stone-800 text-white"
            >
              Save Product
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
