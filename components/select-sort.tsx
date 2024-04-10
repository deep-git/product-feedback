"use client";

import React, { useState } from 'react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

const SelectSort = () => {

    const [sort, setSort] = useState("recent");

    return (
        <Select value={sort} onValueChange={(value) => setSort(value)}>
            <SelectTrigger className="w-max bg-blue-dark border-blue-dark text-white font-bold">
                <SelectValue placeholder="Choose sort" />
            </SelectTrigger>
            <SelectContent className="text-xs">
                <SelectItem value="upvotes">Most Upvotes</SelectItem>
                <SelectItem value="recent">Most Recent</SelectItem>
                <SelectItem value="oldest">Oldest</SelectItem>
            </SelectContent>
        </Select>
    )
}

export default SelectSort