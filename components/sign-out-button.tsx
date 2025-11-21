"use client";

import { signOut } from "@/lib/auth-client";
import { Button } from "@/components/ui/button";
import { useRouter } from "@/i18n/routing";

type SignOutButtonProps = {
  label?: string;
};

export function SignOutButton({ label = "Sign Out" }: SignOutButtonProps) {
  const router = useRouter();

  const handleSignOut = async () => {
    await signOut({
      fetchOptions: {
        onSuccess: () => {
          router.push("/auth");
        },
      },
    });
  };

  return (
    <Button variant="destructive" onClick={handleSignOut}>
      {label}
    </Button>
  );
}
