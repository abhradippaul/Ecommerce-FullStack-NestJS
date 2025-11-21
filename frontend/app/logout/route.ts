import { cookies } from "next/headers";

export async function GET() {
  const cookieStore = await cookies();

  cookieStore.delete("customer-token");

  return new Response(
    JSON.stringify({ message: "Cookie deleted successfully" }),
    {
      status: 200,
      headers: { "Content-Type": "application/json" },
    }
  );
}
