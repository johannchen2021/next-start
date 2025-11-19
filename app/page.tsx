import Image from "next/image";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ThemeToggle } from "@/components/theme-toggle";

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      <header className="border-b">
        <div className="container mx-auto max-w-4xl px-6 py-4 flex justify-between items-center">
          <h2 className="text-lg font-semibold">Next.js + shadcn/ui</h2>
          <ThemeToggle />
        </div>
      </header>
      <main className="container mx-auto max-w-4xl px-6 py-12">
        <div className="text-center mb-12">
          <Image
            className="dark:invert mx-auto mb-8"
            src="/next.svg"
            alt="Next.js logo"
            width={180}
            height={36}
            priority
          />
          <h1 className="text-4xl font-bold tracking-tight mb-4">
            Next.js with shadcn/ui
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            A modern Next.js starter template with shadcn/ui components,
            Tailwind CSS, and TypeScript.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
          <Card>
            <CardHeader>
              <CardTitle>🚀 Quick Start</CardTitle>
              <CardDescription>
                Get started with your Next.js project using shadcn/ui components
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-4">
                shadcn/ui has been successfully set up in your project. You can
                now use beautiful, accessible components.
              </p>
              <Button className="w-full">Explore Components</Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>📚 Documentation</CardTitle>
              <CardDescription>
                Learn more about the tools and frameworks used in this project
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button
                variant="outline"
                asChild
                className="w-full justify-start"
              >
                <a
                  href="https://ui.shadcn.com"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  shadcn/ui Docs
                </a>
              </Button>
              <Button
                variant="outline"
                asChild
                className="w-full justify-start"
              >
                <a
                  href="https://nextjs.org/docs"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Next.js Docs
                </a>
              </Button>
              <Button
                variant="outline"
                asChild
                className="w-full justify-start"
              >
                <a
                  href="https://tailwindcss.com/docs"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Tailwind CSS
                </a>
              </Button>
            </CardContent>
          </Card>
        </div>

        <div className="text-center">
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button asChild size="lg">
              <a
                href="https://vercel.com/new?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Image
                  className="dark:invert mr-2"
                  src="/vercel.svg"
                  alt="Vercel logomark"
                  width={16}
                  height={16}
                />
                Deploy Now
              </a>
            </Button>
            <Button variant="secondary" size="lg" asChild>
              <a
                href="https://github.com/vercel/next.js"
                target="_blank"
                rel="noopener noreferrer"
              >
                View on GitHub
              </a>
            </Button>
          </div>
        </div>
      </main>
    </div>
  );
}
