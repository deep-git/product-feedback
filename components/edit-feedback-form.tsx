"use client";

import React, { useState } from 'react';
import { Label } from './ui/label'
import { Input } from './ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select'
import { tagOptions } from '@/constants'
import { Textarea } from './ui/textarea'
import { Button } from './ui/button'
import axios from "axios";
import { useRouter } from 'next/navigation';
import { RiEdit2Fill } from "react-icons/ri";

interface EditFeedbackFormProps {
    post: {
        id: string;
        title: string;
        category: string;
        details: string;
        likes: number;
        profileId: string;
    } | null
}

const EditFeedbackForm = ({ post }: EditFeedbackFormProps) => {

    const [title, setTitle] = useState<string | undefined>(post?.title);
    const [category, setCategory] = useState<string | undefined>(post?.category);
    const [details, setDetails] = useState<string | undefined>(post?.details);
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

        try {
            const response = await axios.patch(`/api/feedback/${post?.id}/edit`, {
                title,
                category,
                details
            });

            setIsLoading(false);

            router.push(`/post/${post?.id}`);
            router.refresh();
        } catch (error) {
            console.log(error);
        }
    }

    const onCancel = () => {
        router.push(`/post/${post?.id}`);
    }

    return (
        <div className="relative flex flex-col gap-5 bg-white p-7 rounded-xl">

            <div className="absolute flex justify-center items-center -top-7 left-7 bg-gradient-to-tr from-purple-600 to-pink-600 w-14 h-14 rounded-full">
                <RiEdit2Fill className="text-white w-7 h-7" />
            </div>

            <h1 className="text-blue-dark text-2xl font-bold mt-5">Editing Feedback</h1>

            <div className="flex flex-col gap-2 mt-4">
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

                <Select value={category} onValueChange={(value) => setCategory(value)}>
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

            <div className="flex flex-col sm:flex-row gap-5 sm:ml-auto sm:mt-10">
                <Button onClick={() => onSubmit()} disabled={isLoading} className="flex sm:hidden bg-purple-1 hover:bg-purple-1/70 mt-10 md:mt-0">Update</Button>

                <Button onClick={() => onCancel()} className="bg-blue-dark hover:bg-blue-dark/70">Cancel</Button>

                <Button onClick={() => onSubmit()} disabled={isLoading} className="hidden sm:flex bg-purple-1 hover:bg-purple-1/70">Update</Button>
            </div>
        </div>
    )
}

export default EditFeedbackForm