import type { Metadata } from "next";
import { Inter } from "next/font/google";
import 'bootstrap/dist/css/bootstrap.css'; // Add this line
import "./globals.css";
import MenuBarHeader from "@/component/MenuBarHeader";
import FooterCommon from "@/component/FooterCommon";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Kid Booking Website",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        {/* HEADER MENU */}
        <MenuBarHeader />

        {/* CONTENT BODY */}
        <div className="container-fluid" style={{minHeight: '80vh'}}>
            {children}
        </div>

        {/* FOOTER BAR */}
        <FooterCommon />
      </body>
    </html>
  );
}
