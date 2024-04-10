"use client";

import React, { useState } from 'react'
import { Label } from './ui/label'
import { Input } from './ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select'
import { tagOptions } from '@/constants'
import { Textarea } from './ui/textarea'
import { Button } from './ui/button'
import axios from "axios";
import { useRouter } from 'next/navigation';
import { Plus } from 'lucide-react';

const AddFeedbackForm = () => {

    const [title, setTitle] = useState<string>('');
    const [category, setCategory] = useState<string>('');
    const [details, setDetails] = useState<string>('');
    const [isLoading, setIsLoading] = useState(false);
    const [titleError, setTitleError] = useState<string | undefined>();
    const [categoryError, setCategoryError] = useState<string | undefined>();
    const [detailsError, setDetailsError] = useState<string | undefined>();
    const router = useRouter();

    const onSubmit = async () => {
        if (title === "" || title === " " || title === undefined) {
            setTitleError("Title field cannot be left empty");
            return;
        } else {
            setTitleError(undefined);
        }

        if (category === "" || category === undefined) {
            setCategoryError("Category field cannot be left empty");
            return;
        } else {
            setCategoryError(undefined);
        }

        if (details === "" || details === " " || details === undefined) {
            setDetailsError("Details field cannot be left empty");
            return;
        } else {
            setDetailsError(undefined);
        }

        setIsLoading(true);

        console.log("FRONTEND", title, category, details);

        try {
            const response = await axios.post("/api/feedback", {
                title,
                category,
                details
            }, {
                headers: { 'Content-Type': 'application/json' }
            });

            setIsLoading(false);
            setTitle('');
            setCategory('');
            setDetails('');

            router.push("/all");
        } catch (error) {
            console.log(error);
        }
    }

    const onCancel = () => {
        setTitle('');
        setCategory('');
        setDetails('');
        router.push("/all");
    }

    return (
        <div className="flex flex-col gap-5 mt-2">
            <div className="flex flex-col gap-2">
                <Label className="font-semibold text-blue-dark text-md">Feedback Title</Label>
                <span className="text-gray-500 text-sm">Add a short, descriptive headline</span>

                <Input placeholder="Feedback title" className="bg-slate-100" value={title} onChange={(e) => setTitle(e.target.value)} />

                {titleError && (
                    <span className="text-sm text-red-600">{titleError}</span>
                )}
            </div>

            <div className="flex flex-col gap-2">
                <Label className="font-semibold text-blue-dark text-md">Category</Label>
                <span className="text-gray-500 text-sm">Choose a category for your feedback</span>

                <Select onValueChange={(value) => setCategory(value)}>
                    <SelectTrigger className="bg-slate-100">
                        <SelectValue placeholder="Choose a category" />
                    </SelectTrigger>

                    <SelectContent>
                        {tagOptions && tagOptions.filter((tag) => tag.label !== "All").map((tag) => (
                            <SelectItem value={tag.label} key={tag.label}>{tag.label}</SelectItem>
                        ))}
                    </SelectContent>
                </Select>

                {categoryError && (
                    <span className="text-sm text-red-600">{categoryError}</span>
                )}
            </div>

            <div className="flex flex-col gap-2">
                <Label className="font-semibold text-blue-dark text-md">Feedback Detail</Label>
                <span className="text-gray-500 text-sm">Include any specific comments on what should be improved, added, etc.</span>

                <Textarea className="bg-slate-100 h-20 md:h-32 max-h-40" value={details} onChange={(e) => setDetails(e.target.value)} />

                {detailsError && (
                    <span className="text-sm text-red-600">{detailsError}</span>
                )}
            </div>

            <div className="flex flex-col sm:flex-row gap-5 sm:mt-10 sm:ml-auto">
                <Button onClick={() => onSubmit()} disabled={isLoading} className="flex sm:hidden bg-purple-1 hover:bg-purple-1/70 mt-10">Add Feedback</Button>

                <Button onClick={() => onCancel()} className="bg-blue-dark hover:bg-blue-dark/70">Cancel</Button>

                <Button onClick={() => onSubmit()} disabled={isLoading} className="hidden sm:flex bg-purple-1 hover:bg-purple-1/70">Add Feedback</Button>
            </div>
        </div>
    )
}

export default AddFeedbackForm