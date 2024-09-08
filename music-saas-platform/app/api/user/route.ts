import { prismaClient } from "@/app/lib/db";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (req: NextRequest) => {
    const session = await getServerSession();

    if (!session || !session.user?.email) {
        return NextResponse.json({
            message: "Unauthenticated"
        }, {
            status: 403
        });
    }

    // Assuming session contains enough information to identify the user
    const user = {
        email: session.user.email,
        name: session.user.name,
        id: session.user.id
    };

    return NextResponse.json({
        user
    });
}

// dont static render
export const dynamic = 'force-dynamic'