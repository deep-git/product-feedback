"use client";

import { tagOptions } from '@/constants';
import { cn } from '@/lib/utils';
import { SignOutButton, UserButton } from '@clerk/nextjs';
import { $Enums } from '@prisma/client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React from 'react';

interface NavbarMobileProps {
    feedback: {
        id: string;
        title: string;
        category: string;
        details: string;
        likes: number;
        status: string | null;
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

const NavbarMobile = ({ feedback, profile }: NavbarMobileProps) => {

    const pathname = usePathname();

    return (
        <div>
            <h2 className="text-xl text-blue-600 font-bold">Feedback Board</h2>
            <div className="flex bg-slate-100 p-5 flex-wrap gap-3 mt-5 rounded-lg">
                {tagOptions && tagOptions.map((tag) => (
                    <div key={tag.label} className={cn("bg-blue-600/10 text-blue-600 font-semibold hover:bg-blue-600/30 rounded-xl px-3 py-2 cursor-pointer transition", {
                        "bg-blue-600 text-white": pathname.toLowerCase() === tag.label.toLowerCase()
                    })}>
                        {tag.label}
                    </div>
                ))}
            </div>
            <div className="flex flex-col bg-slate-100 gap-5 p-5 mt-5 rounded-lg">
                <div className="flex justify-between items-center">
                    <h2 className="text-blue-dark font-bold text-lg">Roadmap</h2>
                    <Link href="/roadmap" className="text-blue-600 underline">View</Link>
                </div>

                <div className="flex flex-col gap-3">
                    <div className="flex justify-center items-center w-full gap-4">
                        <div className="w-3 h-3 rounded-full bg-orange-400" />
                        <span className="text-blue-dark">Planned</span>
                        <span className="ml-auto font-bold text-blue-dark/70">{feedback && feedback.filter((post) => post.status === "Planned").length}</span>
                    </div>
                    <div className="flex justify-center items-center w-full gap-4">
                        <div className="w-3 h-3 rounded-full bg-purple-500" />
                        <span className="text-blue-dark">In-Progress</span>
                        <span className="ml-auto font-bold text-blue-dark/70">{feedback && feedback.filter((post) => post.status === "Progress").length}</span>
                    </div>
                    <div className="flex justify-center items-center w-full gap-4">
                        <div className="w-3 h-3 rounded-full bg-sky-500" />
                        <span className="text-blue-dark">Live</span>
                        <span className="ml-auto font-bold text-blue-dark/70">{feedback && feedback.filter((post) => post.status === "Live").length}</span>
                    </div>
                </div>
            </div>

            <div className="flex items-center flex-wrap gap-5 mt-5 bg-slate-200 p-5 rounded-lg">
                <SignOutButton>
                    <UserButton />
                </SignOutButton>
                <span className="text-lg text-blue-dark font-semibold">{profile && profile.name.split(" ")[1] === "null" ? profile.name.split(" ")[0] : profile.name}</span>
            </div>
        </div>
    )
}

export default NavbarMobile