import { prismaClient } from "@/app/lib/db";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

export async function GET() {
    const session = await getServerSession();

    if (!session || !session.user?.email) {
        return NextResponse.json({
            message: "Unauthenticated"
        }, {
            status: 403
        });
    }

    const userId = session.user.id; // Assuming session contains user ID

    try {
        console.log("before first call");

        const mostUpvotedStream = await prismaClient.stream.findFirst({
            where: {
                userId: userId,
                played: false
            },
            orderBy: {
                upvotes: {
                    _count: 'desc'
                }
            }
        });

        console.log("after first call");
        console.log(mostUpvotedStream?.id);

        if (!mostUpvotedStream) {
            return NextResponse.json({
                message: "No stream found"
            }, {
                status: 404
            });
        }

        await Promise.all([
            prismaClient.currentStream.upsert({
                where: {
                    userId: userId
                },
                update: {
                    userId: userId,
                    streamId: mostUpvotedStream.id
                },
                create: {
                    userId: userId,
                    streamId: mostUpvotedStream.id
                }
            }),
            prismaClient.stream.update({
                where: {
                    id: mostUpvotedStream.id
                },
                data: {
                    played: true,
                    playedTs: new Date()
                }
            })
        ]);

        return NextResponse.json({
            stream: mostUpvotedStream
        });
    } catch (error) {
        console.error("Error processing request:", error);
        return NextResponse.json({
            message: "Error while processing request"
        }, {
            status: 500
        });
    }
}