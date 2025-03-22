

import React, { useState } from 'react'
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
import { DialogClose } from '@radix-ui/react-dialog'
import { useMutation } from 'convex/react'
import { api } from '@/convex/_generated/api'
import { LoaderCircle } from 'lucide-react'
import { useRouter } from 'next/navigation'; 


const UserInputDialog = ({ children }) => {

    const [selectedExpert, setSelectedExpert] = useState()
    const [topic, setTopic] = useState()
    const [loading, setLoading] = useState(false)
    const [openDialog, setOpenDialog] = useState(false)
    const router = useRouter()

    const createDiscussionRoom = useMutation(api.DiscussionRoom.createNewRoom)

    const onNextClick = async () => {
        setLoading(true)
        const result = await createDiscussionRoom({
            topic: topic,
            expertName: selectedExpert
        })
        setLoading(false)
        setOpenDialog(false)
        setSelectedExpert('')
        setTopic('')
        router.push('/discussion-room/' + result)
        console.log('pushed')
    }

    console.log(selectedExpert)
    console.log(topic)

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
            <Dialog open={openDialog} onOpenChange={setOpenDialog}>
                <DialogTrigger>{children}</DialogTrigger>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Get Started with Your Interview</DialogTitle>
                        <DialogDescription>
                            <div>
                                <span className='mb-2 block'>  Please provide the topics or areas you'd like to focus on for your interview.
                                    This could include specific skills, job roles, or industries. Once you're done, select an instructor and start your mock interview
                                </span>
                                <Textarea placeholder="Enter the topic for mock interview" className='mt-4 resize-none min-h-25'
                                    onChange={(e) => setTopic(e.target.value)}
                                />
                                <p className='text-sm text-gray-600 mt-3.5'>Choose an expert to conduct your interview</p>
                                <div className='mt-1.5 flex gap-5 justify-start items-center'>
                                    {/* Map through the interviewerData and display each interviewer */}
                                    {interviewerData.map((interviewer, index) => (
                                        <Interviewer
                                            key={index}
                                            name={interviewer.name}
                                            image={interviewer.image}
                                            selectexp={selectedExpert}
                                            setselectedexp={setSelectedExpert}
                                        />
                                    ))}
                                </div>

                                <div className='flex justify-end items-center gap-2 mt-2'>
                                    <DialogClose asChild>
                                        <Button className='cursor-pointer'>Cancel</Button>
                                    </DialogClose>
                                    <Button disabled={(!topic || !selectedExpert || loading)} onClick={onNextClick} className='cursor-pointer'> {loading && <LoaderCircle />} Start</Button>
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
