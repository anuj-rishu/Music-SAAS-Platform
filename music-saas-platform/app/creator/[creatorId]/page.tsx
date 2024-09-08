import StreamView from "@/app/components/StreamView";

interface CreatorProps {
    params: {
        creatorId: string;
    };
}

export default function Creator({ params: { creatorId } }: CreatorProps) {
    return (
        <div>
            <StreamView creatorId={creatorId} playVideo={false} />
        </div>
    );
}