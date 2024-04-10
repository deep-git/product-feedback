import { SignUp } from '@clerk/nextjs'
import React from 'react'

const SignUpPage = () => {
    return (
        <div className="flex justify-center items-center w-full h-screen">
            <SignUp />
        </div>
    )
}

export default SignUpPage