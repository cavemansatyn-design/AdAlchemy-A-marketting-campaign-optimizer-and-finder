import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Commercial AdAlchemy | Marketing Intelligence Platform",
  description:
    "AI-powered marketing intelligence for agencies. Discover audiences, creators, trends, and opportunities — then convert intelligence into campaign strategy.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className="dark h-full"
    >
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@24,400,0,0&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="min-h-full">{children}</body>
    </html>
  );
}
