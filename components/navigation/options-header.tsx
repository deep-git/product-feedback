import React from 'react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '../ui/button';
import Link from 'next/link';
import { currentProfile } from '@/lib/current-profile';
import { db } from '@/lib/db';
import { HiLightBulb } from "react-icons/hi";
import SelectSort from '../select-sort';


const OptionsHeader = async () => {

    const profile = await currentProfile();

    if (!profile) {
        return null;
    }

    const feedback = await db.feedback.findMany();

    return (
        <div className="flex justify-between items-center bg-blue-dark px-6 py-3 flex-wrap lg:h-max lg:w-full lg:mt-10 md:rounded-xl">
            <div className="flex items-center gap-2">
                <HiLightBulb className="w-5 h-5 text-white" />
                <span className="text-white font-semibold">{feedback.length} Suggestions</span>
            </div>

            {/*
            <div className="flex justify-center items-center gap-2">
                <span className="text-white">Sort by: </span>
                <SelectSort />
            </div>
            */}

            <Link href="/create">
                <Button className="flex gap-1 bg-purple-1 hover:bg-purple-1/70 text-white font-semibold h-12 rounded-xl">+ Add<span className="hidden md:flex"> Feedback</span></Button>
            </Link>
        </div>
    )
}

export default OptionsHeader