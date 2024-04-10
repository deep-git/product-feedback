"use client";

import { cn } from '@/lib/utils';
import axios from 'axios';
import { ChevronDown, ChevronUp } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { HiChatBubbleOvalLeft } from 'react-icons/hi2';
import { IoIosBookmarks, IoIosCheckmarkCircle } from 'react-icons/io';
import { TbProgressCheck } from 'react-icons/tb';
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip"
import { $Enums } from '@prisma/client';

interface FeedbackMapCardProps {
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
    color: string,
    commentLength: number,
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

const FeedbackMapCard = ({ post, color, commentLength, profile }: FeedbackMapCardProps) => {

    const [activeOptions, setActiveOptions] = useState(false);
    const router = useRouter();

    const handleFeedbackMap = async (status: string) => {
        const response = await axios.patch(`/api/feedback/${post.id}/status`, {
            status
        });

        router.refresh();
    }

    const handleRemoveMap = async () => {
        const response = await axios.patch(`/api/feedback/${post.id}/status`, {
            status: null
        });

        router.refresh();
    }

    const handleLikeFeedback = async () => {
        const response = await axios.patch(`/api/feedback/${post?.id}`)

        router.refresh();
    }

    return (
        <div style={{ borderTopColor: `${color}` }} className={`flex flex-col w-full border-t-[5px] gap-4 bg-white p-4 rounded-lg`}>
            <div className="flex justify-between items-center flex-wrap">
                <div className="flex items-center gap-4">
                    <div style={{ backgroundColor: `${color}` }} className={`w-3 h-3 bg-${color} rounded-full`} />
                    <span className="text-md text-slate-500 font-semibold">{post.status}</span>
                </div>

                {profile.role === "ADMIN" && (
                    <button onClick={() => handleRemoveMap()} className="text-red-600 bg-red-600/10 px-3 py-1 rounded-full">Remove</button>
                )}
            </div>

            <Link href={`/post/${post.id}`}>
                <h3 className="text-md text-blue-dark font-bold hover:text-blue-600 hover:underline transition">{post.title}</h3>
            </Link>

            <p className="text-slate-400 font-semibold text-sm line-clamp-2">{post.details}</p>

            <div className="flex gap-5 flex-wrap items-center">
                <Link href={post.category.toLowerCase()} className="bg-blue-600/10 rounded-xl w-max px-3 py-2">
                    <span className="text-blue-600 font-semibold text-sm">{post.category}</span>
                </Link>

                {profile.role === "ADMIN" && (
                    <ChevronDown className={cn("text-purple-600 transition", {
                        "-rotate-90 transition": activeOptions
                    })} onClick={() => setActiveOptions(prev => !prev)} />
                )}

                {activeOptions && (
                    <div className="flex gap-5 transition flex-wrap">
                        {profile.role === "ADMIN" && post.status !== "Planned" && (
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

                        {profile.role === "ADMIN" && post.status !== "Progress" && (
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

                        {profile.role === "ADMIN" && post.status !== "Live" && (
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
                    </div>
                )}
            </div>

            <div className="flex justify-between items-center">
                <div className="flex gap-2 rounded-xl bg-slate-100 px-3 py-2 justify-center items-center">
                    <button disabled={post.likedBy.includes(profile?.id)} onClick={() => handleLikeFeedback()} className="text-blue-600 disabled:text-slate-400">
                        <ChevronUp onClick={() => handleLikeFeedback()} className="w-4 h-4" />
                    </button>
                    <span className="text-blue-dark font-bold">{post.likes}</span>
                </div>

                <div className="flex justify-center items-center gap-2 p-2">
                    <HiChatBubbleOvalLeft className="w-5 h-5 text-blue-dark/20" />
                    <span className="text-blue-dark font-bold text-md">{commentLength ? commentLength : 0}</span>
                </div>
            </div>
        </div>
    )
}

export default FeedbackMapCard