"use client";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Music, Moon, Sun } from "lucide-react";
import Link from "next/link";
import { signIn, signOut, useSession } from "next-auth/react";

export function Appbar() {
  const session = useSession();
  const [darkMode, setDarkMode] = useState(true);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [darkMode]);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  return (
    <header className="px-4 lg:px-6 h-16 flex items-center border-b border-gray-200 dark:border-gray-800">
      <Link className="flex items-center justify-center" href="#">
        <Music className="h-6 w-6 mr-2 text-gray-800 dark:text-gray-200" />
        <span className="font-bold text-lg text-gray-800 dark:text-gray-200">
          MusicStream
        </span>
      </Link>
      <nav className="ml-auto flex items-center gap-4 sm:gap-6">
        {session.data?.user && (
          <button onClick={() => signOut()}> Logout</button>
        )}
        {!session.data?.user && (
          <button onClick={() => signIn()}>Sign In</button>
        )}
        <Button
          variant="ghost"
          size="icon"
          onClick={toggleDarkMode}
          className="text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-gray-50"
        >
          {darkMode ? (
            <Sun className="h-5 w-5" />
          ) : (
            <Moon className="h-5 w-5" />
          )}
          <span className="sr-only">Toggle dark mode</span>
        </Button>
      </nav>
    </header>
  );
}
