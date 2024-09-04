"use client";
import { Music } from "lucide-react";
import Link from "next/link";

export function Footer() {
  return (
    <footer className="bg-gray-900/80 py-10 relative z-10">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="flex items-center space-x-2 mb-4 md:mb-0">
            <Music className="h-6 w-6" />
            <span className="text-xl font-bold">TheaterTunes</span>
          </div>
          <nav className="flex space-x-4">
            <Link href="#" className="hover:text-primary transition-colors">
              Privacy Policy
            </Link>
            <Link href="#" className="hover:text-primary transition-colors">
              Terms of Service
            </Link>
            <Link href="#" className="hover:text-primary transition-colors">
              Contact Us
            </Link>
          </nav>
        </div>
        <div className="mt-6 text-center text-gray-400 text-sm">
          © {new Date().getFullYear()} TheaterTunes. All rights reserved.
          <p className="mt-2">
    Crafted By <a href="https://www.linkedin.com/in/anuj-rishu" target="_blank" rel="noopener noreferrer" className="underline">Anuj Rishu Tiwari</a>
  </p>
        </div>
      </div>
    </footer>
  );
}
