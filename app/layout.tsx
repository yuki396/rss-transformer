import "./globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "RSS Transformer App",
  description: "Fetch, transform, and output RSS feeds",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ja">
      <body className="min-h-screen">
        <main className="flex-1 w-full">
          {children}
        </main>
      </body>
    </html>
  );
}
