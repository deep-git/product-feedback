import MaxWidthWrapper from '@/components/MaxWidthWrapper'
import Comments from '@/components/comments'
import FeedbackCard from '@/components/feedback-card'
import { Button } from '@/components/ui/button'
import { currentProfile } from '@/lib/current-profile'
import { db } from '@/lib/db'
import { ChevronLeft } from 'lucide-react'
import Link from 'next/link'
import React from 'react'

const PostIdPage = async ({ params }: { params: { postId: string } }) => {

    const profile = await currentProfile();

    if (!profile) {
        return null;
    }

    const post = await db.feedback.findUnique({
        where: {
            id: params.postId
        }
    });

    if (!post) {
        return null;
    }

    const comments = await db.comment.findMany({
        where: {
            feedbackId: post.id,
        },
        orderBy: {
            createdAt: "asc"
        }
    });

    return (
        <MaxWidthWrapper className="max-w-screen-lg">
            <div className="flex flex-col mt-20 gap-10 px-4">
                <div className="flex justify-between items-center flex-wrap">
                    <Link href="/all" className="flex items-center text-md gap-3 hover:bg-blue-600/10 transition p-2 rounded-lg group">
                        <ChevronLeft className="w-5 h-5 text-blue-600" />
                        <span className="group-hover:text-blue-600 text-slate-600 font-semibold">Go Back</span>
                    </Link>

                    {profile.role === "ADMIN" || profile.id === post.profileId && (
                        <Link href={`/post/${post.id}/edit`}>
                            <Button className="bg-blue-600 text-white rounded-xl hover:bg-blue-600/90">Edit Feedback</Button>
                        </Link>
                    )}

                </div>

                <FeedbackCard post={post} comment={comments} profile={profile} />
            </div>

            <div className="mt-10 px-4">
                <Comments post={post} comments={comments} profile={profile} />
            </div>
        </MaxWidthWrapper>
    )
}

export default PostIdPage