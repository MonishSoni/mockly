import React from 'react'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Textarea } from "@/components/ui/textarea"
import Interviewer from './Interviewer'
import { Button } from './ui/button'

const UserInputDialog = ({ children }) => {

    const interviewerData = [
        {
            name: "Jack",
            image: "/Jack.jpeg"
        },
        {
            name: "Ana",
            image: "/Ana.jpeg"
        },
        {
            name: "Andy",
            image: "/Andy.jpeg"
        }
    ];

    return (
        <div>
            <Dialog>
                <DialogTrigger>{children}</DialogTrigger>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Get Started with Your Interview</DialogTitle>
                        <DialogDescription>
                            <div>
                                <p className='mb-2'>  Please provide the topics or areas you'd like to focus on for your interview.
                                    This could include specific skills, job roles, or industries. Once you're done, select an instructor and start your mock interview
                                </p>
                                <Textarea />
                                <p className='text-sm text-gray-600 mt-3.5'>Choose an expert to conduct your interview</p>
                                <div className='mt-1.5 flex gap-5 justify-start items-center'>
                                    {/* Map through the interviewerData and display each interviewer */}
                                    {interviewerData.map((interviewer, index) => (
                                        <Interviewer
                                            key={index}
                                            name={interviewer.name}
                                            image={interviewer.image}
                                        />
                                    ))}
                                </div>

                                <div className='flex justify-end items-center gap-2 mt-2'>
                                    <Button className='cursor-pointer'>Cancel</Button>
                                    <Button className='cursor-pointer'>Start</Button>
                                </div>
                            </div>

                        </DialogDescription>

                    </DialogHeader>
                </DialogContent>
            </Dialog>

        </div>
    )
}

export default UserInputDialog
