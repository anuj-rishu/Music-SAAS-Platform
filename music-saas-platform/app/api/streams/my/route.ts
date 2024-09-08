import { prismaClient } from "@/app/lib/db";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
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
        const streams = await prismaClient.stream.findMany({
            where: {
                userId: userId
            },
            include: {
                _count: {
                    select: {
                        upvotes: true
                    }
                },
                upvotes: {
                    where: {
                        userId: userId
                    }
                }
            }
        });

        return NextResponse.json({
            streams: streams.map(({ _count, ...rest }) => ({
                ...rest,
                upvotes: _count.upvotes,
                haveUpvoted: rest.upvotes.length ? true : false
            }))
        });
    } catch (error) {
        console.error("Error fetching streams:", error);
        return NextResponse.json({
            message: "Error while fetching streams"
        }, {
            status: 500
        });
    }
}