import Image from "next/image";
import Link from "next/link";
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
          <h2 className="text-lg font-semibold">Next.js + Better Auth</h2>
          <div className="flex items-center gap-4">
            <Link href="/auth">
              <Button variant="outline">Sign In</Button>
            </Link>
            <ThemeToggle />
          </div>
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
            Next.js with Better Auth
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            A modern Next.js starter template with Better Auth, Google OAuth,
            shadcn/ui components, Tailwind CSS, Prisma, and TypeScript.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
          <Card>
            <CardHeader>
              <CardTitle>🔐 Authentication</CardTitle>
              <CardDescription>
                Secure authentication with Better Auth
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-4">
                Email/password sign up and sign in, plus Google OAuth
                integration for seamless authentication.
              </p>
              <Link href="/auth">
                <Button className="w-full">Get Started with Auth</Button>
              </Link>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>📚 Documentation</CardTitle>
              <CardDescription>
                Learn more about the tools and frameworks used
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button
                variant="outline"
                asChild
                className="w-full justify-start"
              >
                <a
                  href="https://better-auth.com"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Better Auth Docs
                </a>
              </Button>
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
                  shadcn/ui
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
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>🗄️ Database</CardTitle>
              <CardDescription>PostgreSQL with Prisma ORM</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              <p className="text-sm text-muted-foreground">
                Powerful ORM for managing your database with type-safe queries.
              </p>
              <Button
                variant="outline"
                asChild
                className="w-full justify-start"
              >
                <a
                  href="https://www.prisma.io/docs"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Prisma Docs
                </a>
              </Button>
              <Link href="/admin/database" className="block">
                <Button variant="secondary" className="w-full justify-start">
                  View Database
                </Button>
              </Link>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>🎨 Styling</CardTitle>
              <CardDescription>
                Beautiful components with Tailwind CSS
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-4">
                Pre-built, accessible components with customizable styling.
              </p>
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
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                View on GitHub
              </a>
            </Button>
            <Link href="/auth">
              <Button variant="secondary" size="lg">
                Sign In with Google
              </Button>
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}
