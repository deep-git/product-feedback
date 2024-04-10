import React, { useEffect, useState } from 'react'
import NavbarContent from './navbar-content';
import { currentProfile } from '@/lib/current-profile';
import { db } from '@/lib/db';

const Navbar = async () => {

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
    })

    return (
        <NavbarContent feedback={feedback} profile={profile} />
    )
}

export default Navbar