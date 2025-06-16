import { Outfit } from "next/font/google";
import "./globals.css";
import Provider from "./provider";
import { Toaster } from "@/components/ui/sonner";
import Link from "next/link";
import { Button } from "@/components/ui/button";

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
        <Provider>
          <header className="absolute inset-x-0 top-0 z-50">
            <nav className="flex items-center justify-between p-6 lg:px-8" aria-label="Global">
              <div className="flex lg:flex-1">
                <Link href="/" className="-m-1.5 p-1.5">
                  <span className="sr-only">AI Recruiter</span>
                  <img
                    className="h-8 w-auto"
                    src="/logo.png"
                    alt=""
                  />
                </Link>
              </div>
              <div className="lg:flex lg-flex-1 lg:justify-end">
                <Link href="/auth">
                  <Button className="text-sm font-semibold leading-6 text-white">
                    Log in <span aria-hidden="true">&rarr;</span>
                  </Button>
                </Link>
              </div>
            </nav>
          </header>
          {children}
          <Toaster />
        </Provider>
      </body>
    </html>
  );
}
