import React from 'react';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface CommentAvatarProps {
    profile: {
        id: string;
        userId: string;
        name: string;
        imageUrl: string;
        email: string;
        createdAt: Date;
        updatedAt: Date;
    }
}

const CommentAvatar = ({ profile }: CommentAvatarProps) => {
    return (
        <Avatar>
            <AvatarImage src={profile.imageUrl} />
            <AvatarFallback>CN</AvatarFallback>
        </Avatar>
    )
}

export default CommentAvatar