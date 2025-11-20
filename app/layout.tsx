import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Next.js with shadcn/ui",
  description: "A modern Next.js starter with shadcn/ui components",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return children;
}
