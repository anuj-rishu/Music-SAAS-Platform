import { prismaClient } from "@/app/lib/db";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

import youtubesearchapi from "youtube-search-api";
import { YT_REGEX } from "@/app/lib/utils";
import { getServerSession } from "next-auth";

const CreateStreamSchema = z.object({
    creatorId: z.string(),
    url: z.string()
});

const MAX_QUEUE_LEN = 20;
const DEFAULT_SMALL_IMG = "https://cdn.pixabay.com/photo/2024/02/28/07/42/european-shorthair-8601492_640.jpg";
const DEFAULT_BIG_IMG = "https://cdn.pixabay.com/photo/2024/02/28/07/42/european-shorthair-8601492_640.jpg";

export async function POST(req: NextRequest) {
    try {
        const session = await getServerSession();
        if (!session) {
            return NextResponse.json({
                message: "Unauthenticated"
            }, {
                status: 403
            });
        }

        const user = await prismaClient.user.findFirst({
            where: {
                email: session.user?.email ?? ""
            }
        });

        if (!user) {
            return NextResponse.json({
                message: "Unauthenticated"
            }, {
                status: 403
            });
        }

        const data = CreateStreamSchema.parse(await req.json());
        
        if (!data.url.trim()) {
            return NextResponse.json({
                message: "YouTube link cannot be empty"
            }, {
                status: 400
            });
        }

        const isYt = data.url.match(YT_REGEX);
        if (!isYt) {
            return NextResponse.json({
                message: "Invalid YouTube URL format"
            }, {
                status: 400
            });
        }

        const extractedId = data.url.split("?v=")[1];
        const res = await youtubesearchapi.GetVideoDetails(extractedId);

        if (!res || !res.thumbnail || !res.thumbnail.thumbnails) {
            console.error("YouTube API response does not contain thumbnails:", res);
            return NextResponse.json({
                message: "Failed to retrieve video details from YouTube"
            }, {
                status: 500
            });
        }

        if (user.id !== data.creatorId) {
            const tenMinutesAgo = new Date(Date.now() - 10 * 60 * 1000);
            const twoMinutesAgo = new Date(Date.now() - 2 * 60 * 1000);

            const userRecentStreams = await prismaClient.stream.count({
                where: {
                    userId: data.creatorId,
                    addedBy: user.id,
                    createdAt: {
                        gte: tenMinutesAgo
                    }
                }
            });

            const duplicateSong = await prismaClient.stream.findFirst({
                where: {
                    userId: data.creatorId,
                    extractedId: extractedId,
                    createdAt: {
                        gte: tenMinutesAgo
                    }
                }
            });
            if (duplicateSong) {
                return NextResponse.json({
                    message: "This song was already added in the last 10 minutes"
                }, {
                    status: 429
                });
            }

            const streamsLastTwoMinutes = await prismaClient.stream.count({
                where: {
                    userId: data.creatorId,
                    addedBy: user.id,
                    createdAt: {
                        gte: twoMinutesAgo
                    }
                }
            });

            if (streamsLastTwoMinutes >= 2) {
                return NextResponse.json({
                    message: "Rate limit exceeded: You can only add 2 songs per 2 minutes"
                }, {
                    status: 429
                });
            }

            if (userRecentStreams >= 5) {
                return NextResponse.json({
                    message: "Rate limit exceeded: You can only add 5 songs per 10 minutes"
                }, {
                    status: 429
                });
            }
        }

        const thumbnails = res.thumbnail.thumbnails;
        thumbnails.sort((a: { width: number }, b: { width: number }) => a.width - b.width);

        const existingActiveStreams = await prismaClient.stream.count({
            where: {
                userId: data.creatorId,
                played: false
            }
        });

        if (existingActiveStreams >= MAX_QUEUE_LEN) {
            return NextResponse.json({
                message: "Queue is full"
            }, {
                status: 429
            });
        }

        const stream = await prismaClient.stream.create({
            data: {
                userId: data.creatorId,
                addedBy: user.id,
                url: data.url,
                extractedId,
                type: "Youtube",
                title: res.title ?? "Can't find video",
                smallImg: (thumbnails.length > 1 ? thumbnails[thumbnails.length - 2].url : thumbnails[thumbnails.length - 1].url) ?? DEFAULT_SMALL_IMG,
                bigImg: thumbnails[thumbnails.length - 1].url ?? DEFAULT_BIG_IMG
            }
        });

        return NextResponse.json({
            ...stream,
            hasUpvoted: false,
            upvotes: 0
        });
    } catch (e) {
        const error = e as Error;
        console.error("Error while adding a stream:", error);
        return NextResponse.json({
            message: `Error while adding a stream: ${error.message}`,
            details: error.stack
        }, {
            status: 500
        });
    }
}

export async function GET(req: NextRequest) {
    try {
        const creatorId = req.nextUrl.searchParams.get("creatorId");
        const session = await getServerSession();
        if (!session) {
            return NextResponse.json({
                message: "Unauthenticated"
            }, {
                status: 403
            });
        }

        const user = await prismaClient.user.findFirst({
            where: {
                email: session.user?.email ?? ""
            }
        });

        if (!user) {
            return NextResponse.json({
                message: "Unauthenticated"
            }, {
                status: 403
            });
        }

        if (!creatorId) {
            return NextResponse.json({
                message: "Error"
            }, {
                status: 411
            });
        }

        const [streams, activeStream] = await Promise.all([
            prismaClient.stream.findMany({
                where: {
                    userId: creatorId,
                    played: false
                },
                include: {
                    _count: {
                        select: {
                            upvotes: true
                        }
                    },
                    upvotes: {
                        where: {
                            userId: user.id
                        }
                    }
                }
            }),
            prismaClient.currentStream.findFirst({
                where: {
                    userId: creatorId
                },
                include: {
                    stream: true
                }
            })
        ]);

        const isCreator = user.id === creatorId;

        return NextResponse.json({
            streams: streams.map(({ _count, ...rest }) => ({
                ...rest,
                upvotes: _count.upvotes,
                haveUpvoted: rest.upvotes.length ? true : false
            })),
            activeStream,
            creatorId,
            isCreator
        });
    } catch (e) {
        const error = e as Error;
        console.error("Error while fetching streams:", error);
        return NextResponse.json({
            message: `Error while fetching streams: ${error.message}`,
            details: error.stack
        }, {
            status: 500
        });
    }
}