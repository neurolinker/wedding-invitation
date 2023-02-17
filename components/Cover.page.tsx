import { motion } from "framer-motion"
import { CoverProps } from "../types/cover-props"

const CoverPage = ({ guest }: CoverProps): JSX.Element => {
    return (
        <motion.div
            className = "-z-20 px-4 md:px-10 pt-4 md:pt-10 bg-main-pattern relative pb-24 rounded-lg flex flex-col md:flex-row "
            initial={{
                opacity: 0,
                y: 50
            }}
            animate={{
                opacity: 1,
                y: 0
            }}
        >
            <div className = "w-full md:w-1/2 h-[calc((100vh-20px)/2)] md:h-[calc(100vh-90px)] items-center justify-center flex p-1">
                <div className="flex flex-col items-center justify-center relative w-52 h-52 md:w-96 md:h-96 rounded-full  ">
                    <div className = "absolute p-7 md:p-14 flex items-center justify-center z-40  bg-opacity-20  rounded-full ">
                        <img className = "objact-cover rounded-full" src="./images/main-photo.png" alt="vas" />
                    </div>
                    <div className = "absolute flex z-40 ">
                        <img className = "rotate-45 object-contain" src="./images/dark-blue/circle-accent.webp" alt="vas" />
                    </div>
                </div>
            </div>
            {/* <div className = " w-full md:w-1/2 h-[calc((100vh-20px)/2)] md:h-[calc(100vh-90px)] items-center justify-center flex p-1">
                <div className="flex flex-col items-center justify-center relative w-48 h-48 rounded-full ">
                    <div className = "absolute  z-40 w-60 h-60 md:w-80 md:h-80 ">
                        <img className = "rotate-45 object-cover h-full w-full" src="./images/circle-accent.webp" alt="vas" />
                    </div>
                    <div className = "absolute flex items-center justify-center z-40  bg-opacity-20 h-full w-full m-4 rounded-full ">
                        <img className = "h-auto rounded-full" src="./images/main-photo.png" alt="vas" />
                    </div>
                </div>
            </div> */}
            <div className = "w-full md:w-1/2 h-[calc((100vh-20px)/2)] md:h-[calc(100vh-90px)] flex flex-col items-center justify-center">
                <div className = "font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#A98F5B] via-[#FBE698] to-[#A98F5B] font-moonRegular text-2xl md:text-5xl  mb-10 p-2">
                {process.env.NEXT_PUBLIC_WOMAN_BRIDE_INITIAL} & {process.env.NEXT_PUBLIC_MAN_BRIDE_INITIAL}
                </div>
                <div className = "font-normal text-sm text-transparent bg-clip-text bg-gradient-to-r from-[#A98F5B] via-[#FBE698] to-[#A98F5B]">
                    Kepada Yth
                </div>
                <div className = "font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#A98F5B] via-[#FBE698] to-[#A98F5B]">
                    {guest}
                </div>
            </div>
        </motion.div>
    )
}

export default CoverPage