import { currentProfile } from "@/lib/current-profile";
import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function POST(req: Request, { params }: { params: { feedbackId: string, commentId: string } }) {
    try {
        const { replyInput } = await req.json();

        const profile = await currentProfile();

        if (!profile) {
            return new NextResponse("Unauthorized", { status: 401 });
        }

        const postReply = await db.comment.create({
            data: {
                description: replyInput,
                parentId: params.commentId,
                feedbackId: params.feedbackId,
                profileId: profile.id
            }
        });

        return NextResponse.json(postReply);

    } catch (error) {
        console.log("[REPLY_CREATE_POST]", error);
        return new NextResponse("Internal Error", { status: 500 })
    }
}