import { currentProfile } from "@/lib/current-profile";
import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function POST(req: Request, { params }: { params: { feedbackId: string } }) {
    try {
        const { comment } = await req.json();

        const profile = await currentProfile();

        if (!profile) {
            return new NextResponse("Unauthorized", { status: 401 });
        }

        const post = await db.comment.create({
            data: {
                description: comment,
                feedbackId: params.feedbackId,
                profileId: profile.id
            }
        })

        return NextResponse.json(post);

    } catch (error) {
        console.log("[COMMENT_CREATE_POST]", error);
        return new NextResponse("Internal Error", { status: 500 })
    }
}