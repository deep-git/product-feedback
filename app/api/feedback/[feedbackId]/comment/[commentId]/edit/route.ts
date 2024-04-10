import { currentProfile } from "@/lib/current-profile";
import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function PATCH(req: Request, { params }: { params: { feedbackId: string, commentId: string } }) {
    try {
        const { editInput } = await req.json();

        const profile = await currentProfile();

        if (!profile) {
            return new NextResponse("Unauthorized", { status: 401 });
        }

        const updateComment = await db.comment.update({
            where: {
                id: params.commentId
            },
            data: {
                description: editInput
            }
        });

        return NextResponse.json(updateComment);

    } catch (error) {
        console.log("[UPDATE_COMMENT_PATCH]", error);
        return new NextResponse("Internal Error", { status: 500 })
    }
}