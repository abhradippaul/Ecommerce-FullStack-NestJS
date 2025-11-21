"use client";

import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { useGetCustomerInfo } from "@/custom-hooks/auth/get-customer-info";
import { useIsLoggedIn } from "@/custom-hooks/auth/isloggedin";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

interface CustomerInfoType {
  email: string;
  name: string;
  total_orders: number;
  total_spend: number;
  address: string;
}

export default function AccountPage() {
  const isLoggedIn = useIsLoggedIn({ enabled: true });
  const getCustomerInfo = useGetCustomerInfo({
    enabled: !isLoggedIn.isLoading && isLoggedIn.data?.data?.isLoggedIn,
  });
  const customerInfo = getCustomerInfo.data?.data?.data as
    | CustomerInfoType
    | null
    | undefined;
  const router = useRouter();

  useEffect(() => {
    if (isLoggedIn.isLoading) return; // wait for data

    if (!isLoggedIn.data?.data?.isLoggedIn) {
      router.replace("/login");
    }
  }, [isLoggedIn]);

  return (
    <div className="w-full min-h-screen bg-gray-800 mx-auto p-6 space-y-6">
      <h1 className="text-3xl font-bold tracking-tight text-slate-300">
        Account
      </h1>

      <Card className="p-2 bg-gray-800 border border-gray-800">
        <CardHeader>
          <CardTitle className="text-xl text-slate-200">
            User Information
          </CardTitle>
        </CardHeader>

        <CardContent className="space-y-4">
          {/* Name */}
          <div className="flex items-center justify-between">
            <span className="font-medium text-slate-200">Name</span>
            <span className="font-semibold text-white">
              {customerInfo?.name}
            </span>
          </div>

          <Separator />

          {/* Email */}
          <div className="flex items-center justify-between">
            <span className="tfont-medium text-slate-200">Email</span>
            <span className="font-semibold text-white">
              {customerInfo?.email}
            </span>
          </div>

          <Separator />

          {/* Total Orders */}
          <div className="flex items-center justify-between">
            <span className="text-slate-200 font-medium">Total Orders</span>
            <span className="font-semibold text-white">
              {customerInfo?.total_orders}
            </span>
          </div>

          <Separator />

          {/* Total Spent */}
          <div className="flex items-center justify-between">
            <span className="text-slate-200 font-medium">Total Spent</span>
            <span className="font-semibold text-white">
              ₹{customerInfo?.total_spend}
            </span>
          </div>

          <Separator />

          <div className="flex items-center justify-between">
            <span className="text-slate-200 font-medium">Address</span>
            <span className="font-semibold text-white">
              ₹{customerInfo?.address}
            </span>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
