import MaxWidthWrapper from '@/components/MaxWidthWrapper'
import LayoutContainer from '@/components/navigation/layout-container'
import Navbar from '@/components/navigation/navbar'
import OptionsHeader from '@/components/navigation/options-header'
import { SignOutButton } from '@clerk/nextjs'
import React from 'react'

const MainLayout = ({ children }: { children: React.ReactNode }) => {
    return (
        <MaxWidthWrapper>
            <div className="flex lg:gap-7 flex-col lg:flex-row">
                <Navbar />

                <div className="flex flex-col gap-5 flex-1">
                    <OptionsHeader />

                    <div className="px-5">
                        {children}
                    </div>
                </div>
            </div>
        </MaxWidthWrapper>
    )
}

export default MainLayout