import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const cookieStore = await cookies();

  const token = searchParams.get("token") || "";

  console.log(token);
  cookieStore.set({
    name: "customer-token",
    value: token,
    httpOnly: true,
    path: "/",
    maxAge: 60 * 60 * 24,
    sameSite: "strict",
  });

  return new Response(JSON.stringify({ message: "Cookie set" }), {
    status: 200,
    headers: { "Content-Type": "application/json" },
  });
}
