import { Outfit } from "next/font/google";
import "./globals.css";
import Provider from "./provider";
import { Toaster } from "@/components/ui/sonner";

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
});

export const metadata = {
  title: "AI Recruitment Assistant",
  description: "Streamline your hiring process with AI-powered recruitment tools.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${outfit.variable} antialiased`}
      >
        <Provider>{children}
          <Toaster />
        </Provider>
      </body>
    </html>
  );
}
