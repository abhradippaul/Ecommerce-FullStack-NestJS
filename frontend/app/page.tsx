"use client";

import { useIsLoggedIn } from "@/custom-hooks/auth/isloggedin";
import { Navbar } from "@/modules/navbar";
import { useRouter } from "next/navigation";

export default function Home() {
  // const router = useRouter();
  // const isLoggedIn = useIsLoggedIn();

  // if (!isLoggedIn.data?.data?.isLoggedIn) {
  //   router.replace("/");
  // }

  return (
    <div className="w-full min-h-screen bg-gray-800">
      <Navbar />
    </div>
  );
}
