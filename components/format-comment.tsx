"use client";

import React, { useEffect, useState } from 'react';
import CommentAvatar from './comment-avatar';
import { $Enums } from '@prisma/client';
import { Button } from './ui/button';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import { Textarea } from './ui/textarea';
import { cn } from '@/lib/utils';
import { Edit, Trash } from 'lucide-react';
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";

interface FormatCommentProps {
    comment: {
        id: string;
        description: string;
        parentId: string | null;
        feedbackId: string;
        profileId: string;
        createdAt: Date;
        updatedAt: Date;
    },
    profile: {
        id: string;
        userId: string;
        name: string;
        imageUrl: string;
        email: string;
        role: $Enums.MemberRole;
        createdAt: Date;
        updatedAt: Date;
    },
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
    toggleAddComment: () => void,
    replies: {
        id: string;
        description: string;
        parentId: string | null;
        feedbackId: string;
        profileId: string;
        createdAt: Date;
        updatedAt: Date;
    }[],
    commentDepth?: number,
    deleteComment: (commentId: string) => void
}

const FormatComment = ({ comment, replies, profile, post, toggleAddComment, commentDepth, deleteComment }: FormatCommentProps) => {

    const [replyActive, setReplyActive] = useState(false);
    let maxCommentSize = 250;
    const [replyInput, setReplyInput] = useState("");
    const [editInput, setEditInput] = useState(comment.description);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | undefined>();
    const [edit, setEdit] = useState(false);
    const router = useRouter();

    const getReplies = (commentId: string) => {
        return replies.filter((backendComment) => backendComment.parentId === commentId).sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime());
    }

    const toggleReply = () => {
        setReplyActive(prev => !prev);
        toggleAddComment();
    }

    const handleSendReply = async (e: any) => {
        e.preventDefault();

        if (replyInput.length >= 250) {
            setError("Comment cannot be longer than 250 characters");
            return;
        } else {
            setError(undefined);
        }

        if (replyInput === "" || replyInput === " ") {
            setError("Comment cannot be left empty.");
            return;
        } else {
            setError(undefined);
        }

        setIsLoading(true);

        const response = await axios.post(`/api/feedback/${post.id}/comment/${comment.id}/reply`, {
            replyInput
        });

        setReplyInput("");
        setIsLoading(false);
        setReplyActive(false);
        toggleAddComment();
        router.refresh();
    }

    const handleCancel = () => {
        setReplyInput("");
        setReplyActive(false);
        toggleAddComment();
    }

    const toggleEdit = () => {
        setEditInput(comment.description);
        setEdit(false);
    }

    const handleUpdateEdit = async (e: any) => {
        e.preventDefault();

        if (editInput.length >= 250) {
            setError("Comment cannot be longer than 250 characters");
            return;
        } else {
            setError(undefined);
        }

        if (editInput === "" || editInput === " " || editInput.trim() === " " || editInput.trim() === "") {
            setError("Comment cannot be left empty.");
            return;
        } else {
            setError(undefined);
        }

        setIsLoading(true);

        const response = await axios.patch(`/api/feedback/${post.id}/comment/${comment.id}/edit`, {
            editInput
        });

        setIsLoading(false);
        setEdit(false);
        router.refresh();
    }

    return (
        <div className={cn("", {
            "border-b-[1px]": commentDepth !== 1
        })}>
            <div className="flex gap-4 bg-white p-5">
                <CommentAvatar profile={profile} />
                <div className="flex flex-col gap-5 w-full">
                    <div className="flex justify-between items-center w-full flex-wrap">
                        <span className="text-blue-dark font-bold text-md">{profile && profile.name.split(" ")[1] === "null" ? profile.name.split(" ")[0] : profile.name}</span>

                        <div className="flex gap-5 flex-wrap">
                            <button disabled={replyActive} onClick={() => toggleReply()} className={cn("text-blue-600 font-semibold text-md hover:text-blue-600/90 disabled:text-blue-dark/50", {
                                "hidden": commentDepth === 1
                            })}>Reply</button>

                            {profile && profile.id === comment.profileId && (
                                <button onClick={() => {
                                    setEdit(prev => !prev);
                                    setEditInput(comment.description);
                                }}>
                                    <Edit className="text-slate-600 hover:text-blue-600 transition" />
                                </button>
                            )}

                            {profile && profile.id === comment.profileId && (

                                <Popover>
                                    <PopoverTrigger>
                                        <div>
                                            <Trash className="text-slate-600 hover:text-red-600 transition" />
                                        </div>
                                    </PopoverTrigger>
                                    <PopoverContent side="top" className="w-max">
                                        <div onClick={() => deleteComment(comment.id)} className="flex gap-2 justify-center items-center text-red-600 hover:bg-red-600/10 px-2 py-2 w-max cursor-pointer rounded-lg transition">
                                            <Trash />
                                            <span>Delete Comment</span>
                                        </div>
                                    </PopoverContent>
                                </Popover>

                            )}

                        </div>
                    </div>

                    {edit ? (
                        <div>
                            <Textarea value={editInput} onChange={(e) => setEditInput(e.target.value)} placeholder="Type your reply here" className="bg-slate-100 max-h-40 border-none px-5 py-4 mb-1" />

                            {error && (
                                <span className="text-sm text-red-600">{error}</span>
                            )}

                            <div className="flex mt-3 ml-auto w-max gap-5">
                                <Button onClick={() => toggleEdit()} className="bg-blue-dark hover:bg-blue-dark/90">Cancel</Button>
                                <Button disabled={isLoading} onClick={(e) => handleUpdateEdit(e)} className="bg-purple-1 text-white font-semibold px-4 py-2 hover:bg-purple-1/90">Update</Button>
                            </div>
                        </div>
                    ) : (
                        <p>{comment?.description}</p>
                    )}

                </div>
            </div>

            {
                replyActive && (

                    <div className="flex pl-10 bg-white">
                        <div>
                            <div className="w-[1px] h-full bg-slate-300" />
                        </div>
                        <div className="flex flex-col gap-5 bg-white px-7 py-6 w-full">
                            <h2 className="font-bold text-blue-dark">Add Reply</h2>
                            <Textarea value={replyInput} onChange={(e) => setReplyInput(e.target.value)} placeholder="Type your reply here" className="bg-slate-100 max-h-40 border-none px-5 py-4" />

                            {error && (
                                <span className="text-sm text-red-600">{error}</span>
                            )}
                            <div className="flex bg-white justify-between items-center flex-wrap">
                                {maxCommentSize - replyInput.length >= 0 ? (
                                    <span className="text-sm text-blue-dark/90">{maxCommentSize - replyInput.length} Characters left</span>
                                ) : (
                                    <span className="text-sm text-red-600/90">{Math.abs(maxCommentSize - replyInput.length)} Characters over</span>
                                )}

                                <div className="flex gap-5 flex-wrap">
                                    <Button onClick={() => handleCancel()} className="bg-blue-dark hover:bg-blue-dark/90">Cancel</Button>
                                    <Button disabled={isLoading} onClick={(e) => handleSendReply(e)} className="bg-purple-1 text-white font-semibold px-4 py-2 hover:bg-purple-1/90">Post Reply</Button>
                                </div>
                            </div>
                        </div>
                    </div>
                )
            }
            {
                replies.length > 0 && (
                    <div className="flex bg-white pl-10 w-full">
                        <div>
                            <div className="w-[1px] h-full bg-slate-300" />
                        </div>
                        <div className="w-full">
                            {replies.map((reply) => (
                                <FormatComment comment={reply} key={reply.id} replies={getReplies(reply.id)} profile={profile} post={post} toggleAddComment={toggleAddComment} commentDepth={1} deleteComment={deleteComment} />
                            ))}
                        </div>
                    </div>
                )
            }
        </div >
    )
}

export default FormatComment