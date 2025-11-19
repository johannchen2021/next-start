import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { headers } from "next/headers";
import { SignOutButton } from "@/components/sign-out-button";

export default async function ProfilePage() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    redirect("/auth");
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

            <SignOutButton />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
