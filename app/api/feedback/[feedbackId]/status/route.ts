import { currentProfile } from "@/lib/current-profile";
import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function PATCH(req: Request, { params }: { params: { feedbackId: string } }) {
    try {
        const { status } = await req.json();

        const profile = await currentProfile();

        if (!profile) {
            return new NextResponse("Unauthorized", { status: 401 });
        }

        const statusUpdate = await db.feedback.update({
            where: {
                id: params.feedbackId
            },
            data: {
                status: status
            }
        })

        return NextResponse.json(statusUpdate);

    } catch (error) {
        console.log("[FEEDBACK_STATUS_PATCH]", error);
        return new NextResponse("Internal Error", { status: 500 })
    }
}