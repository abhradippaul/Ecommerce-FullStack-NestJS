import { Navbar } from "@/modules/navbar";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="w-full min-h-screen bg-gray-800">
      <Navbar />
      {children}
    </div>
  );
}
