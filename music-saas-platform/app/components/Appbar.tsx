"use client";
import { Music } from "lucide-react";
import Link from "next/link";
import { signIn, signOut, useSession } from "next-auth/react";

export function Appbar() {
  const session = useSession();

  return (
    <header className="container mx-auto px-4 py-6 flex justify-between items-center relative z-10">
      <Link href="/" className="flex items-center space-x-2">
        <Music className="h-6 w-6" />
        <span className="text-xl font-bold">TheaterTunes</span>
      </Link>
      <nav className="space-x-4">
        <Link href="#features" className="hover:text-primary transition-colors">
          Features
        </Link>

        {session.data?.user ? (
          <button
            onClick={() => signOut()}
            className="hover:text-primary transition-colors"
          >
            Logout
          </button>
        ) : (
          <Link
            href="#contact"
            className="hover:text-primary transition-colors"
            onClick={() => signIn()}
          >
            Login
          </Link>
        )}
      </nav>
    </header>
  );
}
