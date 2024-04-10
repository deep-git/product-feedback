import { currentProfile } from "@/lib/current-profile";
import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function DELETE(req: Request, { params }: { params: { feedbackId: string, commentId: string } }) {
    try {
        const profile = await currentProfile();

        if (!profile) {
            return new NextResponse("Unauthorized", { status: 401 });
        }

        const deleteComment = await db.comment.delete({
            where: {
                id: params.commentId
            }
        });

        const deleteBranchComments = await db.comment.deleteMany({
            where: {
                parentId: params.commentId
            }
        })

        return NextResponse.json(deleteComment);

    } catch (error) {
        console.log("[COMMENT_DELETE]", error);
        return new NextResponse("Internal Error", { status: 500 })
    }
}