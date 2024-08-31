import { prismaClient } from "@/app/lib/db";
// here may be worng logic
import { getSession } from "next-auth/react";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

const UpvoteSchema = z.object({
    streamId: z.string()
});

export async function POST(req: NextRequest) {
    const session = await getSession();
    const user = await prismaClient.user.findFirst({
        where: {
            email: session?.user?.email ?? ""
        }
    });

    if (!user) {
        return NextResponse.json({
            message: "unauthenticated"
        }, {
            status: 403
        });
    }

    try {
        const data = UpvoteSchema.parse(await req.json());
        await prismaClient.upvote.create({
            data:{
                userId: user.id,
                StreamId: data.streamId
            }
        })
        
    } catch (e) {
        return NextResponse.json({
            message: "Error while Upvoting"
        }, {
            status: 400
        });
    }
}