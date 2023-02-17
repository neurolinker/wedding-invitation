import React from "react";
import { NavigationProps } from "../types/navigation-props"


const Navigation = ({ open, onOpen, onAudio }: NavigationProps): JSX.Element => {
    const [audioStatus, setAudioStatus] = React.useState<boolean>(false);
    const opening = async() => {
        await setAudioStatus(true)
        await onOpen(true)
    }

    return (
        <>
            {/* open button */}
            {(open) && (
                <>
                    <div className = " hidden md:block fixed bottom-10 -right-16">
                        <img className = "w-80 -rotate-45" src="./images/dark-blue/pita.webp" alt="pita-lg" />
                    </div>
                    <div onClick={() => opening()} className = "hidden md:flex z-50 -rotate-45 fixed bottom-20 -m-2 right-20 p-0.5 bg-gradient-to-r from-[#8C5D1D] via-[#B5AF82] to-[#8C5D1D] rounded-full">
                        <div className = "flex animate-pulse rounded-full py-5 px-3.5 bg-gradient-to-r from-[#2E2B2D] via-[#575757] to-[#2E2B2D] text-white text-md">
                            Buka 
                        </div> 
                    </div>
                    <div className = "flex md:hidden items-center justify-center fixed top-0 h-screen w-full bottom-1/2 z-50">
                        <img className = "w-full mt-16" src="./images/dark-blue/pita.webp" alt="pita-sm" />
                        <div onClick={() => opening()} className = "mt-9 z-50 flex fixed p-0.5 bg-gradient-to-r from-[#8C5D1D] via-[#B5AF82] to-[#8C5D1D] rounded-full">
                            <div className = "flex animate-pulse rounded-full py-5 px-3.5 bg-gradient-to-r from-[#2E2B2D] via-[#575757] to-[#2E2B2D] text-white text-md">
                                Buka
                            </div> 
                        </div>
                    </div>
                </>
            )}

            {/* bottom navigation */}
            {/* {(!open) && (
                <div className = "flex w-full fixed bottom-0 z-50">
                    <div className="flex flex-row items-center justify-center m-2 w-full bg-green-600 rounded-lg p-1">
                        <div className="w-1/4 bg-red-600 flex items-center justify-center">1</div>
                        <div className="w-1/4 bg-yellow-600 flex items-center justify-center">2</div>
                        <div className="w-1/4 bg-red-600 flex items-center justify-center">3</div>
                        <div className="w-1/4 bg-yellow-600 flex items-center justify-center">4</div>
                    </div>
                </div>
            )} */}
            
            {/* audio button */}
            <div className = "fixed flex items-center  justify-center w-full md:w-auto md:h-screen bottom-4 md:bottom-0 right-0 md:right-4 z-50">
                <div onClick = {async () => {await setAudioStatus(!audioStatus); await audioStatus ? onAudio('pause') : onAudio('play')}} className = " bg-gradient-to-r from-[#A98F5B] via-[#FBE698] to-[#A98F5B] rounded-full p-2 shadow-xl ">
                    {audioStatus ? (
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 9.75L19.5 12m0 0l2.25 2.25M19.5 12l2.25-2.25M19.5 12l-2.25 2.25m-10.5-6l4.72-4.72a.75.75 0 011.28.531V19.94a.75.75 0 01-1.28.53l-4.72-4.72H4.51c-.88 0-1.704-.506-1.938-1.354A9.01 9.01 0 012.25 12c0-.83.112-1.633.322-2.395C2.806 8.757 3.63 8.25 4.51 8.25H6.75z" />
                        </svg>
                    ) : (
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M19.114 5.636a9 9 0 010 12.728M16.463 8.288a5.25 5.25 0 010 7.424M6.75 8.25l4.72-4.72a.75.75 0 011.28.53v15.88a.75.75 0 01-1.28.53l-4.72-4.72H4.51c-.88 0-1.704-.507-1.938-1.354A9.01 9.01 0 012.25 12c0-.83.112-1.633.322-2.396C2.806 8.756 3.63 8.25 4.51 8.25H6.75z" />
                        </svg>
                    )}
                </div>
            </div>
        </>
    )
}

export default Navigation