import { prismaClient } from "@/app/lib/db";
import { NextApiRequest } from "next";
import NextAuth from "next-auth/next";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

const YT_REGEX = new RegExp("^https://(www.)?youtube.com/watch?v=[w-]{11}/$");

const CreateStreamSchema = z.object({
  creatorId: z.string(),
  url: z.string(),
});
export async function POST(req: NextRequest) {
  try {
    const data = CreateStreamSchema.parse(await req.json());
    const isYt = YT_REGEX.test(data.url);
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

    await prismaClient.stream.create({
      data: {
        userId: data.creatorId,
        url: data.url,
        extarctedId,
        type: "Youtube",
      },
    });
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
