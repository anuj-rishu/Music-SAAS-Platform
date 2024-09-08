import { prismaClient } from "@/app/lib/db";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

const UpvoteSchema = z.object({
    streamId: z.string(),
});

export async function POST(req: NextRequest) {
    const session = await getServerSession();

    if (!session || !session.user?.email) {
        return NextResponse.json({
            message: "Unauthenticated"
        }, {
            status: 403
        });
    }

    try {
        const data = UpvoteSchema.parse(await req.json());
        await prismaClient.upvote.create({
            data: {
                userId: session.user.id, // Assuming session contains user ID
                streamId: data.streamId
            }
        });
        return NextResponse.json({
            message: "Done!"
        });
    } catch (e) {
        console.error("Error while upvoting:", e);
        return NextResponse.json({
            message: "Error while upvoting"
        }, {
            status: 500
        });
    }
}