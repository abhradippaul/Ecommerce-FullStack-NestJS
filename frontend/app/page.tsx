"use client";

import { useIsLoggedIn } from "@/custom-hooks/auth/isloggedin";
import { Navbar } from "@/modules/navbar";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Home() {
  const router = useRouter();
  const isLoggedIn = useIsLoggedIn({ enabled: true });

  useEffect(() => {
    if (isLoggedIn.isLoading) return; // wait for data

    if (!isLoggedIn.data?.data?.isLoggedIn) {
      router.replace("/login");
    }
  }, [isLoggedIn]);

  return (
    <div className="w-full min-h-screen bg-gray-800">
      <Navbar />
    </div>
  );
}
