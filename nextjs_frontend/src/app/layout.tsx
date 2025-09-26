import type { Metadata } from "next";
import { Kanit } from "next/font/google";
import "../styles/globals.css";
import Provider from "@/components/providers";
import { ToastContainer } from "react-toastify";

const kanit = Kanit({
  weight: ["400", "500", "600"],
  subsets: ["latin", "thai"],
});

export const metadata: Metadata = {
  title: "Point of Sale",
  description: "Software Design Project",
};

interface RootLayoutProps {
  children: React.ReactNode;
}

export default function RootLayout({
  children,
}: Readonly<RootLayoutProps>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${kanit.className}`}>
        <Provider>{children}</Provider>
        <ToastContainer />
      </body>
    </html>
  );
}
