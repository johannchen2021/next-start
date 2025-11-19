"use client";

import { useSession, signOut } from "@/lib/auth-client";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function ProfilePage() {
  const { data: session, isPending } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (!isPending && !session) {
      router.push("/auth");
    }
  }, [session, isPending, router]);

  const handleSignOut = async () => {
    await signOut({
      fetchOptions: {
        onSuccess: () => {
          router.push("/auth");
        },
      },
    });
  };

  if (isPending) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <p>Loading...</p>
      </div>
    );
  }

  if (!session) {
    return null;
  }

  return (
    <div className="min-h-screen bg-background py-12">
      <div className="container max-w-2xl">
        <Card>
          <CardHeader>
            <CardTitle>Profile</CardTitle>
            <CardDescription>Your account information</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <label className="block text-sm font-medium text-muted-foreground">
                Name
              </label>
              <p className="text-lg">{session.user.name || "Not set"}</p>
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-medium text-muted-foreground">
                Email
              </label>
              <p className="text-lg">{session.user.email}</p>
            </div>

            {session.user.image && (
              <div className="space-y-2">
                <label className="block text-sm font-medium text-muted-foreground">
                  Avatar
                </label>
                <img
                  src={session.user.image}
                  alt={session.user.name || "User"}
                  className="w-16 h-16 rounded-full"
                />
              </div>
            )}

            <div className="space-y-2">
              <label className="block text-sm font-medium text-muted-foreground">
                Email Verified
              </label>
              <p className="text-lg">
                {session.user.emailVerified ? "Yes" : "No"}
              </p>
            </div>

            <Button
              variant="destructive"
              onClick={handleSignOut}
              className="w-full"
            >
              Sign Out
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
