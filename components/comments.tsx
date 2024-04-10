"use client";

import React, { useState } from 'react';
import FormatComment from './format-comment';
import { Textarea } from './ui/textarea';
import { Button } from './ui/button';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import { $Enums } from '@prisma/client';
import Image from 'next/image';

interface CommentsProps {
    post: {
        id: string;
        title: string;
        category: string;
        details: string;
        likes: number;
        likedBy: string[];
        status: string | null;
        profileId: string;
        createdAt: Date;
        updatedAt: Date;
    },
    comments: {
        id: string;
        description: string;
        parentId: string | null;
        feedbackId: string;
        profileId: string;
        createdAt: Date;
        updatedAt: Date;
    }[],
    profile: {
        id: string;
        userId: string;
        name: string;
        imageUrl: string;
        email: string;
        role: $Enums.MemberRole;
        createdAt: Date;
        updatedAt: Date;
    }
}

const Comments = ({ post, comments, profile }: CommentsProps) => {

    const [backendComments, setBackendComments] = useState(comments);
    const rootComments = backendComments.filter((backendComment) => backendComment.parentId === null);

    const getReplies = (commentId: string) => {
        return backendComments.filter((backendComment) => backendComment.parentId === commentId).sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime());
    }

    const [replyActive, setReplyActive] = useState(true);
    const [comment, setComment] = useState("");
    const [error, setError] = useState<string | undefined>();
    let maxCommentSize = 250;
    const [reply, setReply] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter();

    const toggleAddComment = () => {
        setReplyActive(prev => !prev);
    }

    const handleSendComment = async (e: any) => {
        e.preventDefault();

        if (comment.length >= 250) {
            setError("Comment cannot be longer than 250 characters");
            return;
        } else {
            setError(undefined);
        }

        if (comment === "" || comment === " ") {
            setError("Comment cannot be left empty.");
            return;
        } else {
            setError(undefined);
        }

        setIsLoading(true);

        const response = axios.post(`/api/feedback/${post.id}/comment`, {
            comment
        });

        router.refresh();
        setComment("");
        setIsLoading(false);
    }

    const deleteComment = async (commentId: string) => {
        const response = await axios.delete(`/api/feedback/${post.id}/comment/${commentId}`).then(() => {
            const updatedBackendComments = backendComments.filter((backendComment) => backendComment.id !== commentId);
            setBackendComments(updatedBackendComments);
        });

        router.refresh();
    }

    return (
        <div>
            <div className="bg-white p-2 rounded-tl-lg rounded-tr-lg">
                <h2 className="text-blue-dark text-xl font-bold mb-5 pl-5 pt-5">{comments && comments?.length} Comments</h2>

                <div>
                    {comments?.length === 0 && (
                        <div className="flex flex-col justify-center items-center mb-5">
                            <Image src="/empty_comments.png" alt="No Comments" width={300} height={400} className="object-cover" />
                            <span className="text-slate-400">There are currently no comments...</span>
                        </div>
                    )}
                </div>
            </div>
            <div className="flex flex-col mb-20 rounded-bl-lg rounded-br-lg overflow-hidden">
                {rootComments.map((root) => (
                    <FormatComment key={root.id} comment={root} replies={getReplies(root.id)} profile={profile} post={post} toggleAddComment={toggleAddComment} deleteComment={deleteComment} />
                ))}
            </div>

            {replyActive && (
                <div className="flex flex-col gap-5 bg-white px-7 py-6 rounded-xl mt-10 mb-20">
                    <h2 className="font-bold text-blue-dark">Add Comment</h2>
                    <Textarea value={comment} onChange={(e) => setComment(e.target.value)} placeholder="Type your comment here" className="bg-slate-100 max-h-40 border-none px-5 py-4" />

                    {error && (
                        <span className="text-sm text-red-600">{error}</span>
                    )}

                    <div className="flex justify-between items-center flex-wrap">
                        {maxCommentSize - comment.length >= 0 ? (
                            <span className="text-sm text-blue-dark/90">{maxCommentSize - comment.length} Characters left</span>
                        ) : (
                            <span className="text-sm text-red-600/90">{Math.abs(maxCommentSize - comment.length)} Characters over</span>
                        )}

                        <Button disabled={isLoading} onClick={(e) => handleSendComment(e)} className="bg-purple-1 text-white font-semibold px-4 py-2 hover:bg-purple-1/90">Post Comment</Button>
                    </div>
                </div>
            )}

        </div>
    )
}

export default Comments