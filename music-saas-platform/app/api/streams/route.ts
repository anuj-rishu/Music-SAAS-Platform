import { prismaClient } from "@/app/lib/db";
import { PrismaClient } from "@prisma/client/extension";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

//@ts-ignore
import youtubesearchapi from "youtube-search-api";

var urlRegex =
  /^(?:(?:https?:)?\/\/)?(?:www\.)?(?:m\.)?(?:youtu(?:be)?\.com\/(?:v\/|embed\/|watch(?:\/|\?v=))|youtu\.be\/)((?:\w|-){11})(?:\S+)?$/;

const CreateStreamSchema = z.object({
  creatorId: z.string(),
  url: z.string(),
});

export async function POST(req: NextRequest) {
  try {
    const data = CreateStreamSchema.parse(await req.json());
    const isYt = data.url.match(urlRegex);
    if (!isYt) {
      return NextResponse.json(
        {
          Message: "Wrong URL format",
        },
        {
          status: 411,
        }
      );
    }
    const extarctedId = data.url.split("?v=")[1];

    const res = await youtubesearchapi.GetVideoDetails(extarctedId);
    const thumbnails = res?.thumbnails?.thumbnails ?? [];
    console.log(res.title);
    console.log(res.thumbnail.thumbnails);
    console.log(JSON.stringify(res.thumbnail.thumbnails));
    thumbnails.sort((a: { width: number }, b: { width: number }) =>
      a.width ? -1 : 1
    );

    const stream = await prismaClient.stream.create({
      data: {
        userId: data.creatorId,
        url: data.url,
        extarctedId,
        type: "Youtube",
        title: res.title ?? "Can Not find Video",
        smaillImg:
        (thumbnails.length > 1
          ? thumbnails[thumbnails.length - 2].url
          : thumbnails[thumbnails.length - 1]?.url) ??
        "https://res.cloudinary.com/dtberehdy/image/upload/v1725378921/music%20platform%20image/default%20YouTube%20image.jpg",
      bigImg:
        thumbnails[thumbnails.length - 1]?.url ??
        "https://res.cloudinary.com/dtberehdy/image/upload/v1725378921/music%20platform%20image/default%20YouTube%20image.jpg",
    },
  });

    return NextResponse.json({
      message: "Added stream",
      id: stream.id,
    });
  } catch (e) {
    console.log(e);
    return NextResponse.json(
      {
        Message: "Error While adding the stream",
      },
      {
        status: 411,
      }
    );
  }
}

export async function GET(req: NextRequest) {
  const creatorId = req.nextUrl.searchParams.get("creatorId");
  const Streams = await PrismaClient.stream.findMany({
    where: {
      userId: creatorId ?? "",
    },
  });
  return NextResponse.json({
    Streams,
  });
}
