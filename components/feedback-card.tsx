"use client";

import axios from 'axios';
import { ChevronDown, ChevronUp, Delete, Speech, Trash } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { HiChatBubbleOvalLeft } from "react-icons/hi2";
import { IoIosCheckmarkCircle } from "react-icons/io";
import { TbProgressCheck } from "react-icons/tb";
import { IoIosBookmarks } from "react-icons/io";
import { cn } from '@/lib/utils';
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip";
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { $Enums } from '@prisma/client';

interface FeedbackCardProps {
    post: {
        id: string;
        title: string;
        category: string;
        details: string;
        status?: string | null;
        likes: number;
        likedBy: string[];
        profileId: string;
    },
    comment?: {
        id: string;
        description: string;
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

const FeedbackCard = ({ post, comment, profile }: FeedbackCardProps) => {

    const router = useRouter();
    const [activeOptions, setActiveOptions] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const handleLikeFeedback = async () => {
        const response = await axios.patch(`/api/feedback/${post?.id}`)

        router.refresh();
    }

    const handleFeedbackMap = async (status: string) => {
        const response = await axios.patch(`/api/feedback/${post.id}/status`, {
            status
        });

        router.refresh();
    }

    const handleDeletePost = async () => {
        setIsLoading(true);

        const response = await axios.delete(`/api/feedback/${post.id}`);

        router.push("/all");
        router.refresh();
        setIsLoading(false);
    }

    return (
        <div key={post?.id} className="flex flex-col md:flex-row justify-between md:items-center bg-white rounded-xl p-4 md:p-7 gap-3 md:gap-10">
            <div className="hidden md:flex flex-col justify-center items-center gap-2 bg-blue-600/10 rounded-xl p-2 w-10 ">
                <button disabled={post.likedBy.includes(profile?.id)} onClick={() => handleLikeFeedback()} className="text-blue-600 disabled:text-slate-400">
                    <ChevronUp className="w-4 h-4" />
                </button>
                <span className="font-semibold text-blue-dark text-sm">{post?.likes}</span>
            </div>

            <div className="flex flex-col flex-1 justify-center gap-3">
                <div className="flex justify-between items-center flex-wrap">
                    <Link href={`/post/${post.id}`} className="text-blue-dark font-bold text-lg hover:text-blue-600 hover:underline transition">{post?.title}</Link>

                    {post.status && (
                        <span className="uppercase text-purple-1 font-bold text-md bg-purple-1/10 px-3 py-1 rounded-lg">{post?.status}</span>
                    )}

                </div>

                <span className="text-gray-500 text-md line-clamp-2 md:line-clamp-1 text-wrap">{post?.details}</span>
                <div className="flex gap-5 items-center flex-wrap">
                    <Link href={`/${post?.category}`} className="bg-blue-600/10 text-blue-600 font-semibold text-sm px-4 py-2 rounded-xl text-center w-max">{post?.category}</Link>

                    {profile.role === "ADMIN" || profile.id === post.profileId && (
                        <ChevronDown className={cn("text-purple-600 transition", {
                            "-rotate-90 transition": activeOptions
                        })} onClick={() => setActiveOptions(prev => !prev)} />
                    )}

                    {activeOptions && (
                        <div className="flex gap-5 transition flex-wrap items-center justify-center">

                            {profile.role === "ADMIN" && post && post.status !== "Planned" && (
                                <TooltipProvider>
                                    <Tooltip>
                                        <TooltipTrigger>
                                            <IoIosBookmarks onClick={() => handleFeedbackMap("Planned")} className="bg-purple-400/40 text-purple-600 w-7 h-7 p-1 rounded-full" />
                                        </TooltipTrigger>
                                        <TooltipContent>
                                            <p>Add to Planned</p>
                                        </TooltipContent>
                                    </Tooltip>
                                </TooltipProvider>

                            )}

                            {profile.role === "ADMIN" && post && post.status !== "Progress" && (
                                <TooltipProvider>
                                    <Tooltip>
                                        <TooltipTrigger>
                                            <TbProgressCheck onClick={() => handleFeedbackMap("Progress")} className="bg-purple-400/40 text-purple-600 w-7 h-7 p-1 rounded-full" />
                                        </TooltipTrigger>
                                        <TooltipContent>
                                            <p>Add to Progress</p>
                                        </TooltipContent>
                                    </Tooltip>
                                </TooltipProvider>

                            )}

                            {profile.role === "ADMIN" && post && post.status !== "Live" && (
                                <TooltipProvider>
                                    <Tooltip>
                                        <TooltipTrigger>
                                            <IoIosCheckmarkCircle onClick={() => handleFeedbackMap("Live")} className="bg-purple-400/40 text-purple-600 w-7 h-7 p-1 rounded-full" />
                                        </TooltipTrigger>
                                        <TooltipContent>
                                            <p>Add to Live</p>
                                        </TooltipContent>
                                    </Tooltip>
                                </TooltipProvider>

                            )}

                            {profile.role === "ADMIN" || profile.id === post.profileId && (
                                <Dialog>
                                    <DialogTrigger>
                                        <TooltipProvider>
                                            <Tooltip>
                                                <TooltipTrigger className="ml-5">
                                                    <Trash className="bg-red-400/40 text-red-600 w-7 h-7 p-1 rounded-full" />
                                                </TooltipTrigger>
                                                <TooltipContent>
                                                    <p className="text-red-600 font-semibold">Delete</p>
                                                </TooltipContent>
                                            </Tooltip>
                                        </TooltipProvider>
                                    </DialogTrigger>
                                    <DialogContent>
                                        <DialogHeader>
                                            <DialogTitle>Delete Post</DialogTitle>
                                            <DialogDescription>
                                                Are you absolutely sure? This action cannot be undone. This will permanently delete your post from our servers.
                                            </DialogDescription>
                                        </DialogHeader>

                                        <DialogFooter>
                                            <DialogClose asChild>
                                                <span className="hover:bg-slate-100 px-3 py-2 rounded-lg cursor-pointer transition">Close</span>
                                            </DialogClose>
                                            <button disabled={isLoading} onClick={() => handleDeletePost()} className="bg-red-600 text-white px-3 py-1 rounded-lg hover:bg-red-600/90 transition">Delete</button>
                                        </DialogFooter>
                                    </DialogContent>
                                </Dialog>
                            )}
                        </div>
                    )}
                </div>

            </div>

            <div className="flex justify-between w-full md:w-max">

                <div className="flex md:hidden justify-center items-center gap-2 bg-blue-600/10 rounded-xl p-2 w-20 ">
                    <ChevronUp onClick={() => handleLikeFeedback()} className="text-blue-600 w-4 h-4" />
                    <span className="font-semibold text-blue-dark text-sm">{post?.likes}</span>
                </div>

                <div className="flex justify-center items-center gap-2 p-2">
                    <HiChatBubbleOvalLeft className="w-5 h-5 text-blue-dark/20" />
                    <span className="text-blue-dark font-bold text-md">{comment ? comment?.length : 0}</span>
                </div>

            </div>
        </div >
    )
}

export default FeedbackCard