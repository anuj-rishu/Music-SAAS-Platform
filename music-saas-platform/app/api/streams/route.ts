import { prismaClient } from "@/app/lib/db";
import { PrismaClient } from "@prisma/client/extension";
import { assert } from "console";
import { NextApiRequest } from "next";
import NextAuth from "next-auth/next";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod"

//@ts-ignore
import youtubesearchapi from "youtube-search-api"
import { json } from "stream/consumers";

var urlRegex = /^(?:(?:https?:)?\/\/)?(?:www\.)?(?:m\.)?(?:youtu(?:be)?\.com\/(?:v\/|embed\/|watch(?:\/|\?v=))|youtu\.be\/)((?:\w|-){11})(?:\S+)?$/;



const CreateStreamSchema = z.object({
  creatorId: z.string(),
  url: z.string(),
});
export async function POST(req: NextRequest) {
  try {
    const data = CreateStreamSchema.parse(await req.json());
    const isYt = data.url.match(urlRegex)
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
    console.log(res.title)
    console.log(res.thumbnail.thumbnails)
    console.log(JSON.stringify(res.thumbnail.thumbnails))

   const stream = await prismaClient.stream.create({
      data:{
        userId: data.creatorId,
        url: data.url,
        extarctedId,
        type : "Youtube"
      }
    })

    await prismaClient.stream.create({
      data: {
        userId: data.creatorId,
        url: data.url,
        extarctedId,
        type: "Youtube",
      },
    });
return NextResponse.json({
  message: "Added stream",
  id: stream.id
})

  } catch (e) {
    return NextResponse.json(
      {
        Message: "Error While addinf the stream",
      },
      {
        status: 411,
      }
    );
  }
}

export async function GET(req:NextRequest) {
  const creatorId =req.nextUrl.searchParams.get("creatorId")
  const Streams = await PrismaClient.stream.findMany({
    where:{
      userId: creatorId ?? ""
    }
  })
  return NextResponse.json({
    Streams
  })
  
}
