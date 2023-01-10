import React from "react";
import { motion, useScroll } from "framer-motion"
import useSound from 'use-sound';
import * as Scroll from 'react-scroll';
import { Link, Button, Element, Events, animateScroll as scroll, scrollSpy, scroller } from 'react-scroll'

function Index(): JSX.Element {
   
    const elementRef = React.useRef(null);
    const { scrollYProgress } = useScroll();
    const [sY, setSy] = React.useState<number>(0)
    const [isMenuOpen, setIsMenuOpen] = React.useState<boolean>(true)

    const soundUrl = './music/kahitna-menikahimu.mp3';

    const [play, { stop }] = useSound(
        soundUrl,
        { 
            volume: 0.5, 
            interrupt: true,
        }
    );

    const handleClick = async() => {
        // setPlaybackRate(playbackRate + 0.1);
        await setIsMenuOpen(false)
        await scroll.scrollTo(500);
        await play();
    };

    React.useEffect(() => {
        const html = document.querySelector("html");
        if (html) {
          html.style.overflow = isMenuOpen ? "hidden" : "auto";
        }
    }, [isMenuOpen]);

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
                        className = "relative mb-24 bg-white bg-opacity-50 rounded-lg flex flex-col md:flex-row "
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
                        <div onClick={() => handleClick()} className = " absolute flex h-full w-full items-center justify-center  p-1">
                            <div className = "animate-bounce relative flex items-center justify-center">
                                <img className = "w-24" src="./images/opening.png" alt="" />
                                <div className = "absolute flex h-full w-full items-center justify-center text-[#BCCB94] text-xs">Buka</div>
                            </div>
                        </div>
                        
                        <div className = "w-full md:w-1/2 h-[calc((100vh-20px)/2)] md:h-[calc(100vh-90px)] items-center justify-center flex p-1">
                            <img className = "rounded-md object-contain w-2/3 min-h-0" src="https://i.possiblewedding.com/wp-content/uploads/2022/09/foto-cover-1-Lina-Yoan-1568x1045.jpg" alt="main" />
                        </div>
                        <div className = " w-full md:w-1/2 h-[calc((100vh-20px)/2)] md:h-[calc(100vh-90px)] flex flex-col items-center justify-center">
                            <div className = "font-moonRegular text-5xl text-[#BCCB94] mb-10">
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
                            <div className = "font-moonRegular text-4xl mb-5 text-[#BCCB94]">
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
                        className = "mb-24 bg-white bg-opacity-50 rounded-lg flex-col flex p-5 "
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
                        
                        <div className = "w-full flex items-center justify-center font-moonRegular text-4xl mb-5 text-[#BCCB94]">Mempelai</div>
                        <div className = "text-sm text-center mb-10">Dengan segala kerendahan hati dan dengan ucapan syukur atas karunia Tuhan, kami hendak menyampaikan kabar bahagia pernikahan kami :</div>
                        <div className="flex flex-col md:flex-row">
                            <div className = "flex flex-col w-full md:w-1/2 items-center justify-center mb-10">
                                <img src="https://i.possiblewedding.com/wp-content/uploads/2022/09/foto-profil-2-Lina-Yoan.jpg" alt="" className="rounded-t-full p-2 bg-[#BCCB94] object-contain w-2/3 min-h-0" />
                                <div className="mt-10 font-moonRegular text-4xl text-[#BCCB94]">Ella</div>
                                <div className="mt-5 font-normal text-xl">Lailya Sahara</div>
                                <div className="mt-10 font-normal">Putri dari :</div>
                                <div className="mt-1 font-thin">Bapak M. Anshori</div>
                                <div className="mt-1 font-thin">&</div>
                                <div className="mt-1 font-thin">Ibu Susetyowati (Alm)</div>
                            </div>
                            <div className = "flex flex-col w-full md:w-1/2 items-center justify-center mb-10">
                                <img src="https://i.possiblewedding.com/wp-content/uploads/2022/09/foto-profil-1-Lina-Yoan.jpg" alt="" className="rounded-t-full p-2 bg-[#BCCB94] object-contain w-2/3 min-h-0" />
                                <div className="mt-10 font-moonRegular text-4xl text-[#BCCB94]">Teguh</div>
                                <div className="mt-5 font-normal text-xl">Teguh Wijaya</div>
                                <div className="mt-10 font-normal">Putra dari :</div>
                                <div className="mt-1 font-thin">Bapak M. Anshori</div>
                                <div className="mt-1 font-thin">&</div>
                                <div className="mt-1 font-thin">Ibu Susetyowati</div>
                            </div>
                        </div>

                    </motion.div>
                </div>
            </div>
        </>
    )
}


export default Index;