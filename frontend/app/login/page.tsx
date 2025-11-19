"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useLogIn } from "@/custom-hooks/auth/login";
import { useRouter } from "next/navigation";
import { useIsLoggedIn } from "@/custom-hooks/auth/isloggedin";

export default function LoginPage() {
  const router = useRouter();
  const login = useLogIn(router);
  // const isLoggedIn = useIsLoggedIn();

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    login.mutate(form);
  }

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  }

  // if (isLoggedIn.data?.data?.isLoggedIn) {
  //   router.replace("/");
  // }

  return (
    <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-slate-900 via-slate-950 to-slate-900 px-4">
      <div className="w-full max-w-md">
        <Card className="backdrop-blur-xl bg-slate-950/60 border-slate-800 shadow-xl">
          <CardHeader className="space-y-2 text-center">
            <CardTitle className="text-2xl md:text-3xl font-semibold text-white">
              Welcome back
            </CardTitle>
            <CardDescription className="text-slate-400">
              Sign in to continue to your dashboard
            </CardDescription>
          </CardHeader>

          <CardContent>
            <form className="space-y-6" onSubmit={handleSubmit}>
              {/* Email */}
              <div className="space-y-2">
                <Label htmlFor="email" className="text-slate-200">
                  Email
                </Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="you@example.com"
                  value={form.email}
                  onChange={handleChange}
                  required
                  className="bg-slate-900/60 border-slate-700 text-slate-100 placeholder:text-slate-500 focus-visible:ring-slate-500"
                />
              </div>

              {/* Password */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="password" className="text-slate-200">
                    Password
                  </Label>
                </div>
                <Input
                  id="password"
                  name="password"
                  type="password"
                  placeholder="••••••••"
                  value={form.password}
                  onChange={handleChange}
                  required
                  className="bg-slate-900/60 border-slate-700 text-slate-100 placeholder:text-slate-500 focus-visible:ring-slate-500"
                />
              </div>

              {/* Submit button */}
              <Button
                type="submit"
                className="w-full font-medium"
                disabled={login.isPending}
              >
                {login.isPending ? "Signing in..." : "Sign in"}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
