import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Navbar from "./components/Navbar";
import { AuthProvider } from "./context/auth";
// import "https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.2/css/all.min.css";

// const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "MOJIITO",
  description: "This is MOJIITO",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="jp">
      <head>
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.2/css/all.min.css"
          integrity="sha512-z3gLpd7yknf1YoNbCzqRKc4qyor8gaKU1qmn+CShxbuBusANI9QpRohGBreCFkKxLhei6S9CQXFEbbKuqLg0DA=="
          crossOrigin="anonymous"
          referrerPolicy="no-referrer"
        />
      </head>
      {/* <body className={inter.className}> */}
      <body>
        <AuthProvider>
          <div>
            <Navbar />
            {children}
          </div>
        </AuthProvider>
      </body>
    </html>
  );
}
