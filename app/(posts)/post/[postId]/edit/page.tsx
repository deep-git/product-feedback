import MaxWidthWrapper from '@/components/MaxWidthWrapper'
import EditFeedbackForm from '@/components/edit-feedback-form'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { SelectTrigger } from '@/components/ui/select'
import { currentProfile } from '@/lib/current-profile'
import { db } from '@/lib/db'
import { ChevronLeft } from 'lucide-react'
import Link from 'next/link'
import React from 'react'

const PostIdEdit = async ({ params }: { params: { postId: string } }) => {

    const profile = await currentProfile();

    if (!profile) {
        return null;
    }

    const post = await db.feedback.findUnique({
        where: {
            id: params.postId,
            profileId: profile.id
        }
    });

    return (
        <MaxWidthWrapper className="flex flex-col gap-14 px-4 mt-20 max-w-screen-md">
            <Link href={`/post/${post?.id}`} className="flex gap-2 items-center text-slate-600 hover:text-blue-600 hover:bg-blue-600/10 transition px-2 py-1 w-max rounded-lg">
                <ChevronLeft className="w-5 h-5" />
                <span>Go Back</span>
            </Link>
            <EditFeedbackForm post={post} />
        </MaxWidthWrapper>
    )
}

export default PostIdEdit