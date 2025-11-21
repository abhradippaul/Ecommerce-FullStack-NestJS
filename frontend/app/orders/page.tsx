"use client";

import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { useIsLoggedIn } from "@/custom-hooks/auth/isloggedin";
import { useGetOrderHistory } from "@/custom-hooks/products/order-history";
import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

interface OrderHistory {
  order_id: string;
  status: string;
  quantity: number;
  product_id: string;
  order_creation_at: string;
  product_name: string;
  product_description: string;
  product_price: number;
}

export default function OrderHistoryPage() {
  const router = useRouter();
  const isLoggedIn = useIsLoggedIn({ enabled: true });
  const getOrderHistory = useGetOrderHistory({
    enabled: !isLoggedIn.isLoading && isLoggedIn.data?.data?.isLoggedIn,
    userId: isLoggedIn.data?.data.id,
  });

  const orderHistory: OrderHistory[] =
    getOrderHistory.data?.data.historyList ?? [];

  console.log(isLoggedIn.data?.data?.isLoggedIn);
  console.log(orderHistory[0]?.status);

  useEffect(() => {
    if (isLoggedIn.isLoading) return;

    if (!isLoggedIn.data?.data?.isLoggedIn) {
      router.replace("/login");
    }
  }, [isLoggedIn]);

  return (
    <div className="min-h-screen bg-gray-800 p-6 text-white">
      <div className="max-w-4xl mx-auto space-y-6">
        <h1 className="text-3xl font-bold tracking-tight text-slate-100">
          Order History
        </h1>

        {orderHistory.length === 0 && (
          <p className="text-gray-400">You have no past orders.</p>
        )}

        <div className="space-y-4">
          {orderHistory.map((order) => (
            <Card
              key={order.order_id}
              className="bg-gray-900 border border-gray-700 shadow-lg"
            >
              <CardHeader>
                <CardTitle
                  className={cn(
                    "text-lg text-slate-200",
                    order.status === "completed" && "text-green-500",
                    order.status === "failed" && "text-red-500",
                    order.status === "pending" && "text-yellow-500"
                  )}
                >
                  <div className="w-full flex justify-between items-center">
                    <span>Order #{order.order_id}</span>
                    <span>{order.status.toUpperCase()}</span>
                  </div>
                </CardTitle>
                <div className="w-[150px] flex items-center justify-between gap-x-2 gap-y-1">
                  <p className="text-sm text-gray-400">
                    {new Date(order.order_creation_at).toLocaleDateString()}
                  </p>
                  <p className="text-sm text-gray-400">
                    {new Date(order.order_creation_at).toLocaleTimeString([], {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </p>
                </div>
              </CardHeader>

              <CardContent className="space-y-4">
                <Separator className="bg-gray-700" />

                {/* ONE ITEM ONLY */}
                <div className="flex justify-between">
                  <div>
                    <p className="font-medium text-slate-200">
                      {order.product_name}
                    </p>
                    <p className="text-sm text-gray-400">
                      Qty: {order.quantity}
                    </p>
                  </div>

                  <p className="font-semibold text-white">
                    ₹{Number(order.product_price)}
                  </p>
                </div>

                <Separator className="bg-gray-700" />

                <div className="flex justify-between text-lg font-bold">
                  <span className="text-slate-300">Total</span>
                  <span className="text-white">
                    ₹{Number(order.product_price) * order.quantity}
                  </span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
