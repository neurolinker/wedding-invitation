import { motion } from "framer-motion"

const ClossingPage = (): JSX.Element => {
    return (
        <motion.div
            className = "mx-4 md:mx-10 mt-4 md:mt-10 relative mb-24 rounded-lg space-y-5 flex flex-col justify-center items-center"
            initial={{
                opacity: 0,
                y: 50
            }}
            animate={{
                opacity: 1,
                y: 0
            }}
        >
            <div className = " w-full items-center justify-center flex p-1">
                <div className="flex flex-col items-center justify-center relative w-48 h-48 rounded-full ">
                    <div className = "absolute p-7 flex items-center justify-center z-40  bg-opacity-20  rounded-full ">
                        <img className = "objact-cover rounded-full" src="./images/main-photo.png" alt="vas" />
                    </div>
                    <div className = "absolute flex z-40 ">
                        <img className = "rotate-45 object-contain" src="./images/dark-blue/circle-accent.webp" alt="vas" />
                    </div>
                </div>
            </div>
            <div className = "w-full flex flex-col items-center justify-center  ">
                <div className = "font-bold text-center text-transparent bg-clip-text bg-gradient-to-r from-[#A98F5B] via-[#FBE698] to-[#A98F5B] font-moonRegular text-2xl md:text-5xl mb-10 p-2">
                    {process.env.NEXT_PUBLIC_MAN_BRIDE_INITIAL} & {process.env.NEXT_PUBLIC_WOMAN_BRIDE_INITIAL}
                </div>
                <div className = "font-normal text-center text-sm text-[#e2da97]">
                    Atas kehadiran dan doa restunya, kami ucapkan terimakasih
                </div>
                <div className = "mt-10 mb-5 text-xl font-bold text-[#e2da97]">
                    Protokol Kesehatan
                </div>
                <div className = "flex items-start justify-center space-x-2 w-full">
                    <div className=" bg-[#e2da97] flex rounded-xl p-2 flex-col items-center  justify-center w-20 h-20">
                        <img className = "w-10 h-10" src="./images/mask.png" alt="" />
                        <div className=" flex text-center text-xs text-[black]">
                            Gunakan Masker
                        </div>
                    </div>
                    <div className=" bg-[#e2da97] flex rounded-xl p-2 flex-col items-center  justify-center w-20 h-20">
                        <img className = "w-10 h-10" src="./images/washing.png" alt="" />
                        <div className=" flex text-center text-xs text-[black]">
                            Mencuci Tangan
                        </div>
                    </div>
                    <div className=" bg-[#e2da97] flex rounded-xl p-2 flex-col items-center  justify-center w-20 h-20">
                        <img className = "w-10 h-10" src="./images/distance.png" alt="" />
                        <div className=" flex text-center text-xs text-[black]">
                            Menjaga Jarak
                        </div>
                    </div>
                </div>
            </div>
        </motion.div>
    )
}

export default ClossingPage