import { currentProfile } from "@/lib/current-profile";
import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function PATCH(req: Request, { params }: { params: { feedbackId: string } }) {
    try {
        const profile = await currentProfile();

        if (!profile) {
            return new NextResponse("Unauthorized", { status: 401 });
        }

        const likeUpdate = await db.feedback.update({
            where: {
                id: params.feedbackId
            },
            data: {
                likes: {
                    increment: 1
                },
                likedBy: {
                    push: profile.id
                }
            }
        })

        return NextResponse.json(likeUpdate);

    } catch (error) {
        console.log("[FEEDBACK_LIKE_PATCH]", error);
        return new NextResponse("Internal Error", { status: 500 })
    }
}

export async function DELETE(req: Request, { params }: { params: { feedbackId: string } }) {
    try {
        const profile = await currentProfile();

        if (!profile) {
            return new NextResponse("Unauthorized", { status: 401 });
        }

        const deleteFeedback = await db.feedback.delete({
            where: {
                id: params.feedbackId
            }
        })

        return NextResponse.json(deleteFeedback);

    } catch (error) {
        console.log("[FEEDBACK_DELETE]", error);
        return new NextResponse("Internal Error", { status: 500 })
    }
}