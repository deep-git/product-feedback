import FeedbackCard from '@/components/feedback-card';
import { currentProfile } from '@/lib/current-profile'
import { db } from '@/lib/db';
import { ChevronUp, Speech } from 'lucide-react';
import React from 'react'

const TagIdPage = async ({ params }: { params: { tagId: string } }) => {

    const profile = await currentProfile();

    if (!profile) {
        return null;
    }

    const categories = ["UI", "UX", "Enhancement", "Bug", "Feature"];

    let feedback;

    if (params.tagId !== "all") {
        feedback = await db.feedback.findMany({
            where: {
                category: params.tagId.slice(0, 1).toUpperCase() + params.tagId.slice(1)
            }
        });
    } else if (params.tagId === "all") {
        feedback = await db.feedback.findMany({
            where: {
                category: {
                    in: categories
                }
            }
        });
    }

    return (
        <div className="flex flex-col gap-5 mb-10">
            {feedback && feedback.map(async (post) => {

                const comment = await db.comment.findMany({
                    where: {
                        feedbackId: post.id
                    }
                });

                return (
                    <FeedbackCard key={post.id} post={post} comment={comment} profile={profile} />
                )
            })}
        </div>
    )
}

export default TagIdPage