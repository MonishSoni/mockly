"use client";
import { Button } from "@/components/ui/button";
import { api } from "@/convex/_generated/api";
import { UserButton } from "@stackframe/stack";
import { useQuery } from "convex/react";
import Image from "next/image";
import { useParams } from "next/navigation";
import { useEffect, useRef, useState } from "react";

const DiscussionRoomPage = () => {
  const { roomid } = useParams();
  const roomData = useQuery(api.DiscussionRoom.getDiscussionRoom, { id: roomid });
  const [enabledMic, setEnabledMic] = useState(false);
  const [isRecordRTCLoaded, setIsRecordRTCLoaded] = useState(false);
  const recorder = useRef(null);
  const streamRef = useRef(null);
  const silenceTimeoutRef = useRef(null);

  // Load the RecordRTC library when component mounts
  useEffect(() => {
    const loadRecordRTC = async () => {
      try {
        const RecordRTC = (await import('recordrtc')).default;
        window.RecordRTC = RecordRTC; // Store it globally for easier access
        setIsRecordRTCLoaded(true);
        console.log("RecordRTC loaded successfully");
      } catch (err) {
        console.error("Failed to load RecordRTC:", err);
      }
    };

    loadRecordRTC();

    // Cleanup function
    return () => {
      if (streamRef.current) {
        streamRef.current.getTracks().forEach(track => track.stop());
      }
      if (silenceTimeoutRef.current) {
        clearTimeout(silenceTimeoutRef.current);
      }
    };
  }, []);

  if (!roomid) {
    return <div>Error: Room ID not found.</div>;
  }

  if (!roomData) {
    return <div>Loading...</div>;
  }

  const connectToServer = async () => {
    if (!isRecordRTCLoaded) {
      console.error("RecordRTC is not loaded yet");
      return;
    }

    try {
      // Request microphone access
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      streamRef.current = stream;

      // Initialize RecordRTC with proper configuration
      recorder.current = new window.RecordRTC(stream, {
        type: "audio",
        mimeType: "audio/webm;codecs=pcm",
        recorderType: window.RecordRTC.StereoAudioRecorder,
        timeSlice: 250, // Callback interval for ondataavailable
        desiredSampRate: 16000, // Sampling rate
        numberOfAudioChannels: 1, // Mono audio
        bufferSize: 4096,
        audioBitsPerSecond: 128000,
        ondataavailable: async (blob) => {
          if (silenceTimeoutRef.current) {
            clearTimeout(silenceTimeoutRef.current);
          }

          const buffer = await blob.arrayBuffer();

          silenceTimeoutRef.current = setTimeout(() => {
            console.log("User stopped talking");
            // Handle user stopped talking (e.g., send final transcript, stop recording)
          }, 2000);
        },
      });

      // Start recording
      recorder.current.startRecording();
      console.log("Recording started");
      setEnabledMic(true);
    } catch (err) {
      console.error("Error during recording setup:", err);
      if (err.name === "NotFoundError") {
        console.error("No audio input device found.");
      } else if (err.name === "NotAllowedError") {
        console.error("Permission denied by the user.");
      } else {
        console.error("Error accessing media devices:", err);
      }
    }
  };

  const disconnect = () => {
    if (recorder.current) {
      recorder.current.stopRecording(() => {
        const blob = recorder.current.getBlob();
        console.log("Recording stopped. Blob:", blob);
        
        // Clean up resources
        recorder.current = null;
        
        if (streamRef.current) {
          streamRef.current.getTracks().forEach(track => track.stop());
          streamRef.current = null;
        }
      });
    }
    
    if (silenceTimeoutRef.current) {
      clearTimeout(silenceTimeoutRef.current);
      silenceTimeoutRef.current = null;
    }
    
    setEnabledMic(false);
    console.log("Disconnected");
  };

  return (
    <>
      <p>Topic: {roomData.topic}</p>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 mt-3">
        <div className="lg:col-span-2">
          <div className="bg-secondary h-[65vh] rounded-lg flex justify-center items-center relative">
            <div className="flex items-center justify-center flex-col gap-0.5">
              <Image
                className="rounded-full animate-pulse"
                src={`/${roomData.expertName}.jpeg`}
                width={100}
                height={100}
                alt="expert image"
              />
              <p className="text-gray-600">{roomData.expertName}</p>
            </div>

            <div className="p-5 bg-gray-200 px-10 rounded-lg absolute bottom-8 right-8">
              <UserButton />
            </div>
          </div>

          <div className="flex justify-center items-center mt-3">
            {!enabledMic ? (
              <Button 
                onClick={connectToServer}
                disabled={!isRecordRTCLoaded}
              >
                {isRecordRTCLoaded ? "Connect Now" : "Loading..."}
              </Button>
            ) : (
              <Button onClick={disconnect}>Disconnect</Button>
            )}
          </div>
        </div>

        <div>
          <div className="bg-secondary h-[65vh] rounded-lg flex items-center justify-center">
            <p className="text-gray-600">Conversation</p>
          </div>

          <p className="text-sm text-gray-600 text-center mt-3 px-14">
            At the end of your conversation feedback will be generated automatically.
          </p>
        </div>
      </div>
    </>
  );
};

export default DiscussionRoomPage;