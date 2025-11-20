"use client";

import { useState } from "react";
import { signIn, signUp } from "@/lib/auth-client";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useRouter } from "@/i18n/routing";
import { useTranslations } from "next-intl";

// TODO: refactor with useActionState
export default function AuthPage() {
  const [isSignUp, setIsSignUp] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();
  const t = useTranslations("auth");
  const tCommon = useTranslations("common");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      if (isSignUp) {
        await signUp.email(
          {
            email,
            password,
            name,
          },
          {
            onSuccess: () => {
              router.push("/");
            },
            onError: (ctx) => {
              setError(ctx.error.message || "Sign up failed");
            },
          }
        );
      } else {
        await signIn.email(
          {
            email,
            password,
          },
          {
            onSuccess: () => {
              router.push("/");
            },
            onError: (ctx) => {
              setError(ctx.error.message || "Sign in failed");
            },
          }
        );
      }
    } catch (err) {
      setError("An error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    setLoading(true);
    setError("");

    try {
      await signIn.social(
        {
          provider: "google",
          callbackURL: "/",
        },
        {
          onError: (ctx) => {
            setError(ctx.error.message || "Google sign in failed");
          },
        }
      );
    } catch (err) {
      setError("An error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>
            {isSignUp ? t("signUpTitle") : t("signInTitle")}
          </CardTitle>
          <CardDescription>{t("description")}</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <form onSubmit={handleSubmit} className="space-y-4">
            {isSignUp && (
              <div>
                <label className="block text-sm font-medium mb-2">
                  {t("nameLabel")}
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder={t("namePlaceholder")}
                  className="w-full px-3 py-2 border border-input rounded-md focus:outline-none focus:ring-2 focus:ring-ring"
                  required
                />
              </div>
            )}

            <div>
              <label className="block text-sm font-medium mb-2">
                {t("emailLabel")}
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder={t("emailPlaceholder")}
                className="w-full px-3 py-2 border border-input rounded-md focus:outline-none focus:ring-2 focus:ring-ring"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">
                {t("passwordLabel")}
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder={t("passwordPlaceholder")}
                className="w-full px-3 py-2 border border-input rounded-md focus:outline-none focus:ring-2 focus:ring-ring"
                required
              />
            </div>

            {error && (
              <div className="p-3 bg-destructive/10 text-destructive rounded-md text-sm">
                {error}
              </div>
            )}

            <Button type="submit" className="w-full" disabled={loading}>
              {loading
                ? tCommon("loading")
                : isSignUp
                ? t("signUpButton")
                : t("signInButton")}
            </Button>
          </form>

          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-border"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-background text-muted-foreground">
                Or continue with
              </span>
            </div>
          </div>

          <Button
            type="button"
            variant="outline"
            className="w-full"
            onClick={handleGoogleSignIn}
            disabled={loading}
          >
            {t("googleButton")}
          </Button>

          <div className="text-center text-sm text-muted-foreground">
            <button
              type="button"
              onClick={() => setIsSignUp(!isSignUp)}
              className="text-primary hover:underline font-medium"
            >
              {isSignUp ? t("switchToSignIn") : t("switchToSignUp")}
            </button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
