import React from "react";
import { motion, useScroll } from "framer-motion"

function Index(): JSX.Element {
   
    const elementRef = React.useRef(null);
    const { scrollYProgress } = useScroll();
    const [sY, setSy] = React.useState<number>(0)

    React.useEffect(() => {
        return scrollYProgress.onChange(async (latest) => {
            const wn = await latest * elementRef.current.clientWidth /2 ;
            
            await setSy(wn-24)
        })
    }, [scrollYProgress])
      
    
    return (
        <>
            <div className = "fixed w-full bottom-0 l z-40 bg-red-600 flex " >
                <div className = "flex relative w-1/2 h-0">
                    <div className = " w-6 flex absolute -top-11" style = {{transform : `translateX(${sY}px)`}} >
                        <img className = "object-cover" src="./images/female.png" alt="female" />
                    </div>
                </div>
                <div className = "flex relative w-1/2 h-0 justify-end ">
                    <div className = "w-6  absolute flex  -top-11 " style = {{transform : `translateX(${-sY}px)`}} >
                    <img className = "object-cover" src="./images/male.png" alt="male" />
                    </div>
                </div>
            </div>
            <div className = "fixed top-0 right-0">
                <img className = "w-48 -rotate-90 " src="./images/tropical.png" alt="" />
            </div>
            <div className = "fixed bottom-0 left-0">
                <img className = "w-48 rotate-90 " src="./images/tropical.png" alt="" />
            </div>
            <div ref={elementRef} className = "flex flex-col justify-center">
                <div className="w-full h-screen  p-4 md:p-10">
                    <motion.div
                        className = "mb-24 bg-white bg-opacity-50 rounded-lg flex flex-col md:flex-row "
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
                        <div className = "w-full md:w-1/2 h-[calc((100vh-20px)/2)] md:h-[calc(100vh-90px)] items-center justify-center flex p-1">
                            <img className = "rounded-md object-contain w-2/3 min-h-0" src="https://i.possiblewedding.com/wp-content/uploads/2022/09/foto-cover-1-Lina-Yoan-1568x1045.jpg" alt="main" />
                        </div>
                        <div className = " w-full md:w-1/2 h-[calc((100vh-20px)/2)] md:h-[calc(100vh-90px)] flex flex-col items-center justify-center">
                            <div className = "font-moonRegular text-5xl text-[#eaab23] mb-10">
                                Ella & Teguh
                            </div>
                            <div className = "font-normal text-sm">
                                Kepada Yth
                            </div>
                            <div className = "font-bold ">
                                Uli & Randa
                            </div>
                        </div>

                    </motion.div>

                    <motion.div
                        className = "mb-24 bg-white bg-opacity-50 rounded-lg flex flex-col md:flex-row p-5 "
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
                        
                        <div className = " m-2 w-full  flex flex-col items-center justify-center">
                            <div className = "font-moonRegular text-4xl mb-5">
                                Tie The Knot
                            </div>
                            <div className = "font-normal text-center text-md mb-3">
وَمِنْ آيَاتِهِ أَنْ خَلَقَ لَكُمْ مِنْ أَنْفُسِكُمْ أَزْوَاجًا لِتَسْكُنُوا إِلَيْهَا وَجَعَلَ بَيْنَكُمْ مَوَدَّةً وَرَحْمَةً ۚ إِنَّ فِي ذَٰلِكَ لَآيَاتٍ لِقَوْمٍ يَتَفَكَّرُونَ
                            </div>
                            <div className = "font-thin text-center">
                            “Dan di antara tanda-tanda kekuasaan-Nya ialah Dia menciptakan untukmu pasangan-pasangan dari jenismu sendiri, supaya kamu cenderung dan merasa tenteram kepadanya, dan dijadikan-Nya diantaramu rasa kasih dan sayang. Sesungguhnya pada yang demikian itu benar-benar terdapat tanda-tanda bagi kaum yang berfikir.”
                            </div>
                            <div className = "font-normal text-center text-md mb-3">
                            (QS Ar-Rum : 21)
                            </div>
                        </div>
                        <div className = "m-2 w-full md:w-1/2 items-center justify-center flex p-1">
                            <img className = "rounded-md object-contain w-2/3 min-h-0" src="https://i.possiblewedding.com/wp-content/uploads/2022/09/0172D62E-ED8F-4610-8CE2-123984767F71-lina-saviola.jpg" alt="main" />
                        </div>

                    </motion.div>
                    <motion.div
                        className = "mb-24 bg-white bg-opacity-50 rounded-lg flex flex-col md:flex-row p-5 "
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
                        
                        <div className = " m-2 w-full  flex flex-col items-center justify-center">
                            <div className = "font-moonRegular text-4xl mb-5">
                                Tie The Knot
                            </div>
                            <div className = "font-normal text-center text-md mb-3">
وَمِنْ آيَاتِهِ أَنْ خَلَقَ لَكُمْ مِنْ أَنْفُسِكُمْ أَزْوَاجًا لِتَسْكُنُوا إِلَيْهَا وَجَعَلَ بَيْنَكُمْ مَوَدَّةً وَرَحْمَةً ۚ إِنَّ فِي ذَٰلِكَ لَآيَاتٍ لِقَوْمٍ يَتَفَكَّرُونَ
                            </div>
                            <div className = "font-thin text-center">
                            “Dan di antara tanda-tanda kekuasaan-Nya ialah Dia menciptakan untukmu pasangan-pasangan dari jenismu sendiri, supaya kamu cenderung dan merasa tenteram kepadanya, dan dijadikan-Nya diantaramu rasa kasih dan sayang. Sesungguhnya pada yang demikian itu benar-benar terdapat tanda-tanda bagi kaum yang berfikir.”
                            </div>
                            <div className = "font-normal text-center text-md mb-3">
                            (QS Ar-Rum : 21)
                            </div>
                        </div>
                        <div className = "m-2 w-full md:w-1/2 items-center justify-center flex p-1">
                            <img className = "rounded-md object-contain w-2/3 min-h-0" src="https://i.possiblewedding.com/wp-content/uploads/2022/09/0172D62E-ED8F-4610-8CE2-123984767F71-lina-saviola.jpg" alt="main" />
                        </div>

                    </motion.div>
                </div>
            </div>
        </>
    )
}


export default Index;