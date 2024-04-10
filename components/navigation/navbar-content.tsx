"use client";

import { usePathname } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { GiHamburgerMenu } from 'react-icons/gi'
import { Sheet, SheetContent, SheetTrigger } from '../ui/sheet'
import NavbarMobile from './navbar-mobile'
import { tagOptions } from '@/constants'
import { cn } from '@/lib/utils';
import Link from 'next/link';
import { SignOutButton, UserButton } from '@clerk/nextjs';
import { $Enums } from '@prisma/client';

interface NavbarContentProps {
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

const NavbarContent = ({ feedback, profile }: NavbarContentProps) => {

    const pathname = usePathname();
    const [isMounted, setIsMounted] = useState(false);

    /*
    useEffect(() => {
        setIsMounted(true);
    }, []);

    if (!isMounted) {
        return null;
    }
    */

    return (
        <>
            <div className="flex md:hidden justify-between items-center px-6 py-5 flex-wrap bg-gradient-to-r from-sky-400 to-violet-500">
                <div className="flex flex-col gap-1">
                    <h1 className="text-xl font-bold text-white">Product Notice</h1>
                    <h2 className="text-lg text-slate-100">Feedback Board</h2>
                </div>

                <Sheet>
                    <SheetTrigger>
                        <GiHamburgerMenu className="w-6 h-6 text-white" />
                    </SheetTrigger>
                    <SheetContent>
                        <NavbarMobile feedback={feedback} profile={profile} />
                    </SheetContent>
                </Sheet>
            </div>

            <div className="hidden md:flex lg:hidden bg-slate-200 px-5 py-5">
                <div className="flex w-max ml-auto items-center gap-3">
                    <span className="text-lg text-blue-dark font-semibold">{profile && profile.name.split(" ")[1] === "null" ? profile.name.split(" ")[0] : profile.name}</span>
                    <SignOutButton>
                        <UserButton />
                    </SignOutButton>
                </div>
            </div>
            <div className="hidden md:flex lg:flex-col lg:w-72 gap-3 h-max my-10">

                <div className="flex flex-1 flex-col gap-1 p-5 bg-gradient-to-r from-sky-400 to-violet-500 rounded-lg">
                    <h1 className="text-xl font-bold text-white mt-auto">Product Notice</h1>
                    <h2 className="text-lg text-slate-100">Feedback Board</h2>
                </div>

                <div className="hidden lg:flex bg-slate-200 px-5 py-5 rounded-lg">
                    <div className="flex w-max ml-auto items-center gap-3">
                        <span className="text-lg text-blue-dark font-semibold">{profile && profile.name.split(" ")[1] === "null" ? profile.name.split(" ")[0] : profile.name}</span>
                        <SignOutButton>
                            <UserButton />
                        </SignOutButton>
                    </div>
                </div>

                <div className="flex flex-1 bg-white p-5 flex-wrap gap-3 rounded-lg">
                    {tagOptions && tagOptions.map((tag) => (
                        <Link href={`/${tag.label.toLowerCase()}`} key={tag.label}>
                            <div className={cn("bg-blue-600/10 text-blue-600 font-semibold hover:bg-blue-600/30 rounded-xl px-3 py-2 cursor-pointer transition", {
                                "bg-blue-600 text-white hover:bg-blue-600": pathname.slice(1).toLowerCase() === tag.label.toLowerCase()
                            })}>
                                {tag.label}
                            </div>
                        </Link>
                    ))}
                </div>

                <div className="flex flex-1 flex-col bg-white gap-5 p-5 rounded-lg">
                    <div className="flex justify-between items-center">
                        <h2 className="text-blue-dark font-bold text-lg">Roadmap</h2>
                        <Link href="/roadmap" className="text-blue-600 hover:underline">View</Link>
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
            </div>
        </>
    )
}

export default NavbarContent