import MaxWidthWrapper from '@/components/MaxWidthWrapper';
import LayoutContainer from '@/components/navigation/layout-container';
import Navbar from '@/components/navigation/navbar';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { initialProfile } from '@/lib/initial-profile';
import React from 'react';
import { GiHamburgerMenu } from "react-icons/gi";

const Home = async () => {

    const profile = await initialProfile();

    if (!profile) {
        return null;
    }

    return (
        <div>Content</div>
    )
}

export default Home