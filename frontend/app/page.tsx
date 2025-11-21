import { Navbar } from "@/modules/navbar";
import Link from "next/link";

export default function HomePage() {
  return (
    <div className="w-full min-h-screen bg-gray-800">
      <Navbar />
      <div className="min-h-screen bg-gray-800 text-white flex items-center justify-center px-6">
        <section className="max-w-3xl text-center space-y-6">
          <h1 className="text-4xl md:text-5xl font-extrabold text-white">
            Ecommerce Store
          </h1>

          <p className="text-lg text-gray-300 leading-relaxed">
            Created with NextJS, NestJS, Postgres.
          </p>

          <Link
            href="/products"
            className="inline-block bg-blue-600 hover:bg-blue-700 text-white text-lg font-medium px-8 py-4 rounded-md cursor-pointer"
          >
            Shop Now
          </Link>
        </section>
      </div>
    </div>
  );
}
