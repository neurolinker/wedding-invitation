import { motion } from "framer-motion"
import React from "react";


const T2kPage = React.forwardRef<HTMLDivElement>((props,ref) => {
    return (
        <motion.div
                    ref = {ref}
                    style={{color:'red'}}
                        className = " bg-[#70a878] bg-opacity-70 bg-clip-padding backdrop-filter  backdrop-blur-sm border-y-2 border-[#C4A862] flex flex-col md:flex-row p-2 "
                        initial={{ opacity: 0, scale: 0.5 }}
                        whileInView={{ 
                            opacity: 1, 
                            scale: 1,
                            transition: {
                            type: "spring",
                            bounce: 0.4,
                            duration: 0.8
                            } 
                        }}
                    >
                        
                        <div className = " relative  w-full  flex flex-col items-center justify-center">
                            {/* <div className = "font-moonRegular font-bold text-4xl mb-5 text-[#FCE089]">
                                Tie The Knot
                            </div> */}
                            <div className = " relative w-full  flex items-center justify-center  mb-14">
                            <p className = "font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#A98F5B] via-[#FBE698] to-[#A98F5B] font-moonRegular text-4xl">Tie The Knot</p>
                            <div className = "absolute flex  items-center justify-center top-7 h-10 w-full md:w-1/2">
                                <img className = " h-auto" src="./images/dark-blue/line.webp" alt="tie-the-knot" />
                            </div>
                        </div>
                            <div className = "font-normal text-center text-lg mb-6 text-transparent bg-clip-text bg-gradient-to-r from-[#A98F5B] via-[#FBE698] to-[#A98F5B]">
وَمِنْ آيَاتِهِ أَنْ خَلَقَ لَكُمْ مِنْ أَنْفُسِكُمْ أَزْوَاجًا لِتَسْكُنُوا إِلَيْهَا وَجَعَلَ بَيْنَكُمْ مَوَدَّةً وَرَحْمَةً ۚ إِنَّ فِي ذَٰلِكَ لَآيَاتٍ لِقَوْمٍ يَتَفَكَّرُونَ
                            </div>
                            <div className = "font-normal text-center text-[#e2da97]">
                            “Dan di antara tanda-tanda kekuasaan-Nya ialah Dia menciptakan untukmu pasangan-pasangan dari jenismu sendiri, supaya kamu cenderung dan merasa tenteram kepadanya, dan dijadikan-Nya diantaramu rasa kasih dan sayang. Sesungguhnya pada yang demikian itu benar-benar terdapat tanda-tanda bagi kaum yang berfikir.”
                            </div>
                            <div className = "font-bold text-center text-lg mt-5 mb-3 text-transparent bg-clip-text bg-gradient-to-r from-[#A98F5B] via-[#FBE698] to-[#A98F5B]">
                            (QS Ar-Rum : 21)
                            </div>
                        </div>
                        <div className = "m-2 w-full md:w-1/2 items-center justify-center flex p-1">
                            <img className = "rounded-xl object-contain w-2/3 min-h-0" src="./images/album/wd1.jpg" alt="main" />
                        </div>

                    </motion.div>
    )
})

export default T2kPage