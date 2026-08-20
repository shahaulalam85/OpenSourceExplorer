import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import ThemeSync from "@/components/ThemeSync";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata = {
  title: "OpenSource Explorer - Discover Open Source Projects",
  description: "Find your next open source contribution. Filter by domain, technology, and difficulty level.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${inter.variable}`} suppressHydrationWarning>
      <body suppressHydrationWarning>
        <ThemeSync />
        <div className="app-container">
          <Navbar />
          <main className="main-content">{children}</main>
          <footer className="footer-bar">
            <p>
              &copy; {new Date().getFullYear()} OpenSource Explorer. All rights reserved.
            </p>
          </footer>
        </div>
      </body>
    </html>
  );
}
