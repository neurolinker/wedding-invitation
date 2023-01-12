import React from "react";
import { motion, useScroll } from "framer-motion"
import * as Scroll from 'react-scroll';
import { Link, Button, Element, Events, animateScroll as scroll, scrollSpy, scroller } from 'react-scroll'
import PhotoAlbum from "react-photo-album";

function Index(): JSX.Element {
   
    const elementRef = React.useRef(null);
    const { scrollYProgress } = useScroll();
    const [sY, setSy] = React.useState<number>(0)
    const [isMenuOpen, setIsMenuOpen] = React.useState<boolean>(true)
    const [audioStatus, setAudioStatus] = React.useState(false);
    const audioRef = React.useRef(null);
    const photos = [
        { src: "https://react-photo-album.com/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Fimage01.018d1d35.jpg&w=384&q=75", width: 800, height: 600 },
        { src: "https://react-photo-album.com/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Fimage02.cf33eff7.jpg&w=384&q=75", width: 900, height: 1600 },
        { src: "https://react-photo-album.com/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Fimage08.95e095b5.jpg&w=384&q=75", width: 400, height: 200 },
        { src: "https://react-photo-album.com/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Fimage08.95e095b5.jpg&w=384&q=75", width: 500, height: 600 },
        // { src: "https://react-photo-album.com/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Fimage12.5a9347ea.jpg&w=384&q=75", width: 900, height: 1000 },
        { src: "https://react-photo-album.com/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Fimage12.5a9347ea.jpg&w=384&q=75", width: 400, height: 700 },
    ];
    const handleClick = async() => {
        // setPlaybackRate(playbackRate + 0.1);
        await setIsMenuOpen(false)
        await scroll.scrollTo(500);
        await play()
    };

    function play (){
        audioRef.current.play();
        setAudioStatus(true)
    }

    function pause(){
        audioRef.current.pause();
        setAudioStatus(false)
    }

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
            <audio
                ref={audioRef}
                src="./music/I-Wanna-Grow-Old-With-You-Westlife.mp3"
            />
            <div className = "fixed w-full bottom-0 z-40 flex " >
                {/* <div className = "flex relative w-1/2 h-0">
                    <div className = " w-6 flex absolute -top-11" style = {{transform : `translateX(${sY}px)`}} >
                        <img className = "object-cover" src="./images/female.png" alt="female" />
                    </div>
                </div>
                <div className = "flex relative w-1/2 h-0 justify-end ">
                    <div className = "w-6  absolute flex  -top-11 " style = {{transform : `translateX(${-sY}px)`}} >
                    <img className = "object-cover" src="./images/male.png" alt="male" />
                    </div>
                </div> */}
            </div>
            <div className = "fixed bottom-0 md:top-0 right-0">
                <img className = "w-16 md:w-24 -rotate-180 md:rotate-90 " src="./images/bg-accent.png" alt="" />
            </div>
            <div className = "fixed bottom-0 left-0">
                <img className = "w-16 md:w-24 -rotate-90 " src="./images/bg-accent.png" alt="" />
            </div>
            <div onClick = {() => audioStatus ? pause() : play()} className = "fixed bottom-10 right-5 bg-gray-200 rounded-full p-2 z-50 shadow-xl ">
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
            <div ref={elementRef} className = "flex flex-col justify-center">
                <div className="w-full h-screen  ">
                    <motion.div
                        className = "mx-4 md:mx-10 mt-4 md:mt-10 relative mb-24 rounded-lg flex flex-col md:flex-row "
                        initial={{
                            opacity: 0,
                            y: 50
                          }}
                          animate={{
                            opacity: 1,
                            y: 0
                          }}
                    >
                        {(isMenuOpen) && (
                            <div onClick={() => handleClick()} className = " animate-pulse absolute md:-bottom-20 md:-left-32 -bottom-8  -left-28 flex  z-40">
                                <div className = " relative flex  items-center justify-center w-full ">
                                    <img className = "w-80 rotate-45" src="./images/pita2.png" alt="" />
                                    <div className = "  absolute bottom-14 right-14 h-4 text-[#EFD687] text-xs rotate-45">
                                        Buka
                                    </div>
                                </div>
                            </div>
                        )}
                        
                        <div className = " w-full md:w-1/2 h-[calc((100vh-20px)/2)] md:h-[calc(100vh-90px)] items-center justify-center flex p-1">
                            
                            <div className="flex flex-col items-center justify-center relative w-48 h-48 rounded-full ">
                                <div className = "absolute  z-40 w-60 h-60 md:w-80 md:h-80 ">
                                    <img className = "rotate-45 object-cover h-full w-full" src="./images/circle-accent.png" alt="vas" />
                                </div>
                                {/* <div className = "font-moonRegular text-4xl text-[#FFD700] mb-2">
                                        Ella 
                                </div>
                                <div className = "font-moonRegular text-4xl text-[#b78700] mb-2">
                                        &
                                </div>
                                <div className = "font-moonRegular text-4xl text-[#b78700] mb-2">
                                        Teguh
                                </div> */}
                            </div>
                        </div>
                        <div className = "w-full md:w-1/2 h-[calc((100vh-20px)/2)] md:h-[calc(100vh-90px)] flex flex-col items-center justify-center">
                            <div className = "font-moonRegular text-5xl text-[#EFD687] mb-10">
                                Ella & Teguh
                            </div>
                            <div className = "font-normal text-sm text-[#B58F47]">
                                Kepada Yth
                            </div>
                            <div className = "font-bold text-[#B58F47]">
                                Uli & Randa
                            </div>
                            
                        </div>

                    </motion.div>

                    <motion.div
                        className = "mx-4 md:mx-10 mb-24  bg-gray-400 bg-clip-padding backdrop-filter bg-opacity-50 backdrop-blur-sm border border-[#C4A862] rounded-lg flex flex-col md:flex-row p-5 "
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
                            {/* <div className = "font-moonRegular font-bold text-4xl mb-5 text-[#FCE089]">
                                Tie The Knot
                            </div> */}
                            <div className = "relative w-full  flex items-center justify-center font-moonRegular text-4xl mb-14 text-[#FCE089]">
                            Tie The Knot
                            <div className = "absolute flex  items-center justify-center top-5 h-10 w-full md:w-1/2">
                                <img className = " h-auto" src="./images/line.png" alt="" />
                            </div>
                        </div>
                            <div className = "font-thin text-center text-md mb-3 text-[#DEC57A]">
وَمِنْ آيَاتِهِ أَنْ خَلَقَ لَكُمْ مِنْ أَنْفُسِكُمْ أَزْوَاجًا لِتَسْكُنُوا إِلَيْهَا وَجَعَلَ بَيْنَكُمْ مَوَدَّةً وَرَحْمَةً ۚ إِنَّ فِي ذَٰلِكَ لَآيَاتٍ لِقَوْمٍ يَتَفَكَّرُونَ
                            </div>
                            <div className = "font-thin text-center text-white">
                            “Dan di antara tanda-tanda kekuasaan-Nya ialah Dia menciptakan untukmu pasangan-pasangan dari jenismu sendiri, supaya kamu cenderung dan merasa tenteram kepadanya, dan dijadikan-Nya diantaramu rasa kasih dan sayang. Sesungguhnya pada yang demikian itu benar-benar terdapat tanda-tanda bagi kaum yang berfikir.”
                            </div>
                            <div className = "font-normal text-center text-md mb-3 text-[#FCE089]">
                            (QS Ar-Rum : 21)
                            </div>
                        </div>
                        <div className = "m-2 w-full md:w-1/2 items-center justify-center flex p-1">
                            <img className = "rounded-md object-contain w-2/3 min-h-0" src="https://i.possiblewedding.com/wp-content/uploads/2022/09/0172D62E-ED8F-4610-8CE2-123984767F71-lina-saviola.jpg" alt="main" />
                        </div>

                    </motion.div>
                    <motion.div
                        className = " flex-col flex p-5 "
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
                        
                        {/* <div className = "w-full flex items-center justify-center font-moonRegular text-4xl mb-5 text-[#FCE089]">Mempelai</div> */}
                        <div className = "relative w-full  flex items-center justify-center font-moonRegular text-4xl mb-14 text-[#FCE089]">
                            Mempelai
                            <div className = "absolute flex  items-center justify-center top-5 h-10 w-full md:w-1/2">
                                <img className = " h-auto" src="./images/line.png" alt="" />
                            </div>
                        </div>
                        <div className = "text-md text-center mb-10 text-white font-thin">Dengan segala kerendahan hati dan dengan ucapan syukur atas karunia Tuhan, kami hendak menyampaikan kabar bahagia pernikahan kami :</div>
                        <div className="flex flex-col md:flex-row">
                            <div className = "flex flex-col w-full md:w-1/2 items-center justify-center mb-10">
                                <img src="https://i.possiblewedding.com/wp-content/uploads/2022/09/foto-profil-2-Lina-Yoan.jpg" alt="" className="rounded-t-full  p-1 bg-[#FCE089] object-contain w-2/3 min-h-0" />
                                <div className="mt-10 font-moonRegular text-4xl text-[#FCE089]">Ella</div>
                                <div className="mt-5 font-normal text-xl text-white">Lailya Sahara</div>
                                <div className="mt-10 font-normal text-white">Putri dari :</div>
                                <div className="mt-1 font-thin text-white">Bapak M. Anshori</div>
                                <div className="mt-1 font-thin text-white">&</div>
                                <div className="mt-1 font-thin text-white">Ibu Susetyowati (Alm)</div>
                            </div>
                            <div className = "flex flex-col w-full md:w-1/2 items-center justify-center mb-10">
                                <img src="https://i.possiblewedding.com/wp-content/uploads/2022/09/foto-profil-1-Lina-Yoan.jpg" alt="" className="rounded-t-full  p-1 bg-[#FCE089] object-contain w-2/3 min-h-0" />
                                <div className="mt-10 font-moonRegular text-4xl text-[#FCE089]">Teguh</div>
                                <div className="mt-5 font-normal text-xl text-white">Teguh Wijaya</div>
                                <div className="mt-10 font-normal text-white">Putra dari :</div>
                                <div className="mt-1 font-thin text-white">Bapak M. Anshori</div>
                                <div className="mt-1 font-thin text-white">&</div>
                                <div className="mt-1 font-thin text-white">Ibu Susetyowati</div>
                            </div>
                        </div>

                    </motion.div>

                    <motion.div
                        className = " mb-24 bg-gray-400 bg-clip-padding backdrop-filter bg-opacity-50 backdrop-blur-sm border-y-2 border-[#C4A862] flex-col flex p-5 "
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
                        
                        {/* <div className = "w-full flex items-center justify-center font-moonRegular text-4xl mb-5 text-[#FCE089] font-bold">Waktu & Tempat</div> */}
                        <div className = "relative w-full  flex items-center justify-center font-moonRegular text-4xl mb-14 text-[#FCE089]">
                            Waktu & Tempat
                            <div className = "absolute flex  items-center justify-center top-5 h-10 w-full md:w-1/2">
                                <img className = " h-auto" src="./images/line.png" alt="" />
                            </div>
                        </div>
                        <div className = "text-md font-thin text-white text-center mb-10">Yang akan dilaksanakan pada:</div>
                        <div className="flex flex-col md:flex-row p-4">
                            <div className = " md:mr-2 flex flex-col w-full md:w-1/2 p-4 items-center justify-center mb-10  rounded-lg">
                                <div className = "w-full flex items-center justify-center font-moonRegular font-bold text-4xl mb-5 text-white">
                                    Akad Nikah
                                </div>
                                <div className = "w-full flex items-center text-center justify-center font-thin text-md mb-1 text-white">
                                    Minggu, 9 Oktober 2023
                                </div>
                                <div className = "w-full flex items-center justify-center font-thin text-md mb-5 text-white">
                                    07.00 WIB
                                </div>
                                <div className = "w-full text-center flex items-center justify-center font-thin text-sm mb-5 text-white">
                                    Jl. MT Haryono Kp. Gutitan No. 15 Rt. 01 Rw. 02 Kel. Sarirejo Semarang Timur
                                </div>
                        
                            </div>
                            <div className = " md:ml-2 flex flex-col w-full md:w-1/2 p-4 items-center justify-center mb-10  rounded-lg">
                                <div className = "w-full flex items-center justify-center font-moonRegular text-4xl mb-5 font-bold text-white">
                                    Resepsi
                                </div>
                                <div className = "w-full flex items-center text-center justify-center font-thin text-md mb-1 text-white">
                                    Minggu, 9 Oktober 2023
                                </div>
                                <div className = "w-full flex items-center justify-center font-thin text-md mb-5 text-white">
                                    10.00 WIB
                                </div>
                                <div className = "w-full text-center flex items-center justify-center font-thin text-sm mb-5 text-white">
                                    Jl. MT Haryono Kp. Gutitan No. 15 Rt. 01 Rw. 02 Kel. Sarirejo Semarang Timur
                                </div>
                        
                            </div>
                        </div>

                    </motion.div>
                    <div className=" mb-24 bg-clip-padding backdrop-filter bg-opacity-50 backdrop-blur-sm flex-col flex p-5 ">
                        
                        <div className = "relative w-full  flex items-center justify-center font-moonRegular text-4xl mb-14 text-white">
                            Album
                            <div className = "absolute flex  items-center justify-center top-5 h-10 w-full md:w-1/2">
                                <img className = " h-auto" src="./images/line.png" alt="" />
                            </div>
                        </div>
                        
                        <div className = "w-full flex items-center text-center md:px-10 justify-center font-thin text-md mb-5 text-white">
                            Tidak ada yang spesial dalam cerita kami. Tapi kami sangat spesial untuk satu sama lain. Dan Kami bersyukur, dipertemukan Allah diwaktu terbaik, Kini kami menanti hari istimewa kami.
                        
                        </div>
                        <PhotoAlbum layout="masonry" photos={photos} />

                    </div>
                </div>
            </div>
            
        </>
    )
}


export default Index;