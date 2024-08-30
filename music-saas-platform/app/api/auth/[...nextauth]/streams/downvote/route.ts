import { NextRequest } from "next/server";
import {z} from "zod";

const UpvoteSchema = z.object({
    streamId: z.string()

})
export async function POST(req:NextRequest){
    const data = UpvoteSchema.parse(await req.json())
}
