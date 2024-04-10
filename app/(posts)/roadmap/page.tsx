import MaxWidthWrapper from '@/components/MaxWidthWrapper'
import { Button } from '@/components/ui/button'
import { ChevronLeft } from 'lucide-react'
import Link from 'next/link'
import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { db } from '@/lib/db';
import { currentProfile } from '@/lib/current-profile';
import FeedbackMapCard from '@/components/feedback-map-card';

const RoadMap = async () => {

    const profile = await currentProfile();

    if (!profile) {
        return null;
    }

    const feedback = await db.feedback.findMany({
        where: {
            status: {
                in: ["Planned", "Progress", "Live"]
            }
        }
    });

    console.log("FEEDBACK", feedback);

    return (
        <MaxWidthWrapper>
            <div className="flex justify-between items-center bg-blue-dark px-6 py-4 flex-wrap lg:h-max lg:w-full lg:mt-10 md:rounded-xl">
                <div className="flex flex-col items-center gap-1">
                    <Link href="/all" className="flex gap-1 justify-center items-center text-white hover:bg-blue-600/10 p-2 rounded-full transition">
                        <ChevronLeft className="w-4 h-4" />
                        <span className="text-sm">Go Back</span>
                    </Link>
                    <h2 className="text-white text-xl font-bold">Roadmap</h2>
                </div>
                <Link href="/create">
                    <Button className="flex gap-1 bg-purple-1 hover:bg-purple-1/70 text-white font-semibold h-12 rounded-xl">+ Add<span className="hidden md:flex"> Feedback</span></Button>
                </Link>
            </div>

            <div className="flex w-full justify-center items-center lg:hidden mb-20">

                {/* MOBILE TABS */}

                <Tabs defaultValue="account" className="w-full flex flex-col justify-center items-center mt-5">
                    <TabsList className="flex flex-wrap h-max">
                        <TabsTrigger value="planned">Planned ({feedback && feedback.filter((post) => post.status === "Planned").length})</TabsTrigger>
                        <TabsTrigger value="progress">In-Progress ({feedback && feedback.filter((post) => post.status === "Progress").length})</TabsTrigger>
                        <TabsTrigger value="live">Live ({feedback && feedback.filter((post) => post.status === "Live").length})</TabsTrigger>
                    </TabsList>
                    <TabsContent value="planned" className="flex flex-col gap-5 px-5">
                        <span className="text-slate-500 text-sm mb-2">Ideas prioritized for research</span>
                        {feedback && feedback.filter((post) => post.status === "Planned").map(async (post) => {

                            const comments = await db.comment.findMany({
                                where: {
                                    feedbackId: post.id
                                }
                            });

                            return (
                                <FeedbackMapCard key={post.id} post={post} color="#fb923c" commentLength={comments.length} profile={profile} />
                            )

                        })}
                    </TabsContent>
                    <TabsContent value="progress" className="flex flex-col gap-5 px-5">
                        <span className="text-slate-500 text-sm mb-2">Carefully being developed</span>
                        {feedback && feedback.filter((post) => post.status === "Progress").map(async (post) => {

                            const comments = await db.comment.findMany({
                                where: {
                                    feedbackId: post.id
                                }
                            });


                            return (
                                <FeedbackMapCard key={post.id} post={post} color="#a855f7" commentLength={comments.length} profile={profile} />
                            )
                        })}
                    </TabsContent>
                    <TabsContent value="live" className="flex flex-col gap-5 px-5">
                        <span className="text-slate-500 text-sm mb-2">Released features</span>
                        {feedback && feedback.filter((post) => post.status === "Live").map(async (post) => {

                            const comments = await db.comment.findMany({
                                where: {
                                    feedbackId: post.id
                                }
                            });

                            return (
                                <FeedbackMapCard key={post.id} post={post} color="#0ea5e9" commentLength={comments.length} profile={profile} />
                            )
                        })}
                    </TabsContent>
                </Tabs>
            </div>

            <div className="hidden lg:flex w-full gap-10 mb-20">
                <div className="flex flex-1 flex-col gap-2 mt-10">
                    <h3 className="text-blue-dark text-lg font-bold">Planned ({feedback && feedback.filter((post) => post.status === "Planned").length})</h3>
                    <span className="text-slate-500 text-sm mb-2">Ideas prioritized for research</span>
                    <div className="flex flex-col gap-5">
                        {feedback && feedback.filter((post) => post.status === "Planned").map(async (post) => {
                            const comments = await db.comment.findMany({
                                where: {
                                    feedbackId: post.id
                                }
                            });

                            return (
                                <FeedbackMapCard key={post.id} post={post} color="#fb923c" commentLength={comments.length} profile={profile} />
                            )
                        })}
                    </div>
                </div>

                <div className="flex flex-1 flex-col gap-2 mt-10">
                    <h3 className="text-blue-dark text-lg font-bold">In-Progress ({feedback && feedback.filter((post) => post.status === "Progress").length})</h3>
                    <span className="text-slate-500 text-sm mb-2">Carefully being developed</span>
                    <div className="flex flex-col gap-5">
                        {feedback && feedback.filter((post) => post.status === "Progress").map(async (post) => {
                            const comments = await db.comment.findMany({
                                where: {
                                    feedbackId: post.id
                                }
                            });


                            return (
                                <FeedbackMapCard key={post.id} post={post} color="#a855f7" commentLength={comments.length} profile={profile} />
                            )
                        })}
                    </div>
                </div>

                <div className="flex flex-1 flex-col gap-2 mt-10">
                    <h3 className="text-blue-dark text-lg font-bold">Live ({feedback && feedback.filter((post) => post.status === "Live").length})</h3>
                    <span className="text-slate-500 text-sm mb-2">Released features</span>
                    <div className="flex flex-col gap-5">
                        {feedback && feedback.filter((post) => post.status === "Live").map(async (post) => {
                            const comments = await db.comment.findMany({
                                where: {
                                    feedbackId: post.id
                                }
                            });

                            return (
                                <FeedbackMapCard key={post.id} post={post} color="#0ea5e9" commentLength={comments.length} profile={profile} />
                            )
                        })}
                    </div>
                </div>
            </div>
        </MaxWidthWrapper>
    )
}

export default RoadMap