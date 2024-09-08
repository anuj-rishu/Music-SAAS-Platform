"use client";
import { signIn, signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Music } from "lucide-react";

export function Appbar() {
    const { data: session } = useSession();

    return (
        <div className="flex justify-between px-20 pt-4">
            <div className="text-lg font-bold flex flex-col justify-center text-white">
                Muzer
            </div>
            <div>
                {session?.user ? (
                    <Button
                        className="bg-purple-600 text-white hover:bg-purple-700"
                        onClick={() => signOut()}
                        aria-label="Logout"
                    >
                        Logout
                    </Button>
                ) : (
                    <Button
                        className="bg-purple-600 text-white hover:bg-purple-700"
                        onClick={() => signIn()}
                        aria-label="Signin"
                    >
                        Signin
                    </Button>
                )}
            </div>
        </div>
    );
}