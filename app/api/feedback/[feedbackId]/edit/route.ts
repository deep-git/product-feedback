import { currentProfile } from "@/lib/current-profile";
import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function PATCH(req: Request, { params }: { params: { feedbackId: string } }) {
    try {
        const { title, category, details } = await req.json();

        const profile = await currentProfile();

        if (!profile) {
            return new NextResponse("Unauthorized", { status: 401 });
        }

        const updatePost = await db.feedback.update({
            where: {
                id: params.feedbackId,
                profileId: profile.id
            },
            data: {
                title: title,
                category: category,
                details: details
            }
        })

        return NextResponse.json(updatePost);

    } catch (error) {
        console.log("[FEEDBACK_EDIT_PATCH]", error);
        return new NextResponse("Internal Error", { status: 500 })
    }
}