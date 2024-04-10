import React from 'react';
import Navbar from '@/components/navigation/navbar';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

const LayoutContainer = () => {
    return (
        <div className="flex flex-col lg:flex-row lg:gap-7">
            <Navbar />

            <div className="flex justify-between items-center bg-blue-dark px-6 py-3 flex-wrap lg:h-max lg:w-full lg:mt-10 lg:rounded-xl">
                <div className="flex justify-center items-center gap-2">
                    <span className="text-white">Sort by: </span>
                    <Select>
                        <SelectTrigger className="w-max bg-blue-dark border-blue-dark text-white font-bold">
                            <SelectValue placeholder="Choose sort" />
                        </SelectTrigger>
                        <SelectContent className="text-xs">
                            <SelectItem value="upvotes">Most Upvotes</SelectItem>
                            <SelectItem value="recent">Most Recent</SelectItem>
                            <SelectItem value="oldest">Oldest</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
                <Button className="flex gap-1 bg-purple-1 hover:bg-purple-1/70 text-white font-semibold h-12 rounded-xl">+ Add<span className="hidden md:flex"> Feedback</span></Button>
            </div>
        </div>
    )
}

export default LayoutContainer