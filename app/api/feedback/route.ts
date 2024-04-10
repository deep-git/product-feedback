import { currentProfile } from "@/lib/current-profile";
import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
    try {
        const { title, category, details } = await req.json();

        const profile = await currentProfile();

        if (!profile) {
            return new NextResponse("Unauthorized", { status: 401 });
        }

        const feedback = await db.feedback.create({
            data: {
                title: title,
                category: category,
                details: details,
                profileId: profile.id,
                likes: 0
            }
        })

        return NextResponse.json(feedback);

    } catch (error) {
        console.log("[FEEDBACK_CREATE_POST]", error);
        return new NextResponse("Internal Error", { status: 500 })
    }
}