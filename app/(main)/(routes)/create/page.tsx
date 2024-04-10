import AddFeedbackForm from '@/components/add-feedback-form'
import { Plus } from 'lucide-react'
import React from 'react'

const CreateFeedback = () => {
    return (
        <div className="relative flex flex-col gap-5 bg-white p-5 mt-7 mb-5 rounded-lg">
            <div className="absolute flex justify-center items-center -top-7 left-7 bg-gradient-to-tr from-purple-600 to-pink-600 w-14 h-14 rounded-full">
                <Plus className="text-white w-7 h-7" />
            </div>

            <h2 className="text-2xl text-blue-dark font-bold mt-5">Create new Feedback</h2>

            <AddFeedbackForm />
        </div>
    )
}

export default CreateFeedback