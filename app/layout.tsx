import type { Metadata } from "next";
import { Nokora } from "next/font/google";
import Link from "next/link";
import "./globals.css";

const nokora = Nokora({
  subsets: ["latin"],
  weight: "900",
});

export const metadata: Metadata = {
  title: "MUSE.ai",
  description: "Your music library, reimagined.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="bg-background text-foreground antialiased">
        <header className="relative z-50 bg-neutral-900">
          <div className="container py-7">
            <h1
              className={`${nokora.className} text-xl leading-6 bg-gradient-to-b from-crayola to-vividViolet inline-block text-transparent bg-clip-text`}
            >
              <Link href="/">MUSE.ai</Link>
            </h1>
          </div>
        </header>

        <main className="container my-12">{children}</main>
      </body>
    </html>
  );
}
