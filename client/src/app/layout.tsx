import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import "./globals.css";
import ReduxProvider from "../redux/provider";
import ThemeRegistry from "../components/ThemeRegistry";
import { Toaster } from "react-hot-toast";

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800", "900"],
  variable: "--font-montserrat",
});

export const metadata: Metadata = {
  title: "Your Sneaker | Modern Footwear Store",
  description: "Shop the best sneakers, running, and lifestyle footwear.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={montserrat.className}>
        <ReduxProvider>
          <ThemeRegistry>
            <Toaster position="top-right" toastOptions={{ duration: 3000 }} />
            {children}
          </ThemeRegistry>
        </ReduxProvider>
      </body>
    </html>
  );
}
