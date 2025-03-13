import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Fonu Task Manager",
  description: "Fonu Task Manager - Assessment",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`antialiased`}>{children}</body>
    </html>
  );
}
