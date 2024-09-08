"use client"
import { useSession } from 'next-auth/react'
import StreamView from '@/app/components/StreamView'

export default function Component() {
    const { data: session, status } = useSession();

    if (status === "loading") {
        return <div>Loading...</div>;
    }

    if (!session?.user?.id) {
        return <h1>Please Log in....</h1>;
    }

    return <StreamView creatorId={session.user.id} playVideo={true} />;
}

export const dynamic = 'auto'