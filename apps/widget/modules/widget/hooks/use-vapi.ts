import Vapi from "@vapi-ai/web";
import { useState,useEffect } from "react";


interface TranscriptMessage {
    role: "user" | "Assistant";
    text: string
}

export const useVapi = () =>{
    const [vapi,setVapi] = useState<Vapi | null>(null);
    const [isConnected,setIsConnected] = useState(false);
    const [isConnecting,setIsConnecting] = useState(false);
    const [isSpeaking,setIsSpeaking] = useState(false);
    const [transcript,setTranscript] = useState<TranscriptMessage[]>([]);

    useEffect(()=>{
        const vapiInstance = new Vapi("093ac81f-d57e-46e0-8a8b-22d473275934");
        setVapi(vapiInstance)


        vapiInstance.on("call-start" ,()=>{
            setIsConnected(true)
            setIsConnecting(false)
            setTranscript([])
        });

        vapiInstance.on("call-end" ,()=>{
            setIsConnected(false)
            setIsConnecting(false)
            setIsSpeaking(false)
        });

        vapiInstance.on("speech-start",()=>{
            setIsSpeaking(true)
        });

        vapiInstance.on("speech-end",()=>{
            setIsSpeaking(false)
        });

        vapiInstance.on("error",(error)=>{
            console.log(error,"VAPI_ERROR");
            setIsConnecting(false)
        });

        vapiInstance.on("message",(message)=>{
            if(message.type === "transcript" && message.transcriptType === "final"){
                setTranscript((prev)=>[
                    ...prev,
                    {
                        role: message.role === "user" ? "user" : "Assistant",
                        text: message.transcript,
                    }
                ])
            }
        });

        return () =>{
            vapiInstance?.stop()
        }
    },[]);

    const startCall = () =>{
        setIsConnecting(true)

        if(vapi){
            vapi.start("bb9ee499-8f08-4070-9a74-1599d69ec04d")
        }
    }

    const endCall = () =>{
        setIsConnecting(false)
        if(vapi){
            vapi.stop()
        }
    }
    return {
        isSpeaking,
        isConnecting,
        isConnected,
        transcript,
        startCall,
        endCall
    }
}