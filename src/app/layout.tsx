import { Inter as FontSans } from "next/font/google";
import { cn } from "@/lib/utils";
import "./globals.css";
import { AuthProvider } from "@/context/AuthContext";
import QueryProvider from "@/context/QueryClient";
import { Toaster } from "@/components/ui/toaster";
import { Navbar } from "@/components/nav/Navbar";

const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={cn(
          "min-h-screen bg-background font-sans antialiased",
          fontSans.variable,
        )}
      >
        <QueryProvider>
          <AuthProvider>
            <Navbar />
            {children}
          </AuthProvider>
          <Toaster />
        </QueryProvider>
      </body>
    </html>
  );
}
