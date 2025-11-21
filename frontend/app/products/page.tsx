"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { MinusIcon, PlusIcon } from "lucide-react";
import { useGetProductsInfo } from "@/custom-hooks/products/get-products";
import { useIsLoggedIn } from "@/custom-hooks/auth/isloggedin";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { usePlaceOrder } from "@/custom-hooks/products/place-order";

type Product = {
  id: string;
  name: string;
  price: number;
  stock: number;
  description: string;
};

interface CartItems {
  id: string;
  name: string;
  totalPrice: number;
  quantity: number;
  price: number;
}

export default function AllProductsPage() {
  const isLoggedIn = useIsLoggedIn({ enabled: true });
  const [cartItems, setCartItems] = useState<CartItems | null>();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const orderPlace = usePlaceOrder(
    isLoggedIn.data?.data.id,
    setIsDialogOpen,
    setCartItems
  );
  const getProducts = useGetProductsInfo({
    enabled: !isLoggedIn.isLoading && isLoggedIn.data?.data?.isLoggedIn,
  });
  const products = getProducts.data?.data.products as Product[] | null;
  const [quantities, setQuantities] = useState<Record<string, number>>({});

  const handleQuantity = (id: string, type: "inc" | "dec") => {
    setQuantities((prev) => {
      const current = prev[id] || 1;

      let newQuantity =
        type === "inc" ? current + 1 : current > 1 ? current - 1 : 1;

      if (cartItems && cartItems.id === id) {
        setCartItems({
          ...cartItems,
          quantity: newQuantity,
          totalPrice: cartItems.price * newQuantity,
        });
      }

      return { ...prev, [id]: newQuantity };
    });
  };

  const placeOrder = () => {
    orderPlace.mutate({
      product_id: cartItems?.id || "",
      quantity: String(cartItems?.quantity) || "1",
    });
    if (orderPlace.isSuccess) {
      setCartItems(null);
      setIsDialogOpen(false);
    }
  };

  const addToCart = (product: Product) => {
    const qty = quantities[product.id] || 1;
    setCartItems({
      id: product.id,
      quantity: qty,
      name: product.name,
      price: Number(product.price),
      totalPrice: Number(product.price) * qty,
    });
    setIsDialogOpen(true);
  };

  return (
    <div className="min-h-screen bg-gray-800 p-6 text-white">
      <div className="max-w-7xl mx-auto space-y-6">
        <h1 className="text-3xl font-bold tracking-tight text-slate-100">
          Products
        </h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {products?.map((product) => (
            <Card
              key={product.id}
              className="bg-gray-900 border border-gray-700 shadow-lg"
            >
              <CardHeader>
                <CardTitle className="text-xl text-slate-200">
                  {product.name}
                </CardTitle>
              </CardHeader>

              <CardContent className="space-y-4">
                <p className="text-sm text-gray-400">{product.description}</p>

                <Separator className="bg-gray-700" />

                <div className="flex justify-between items-center">
                  <span className="text-2xl font-bold text-slate-200">
                    ₹{product.price}
                  </span>
                  {product.stock > 0 ? (
                    <span className="text-emerald-400 text-sm">
                      In Stock ({product.stock})
                    </span>
                  ) : (
                    <span className="text-red-400 text-sm">Out of Stock</span>
                  )}
                </div>

                {product.stock > 0 && (
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-gray-300">
                      Quantity
                    </span>

                    <div className="flex items-center gap-2">
                      <Button
                        variant="outline"
                        size="icon"
                        className="border-gray-600 text-black cursor-pointer"
                        disabled={(quantities[product.id] || 1) <= 1}
                        onClick={() => handleQuantity(product.id, "dec")}
                      >
                        <MinusIcon />
                      </Button>

                      <span className="w-8 text-center text-lg text-white">
                        {quantities[product.id] || 1}
                      </span>

                      <Button
                        variant="outline"
                        size="icon"
                        className="border-gray-600 text-black cursor-pointer"
                        disabled={
                          (quantities[product.id] || 1) >= product.stock
                        }
                        onClick={() => handleQuantity(product.id, "inc")}
                      >
                        <PlusIcon />
                      </Button>
                    </div>
                  </div>
                )}

                <Button
                  disabled={product.stock === 0}
                  onClick={() => addToCart(product)}
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white mt-2 py-3 cursor-pointer"
                >
                  {product.stock === 0 ? "Out of Stock" : "Add to Cart"}
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogContent className="bg-gray-900 border border-gray-700">
            <DialogHeader>
              <DialogTitle className="text-xl text-white">
                Product Checkout
              </DialogTitle>
            </DialogHeader>
            <Card className="bg-gray-900 border-none">
              <CardHeader>
                <CardTitle className="text-xl text-slate-200">
                  Order Summary
                </CardTitle>
              </CardHeader>

              <CardContent className="space-y-6">
                {cartItems && (
                  <div key={cartItems.id} className="space-y-2">
                    <div className="flex justify-between">
                      <span className="font-medium text-gray-200">
                        {cartItems.name}
                      </span>
                      <span className="font-semibold text-white">
                        ₹{cartItems.price}
                      </span>
                    </div>

                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-400">Quantity</span>
                      <div className="flex items-center gap-2">
                        <Button
                          variant="outline"
                          size="icon"
                          className="border-gray-600 text-gray-800 text-xl flex items-center justify-center cursor-pointer hover:text-black"
                          disabled={(quantities[cartItems.id] || 1) <= 1}
                          onClick={() => handleQuantity(cartItems.id, "dec")}
                        >
                          <MinusIcon />
                        </Button>

                        <span className="w-8 text-center text-lg text-white">
                          {quantities[cartItems.id] || 1}
                        </span>

                        <Button
                          variant="outline"
                          size="icon"
                          className="border-gray-600 text-gray-800 text-xl flex items-center justify-center cursor-pointer hover:text-black"
                          disabled={
                            (quantities[cartItems.id] || 1) >=
                            (products?.find((e) => e.id === cartItems.id)
                              ?.stock || 1)
                          }
                          onClick={() => handleQuantity(cartItems.id, "inc")}
                        >
                          <PlusIcon />
                        </Button>
                      </div>
                    </div>

                    <Separator className="bg-gray-700" />
                  </div>
                )}

                <div className="flex justify-between text-xl font-bold">
                  <span className="text-slate-300">Total</span>
                  <span className="text-white">₹{cartItems?.totalPrice}</span>
                </div>

                <Button
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 text-lg cursor-pointer"
                  onClick={placeOrder}
                >
                  Place Order
                </Button>
              </CardContent>
            </Card>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}
