"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LogoutButton } from "@/components/LogoutButton";
import { useSessionContext } from "@/components/SessionProvider";
import { Button } from "@/components/ui/button";

export function DashboardHeader() {
  const { user } = useSessionContext();
  const pathname = usePathname();

  return (
    <div className="flex justify-between items-center mb-4">
      <div>
        <h1 className="text-2xl font-bold">Failed Requests Dashboard</h1>
        <p className="text-sm text-gray-500">Welcome, {user?.name}</p>
      </div>
      <div className="flex items-center gap-4">
        <nav className="flex gap-4">
          <Button
            variant={pathname === "/statistics" ? "default" : "ghost"}
            asChild
          >
            <Link href="/statistics">Statistics</Link>
          </Button>
          <Button variant={pathname === "/" ? "default" : "ghost"} asChild>
            <Link href="/">Requests</Link>
          </Button>
        </nav>
        <LogoutButton />
      </div>
    </div>
  );
}
