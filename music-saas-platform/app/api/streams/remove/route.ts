import { prismaClient } from "@/app/lib/db";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

const RemoveStreamSchema = z.object({
    streamId: z.string()
});

export async function DELETE(req: NextRequest) {
    const session = await getServerSession();

    if (!session || !session.user?.email) {
        return NextResponse.json({
            message: "Unauthenticated"
        }, {
            status: 403
        });
    }

    const user = await prismaClient.user.findFirst({
        where: {
            email: session.user.email
        }
    });

    if (!user) {
        return NextResponse.json({
            message: "Unauthenticated"
        }, {
            status: 403
        });
    }

    try {
        const { searchParams } = new URL(req.url);
        const streamId = searchParams.get('streamId');

        if (!streamId) {
            return NextResponse.json({
                message: "Stream ID is required"
            }, {
                status: 400
            });
        }

        // Validate streamId using schema
        RemoveStreamSchema.parse({ streamId });

        await prismaClient.stream.deleteMany({
            where: {
                id: streamId,
                userId: user.id
            }
        });

        return NextResponse.json({
            message: "Song removed successfully"
        });
    } catch (e) {
        console.error("Error while removing the song:", e);
        return NextResponse.json({
            message: "Error while removing the song"
        }, {
            status: 500
        });
    }
}