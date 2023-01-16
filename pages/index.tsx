import React from "react";
import { motion, useScroll } from "framer-motion"
import * as Scroll from 'react-scroll';
import { Link, Button, Element, Events, animateScroll as scroll, scrollSpy, scroller } from 'react-scroll'
import PhotoAlbum from "react-photo-album";
import { useCountdown } from "../helpers/useCountDown";
import CountdownTimer from "../components/CountDownTimer";
import { app, database } from '../firebase';
import { collection, addDoc, getDocs, onSnapshot, doc } from 'firebase/firestore';
import moment from "moment";
import { AddMessageModel } from "../models/add-message-model";
import { createAvatar } from '@dicebear/core';
import { initials } from '@dicebear/collection';
import SVG from 'react-inlinesvg';
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";
// import optional lightbox plugins
import Fullscreen from "yet-another-react-lightbox/plugins/fullscreen";
import Slideshow from "yet-another-react-lightbox/plugins/slideshow";
import Thumbnails from "yet-another-react-lightbox/plugins/thumbnails";
import Zoom from "yet-another-react-lightbox/plugins/zoom";
import "yet-another-react-lightbox/plugins/thumbnails.css";

function Index(): JSX.Element {
    
    const dbInstance = collection(database, 'invitation-message');
    const elementRef = React.useRef(null);
    const { scrollYProgress } = useScroll();
    const [sY, setSy] = React.useState<number>(0)
    const [isMenuOpen, setIsMenuOpen] = React.useState<boolean>(true)
    const [audioStatus, setAudioStatus] = React.useState<boolean>(false);
    const [messages, setMessages] =  React.useState([])
    const [messageForm, setMessageForm] = React.useState<AddMessageModel>(new AddMessageModel())
    const [index, setIndex] = React.useState<number>(-1)
    const audioRef = React.useRef(null);
    const THREE_DAYS_IN_MS = 3 * 24 * 60 * 60 * 1000;
    const NOW_IN_MS = new Date().getTime();

    const dateTimeAfterThreeDays = NOW_IN_MS + THREE_DAYS_IN_MS;

    const photos = [
        { key:'1', src: "https://react-photo-album.com/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Fimage01.018d1d35.jpg&w=384&q=75", width: 800, height: 600 },
        { key:'2', src: "https://react-photo-album.com/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Fimage02.cf33eff7.jpg&w=384&q=75", width: 900, height: 1600 },
        { key:'3', src: "https://react-photo-album.com/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Fimage08.95e095b5.jpg&w=384&q=75", width: 400, height: 200 },
        { key:'4', src: "https://react-photo-album.com/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Fimage08.95e095b5.jpg&w=384&q=75", width: 500, height: 600 },
        // { src: "https://react-photo-album.com/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Fimage12.5a9347ea.jpg&w=384&q=75", width: 900, height: 1000 },
        { key:'5', src: "https://react-photo-album.com/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Fimage12.5a9347ea.jpg&w=384&q=75", width: 400, height: 700 },
    ];

    const slides = photos.map(({ src, width, height }) => ({
        src,
        width,
        height
    }));

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

    async function sendMessage(){
        await addDoc(dbInstance, {
            name: messageForm.name,
            message: messageForm.message,
            hadir: messageForm.hadir,
            datePost: moment(new Date()).format("YYYY-MM-DD HH:mm:ss"),
            // hourPost: now.getHours(),
            // minutePost: now.getMinutes()
        })

        await setMessageForm(new AddMessageModel())
    }

    React.useEffect(() => {
        getMessages();
        // db listener
        onSnapshot(dbInstance, (snapshot) => {
            snapshot.docChanges().forEach(async (change) => {
                getMessages()
            })
        });
    
    }, [])

    const getMessages = () => {
        getDocs(dbInstance)
            .then((data) => {
                setMessages(data.docs.map((item) => {
                    console.log(item.data().name)
                    const avatar = createAvatar(initials, {
                        seed: item.data().name,
                        // ... other options
                      });
                    return { ...item.data(), id: item.id, avatar:avatar.toString() }
                }));
            })
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
                <img className = "w-16 md:w-24 -rotate-180 md:rotate-90 " src="./images/bg-accent.png" alt="gold-accent-right" />
            </div>
            <div className = "fixed bottom-0 left-0">
                <img className = "w-16 md:w-24 -rotate-90 " src="./images/bg-accent.png" alt="gold-accent-left" />
            </div>
            {(isMenuOpen) && (
                <>
                <div className = " hidden md:block fixed bottom-10 -right-16">
                    <img className = "w-80 -rotate-45" src="./images/pita-1.png" alt="pita-lg" />
                </div>
            
                <div onClick={() => handleClick()} className = "hidden md:flex z-50 -rotate-45 fixed bottom-20 right-20 p-0.5 bg-gradient-to-r from-[#8C5D1D] via-[#B5AF82] to-[#8C5D1D] rounded-full">
                    <div className = "flex animate-pulse rounded-full py-4 px-2 bg-gradient-to-r from-[#2E2B2D] via-[#575757] to-[#2E2B2D] text-white text-sm">
                        Open
                    </div> 
                </div>
                </>
            )}
            {(isMenuOpen) && (
                <>
                    <div className = "flex md:hidden items-center justify-center fixed top-0 h-screen w-full bottom-1/2 z-50">
                        <img className = "w-full mt-16" src="./images/pita-1.png" alt="pita-sm" />
                        <div onClick={() => handleClick()} className = "mt-9 z-50 flex fixed p-0.5 bg-gradient-to-r from-[#8C5D1D] via-[#B5AF82] to-[#8C5D1D] rounded-full">
                            <div className = "flex animate-pulse rounded-full py-4 px-2 bg-gradient-to-r from-[#2E2B2D] via-[#575757] to-[#2E2B2D] text-white text-sm">
                                Open
                            </div> 
                        </div>
                    </div>
                </>
            )}
            {(!isMenuOpen) && (
            <div className = "flex w-full fixed bottom-0 z-50">
                <div className="flex flex-row items-center justify-center m-2 w-full bg-green-600 rounded-lg p-1">
                    <div className="w-1/4 bg-red-600 flex items-center justify-center">1</div>
                    <div className="w-1/4 bg-yellow-600 flex items-center justify-center">2</div>
                    <div className="w-1/4 bg-red-600 flex items-center justify-center">3</div>
                    <div className="w-1/4 bg-yellow-600 flex items-center justify-center">4</div>
                </div>
            </div>
            )}
            <div onClick = {() => audioStatus ? pause() : play()} className = "fixed bottom-5 right-5 bg-gradient-to-r from-[#8C5D1D] via-[#FBE698] to-[#8C5D1D] rounded-full p-2 z-50 shadow-xl ">
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
                            <div className = "font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#8C5D1D] via-[#FBE698] to-[#8C5D1D] font-moonRegular text-2xl md:text-5xl  mb-10 p-2">
                                Ella & Teguh
                            </div>
                            <div className = "font-normal text-sm text-transparent bg-clip-text bg-gradient-to-r from-[#8C5D1D] via-[#FBE698] to-[#8C5D1D]">
                                Kepada Yth
                            </div>
                            <div className = "font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#8C5D1D] via-[#FBE698] to-[#8C5D1D]">
                                Uli & Randa
                            </div>
                            
                        </div>

                    </motion.div>

                    <motion.div
                        className = " mb-14  bg-slate-400 bg-clip-padding backdrop-filter bg-opacity-10 backdrop-blur-sm border-y-2 border-[#C4A862] flex flex-col md:flex-row p-2 "
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
                            <div className = "font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-[#8C5D1D] via-[#FBE698] to-[#8C5D1D] relative w-full  flex items-center justify-center font-moonRegular text-3xl mb-14">
                            Tie The Knot
                            <div className = "absolute flex  items-center justify-center top-5 h-10 w-full md:w-1/2">
                                <img className = " h-auto" src="./images/line.png" alt="tie-the-knot" />
                            </div>
                        </div>
                            <div className = "font-thin text-center text-md mb-3 text-transparent bg-clip-text bg-gradient-to-r from-[#8C5D1D] via-[#FBE698] to-[#8C5D1D]">
وَمِنْ آيَاتِهِ أَنْ خَلَقَ لَكُمْ مِنْ أَنْفُسِكُمْ أَزْوَاجًا لِتَسْكُنُوا إِلَيْهَا وَجَعَلَ بَيْنَكُمْ مَوَدَّةً وَرَحْمَةً ۚ إِنَّ فِي ذَٰلِكَ لَآيَاتٍ لِقَوْمٍ يَتَفَكَّرُونَ
                            </div>
                            <div className = "font-thin text-center text-white">
                            “Dan di antara tanda-tanda kekuasaan-Nya ialah Dia menciptakan untukmu pasangan-pasangan dari jenismu sendiri, supaya kamu cenderung dan merasa tenteram kepadanya, dan dijadikan-Nya diantaramu rasa kasih dan sayang. Sesungguhnya pada yang demikian itu benar-benar terdapat tanda-tanda bagi kaum yang berfikir.”
                            </div>
                            <div className = "font-normal text-center text-md mb-3 text-transparent bg-clip-text bg-gradient-to-r from-[#8C5D1D] via-[#FBE698] to-[#8C5D1D]">
                            (QS Ar-Rum : 21)
                            </div>
                        </div>
                        <div className = "m-2 w-full md:w-1/2 items-center justify-center flex p-1">
                            <img className = "rounded-xl object-contain w-2/3 min-h-0" src="https://i.possiblewedding.com/wp-content/uploads/2022/09/0172D62E-ED8F-4610-8CE2-123984767F71-lina-saviola.jpg" alt="main" />
                        </div>

                    </motion.div>
                    
                    <div className = "flex-col flex p-2">
                        {/* <div className = "w-full flex items-center justify-center font-moonRegular text-4xl mb-5 text-[#FCE089]">Mempelai</div> */}
                        <div className = "relative w-full font-bold flex items-center justify-center font-moonRegular text-3xl mb-14 text-transparent bg-clip-text bg-gradient-to-t from-[#8C5D1D] via-[#FBE698] to-[#8C5D1D]">
                            Mempelai
                            <div className = "absolute flex  items-center justify-center top-5 h-10 w-full md:w-1/3">
                                <img className = " h-auto" src="./images/line.png" alt="mempelai" />
                            </div>
                        </div>
                        <div className = "text-md text-center mb-10 text-white font-thin">Dengan segala kerendahan hati dan dengan ucapan syukur atas karunia Tuhan, kami hendak menyampaikan kabar bahagia pernikahan kami :</div>
                        <div className="flex flex-col md:flex-row">
                            <div className = "flex flex-col w-full md:w-1/2 items-center justify-center mb-10">
                                <img src="https://i.possiblewedding.com/wp-content/uploads/2022/09/foto-profil-2-Lina-Yoan.jpg" alt="a" className="rounded-t-full  p-1 bg-gradient-to-r from-[#8C5D1D] via-[#FBE698] to-[#8C5D1D] object-contain w-2/3 min-h-0" />
                                <div className="mt-10 font-moonRegular p-1 text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#8C5D1D] via-[#FBE698] to-[#8C5D1D]">Ella</div>
                                <div className="mt-5 font-normal text-xl text-white">Lailya Shahara</div>
                                <div className="mt-5 font-normal text-white">Putri dari :</div>
                                <div className="mt-1 font-thin text-white">Bapak M. Anshori</div>
                                <div className="mt-1 font-thin text-white">&</div>
                                <div className="mt-1 font-thin text-white">Ibu Susetyowati (Almh.)</div>
                            </div>
                            <div className = "flex flex-col w-full md:w-1/2 items-center justify-center mb-10">
                                <img src="https://i.possiblewedding.com/wp-content/uploads/2022/09/foto-profil-1-Lina-Yoan.jpg" alt="b" className="rounded-t-full  p-1 bg-gradient-to-r from-[#8C5D1D] via-[#FBE698] to-[#8C5D1D] object-contain w-2/3 min-h-0" />
                                <div className="mt-10 p-1 font-moonRegular text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#8C5D1D] via-[#FBE698] to-[#8C5D1D]">Teguh</div>
                                <div className="mt-5 font-normal text-xl text-white">Teguh Wijaya</div>
                                <div className="mt-5 font-normal text-white">Putra dari :</div>
                                <div className="mt-1 font-thin text-white">Bapak M. Anshori</div>
                                <div className="mt-1 font-thin text-white">&</div>
                                <div className="mt-1 font-thin text-white">Ibu Susetyowati</div>
                            </div>
                        </div>

                    </div>

                    <div className = "relative mb-20 bg-slate-400 bg-clip-padding backdrop-filter bg-opacity-10 backdrop-blur-sm border-y-2 border-[#C4A862] flex-col flex p-2 ">
                        {/* <div className = "w-full flex items-center justify-center font-moonRegular text-4xl mb-5 text-[#FCE089] font-bold">Waktu & Tempat</div> */}
                        <div className = "relative w-full  flex items-center justify-center font-moonRegular text-3xl mb-14 font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#8C5D1D] via-[#FBE698] to-[#8C5D1D]">
                            Waktu & Tempat
                            <div className = "absolute flex  items-center justify-center top-5 h-10 w-full md:w-1/3">
                                <img className = " h-auto" src="./images/line.png" alt="waktu-dan-tempat" />
                            </div>
                        </div>
                        <div className = "text-md font-thin text-white text-center mb-10">Yang akan dilaksanakan pada:</div>
                        <div className="flex flex-col md:flex-row p-4">
                            <div className = " md:mr-2 flex flex-col w-full md:w-1/2 p-4 items-center justify-center mb-10  rounded-lg">
                                <div className = "text-transparent bg-clip-text bg-gradient-to-r from-[#8C5D1D] via-[#FBE698] to-[#8C5D1D] w-full flex items-center justify-center font-moonRegular font-bold text-4xl mb-5 text-white">
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
                                <div className = "text-transparent bg-clip-text bg-gradient-to-r from-[#8C5D1D] via-[#FBE698] to-[#8C5D1D] w-full flex items-center justify-center font-moonRegular text-4xl mb-5 font-bold text-white">
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
                            <div className = "absolute flex-col left-0 flex items-center justify-center -bottom-12 w-full ">
                                <div className =" text-transparent bg-clip-text bg-gradient-to-r from-[#8C5D1D] via-[#FBE698] to-[#8C5D1D] w-full flex items-center justify-center font-moonRegular text-2xl mb-2 font-bold text-white">Counting down to the Big Day</div>
                                <div className = "flex items-center justify-center flex-col p-3 rounded-lg bg-gradient-to-b from-[#8C5D1D] via-[#FBE698] to-[#8C5D1D]">
                                    <CountdownTimer targetDate={dateTimeAfterThreeDays} />
                                </div>
                            </div>
                        </div>

                    </div>
                    <div className=" mb-24 bg-clip-padding backdrop-filter bg-opacity-50 backdrop-blur-sm flex-col flex p-2 ">
                        
                        <div className = "relative w-full text-transparent bg-clip-text bg-gradient-to-r from-[#8C5D1D] via-[#FBE698] to-[#8C5D1D] font-bold flex items-center justify-center font-moonRegular text-3xl mb-14 text-white">
                            Album
                            <div className = "absolute flex  items-center justify-center top-5 h-10 w-full md:w-1/3">
                                <img className = " h-auto" src="./images/line.png" alt="album" />
                            </div>
                        </div>
                        
                        <div className = "w-full flex items-center text-center md:px-10 justify-center font-thin text-md mb-5 text-white">
                            Tidak ada yang spesial dalam cerita kami. Tapi kami sangat spesial untuk satu sama lain. Dan Kami bersyukur, dipertemukan Allah diwaktu terbaik, Kini kami menanti hari istimewa kami.
                        
                        </div>
                        <PhotoAlbum layout="masonry" photos={photos}  onClick={({ index }) => setIndex(index)} />
                        <Lightbox
                            slides={slides}
                            open={index >= 0}
                            index={index}
                            close={() => setIndex(-1)}
                            // enable optional lightbox plugins
                            plugins={[Fullscreen, Slideshow, Thumbnails, Zoom]}
                        />
                    </div>

                    <div className = "relative mb-24 bg-gray-400 bg-clip-padding backdrop-filter bg-opacity-50 backdrop-blur-sm border-y-2 border-[#C4A862] flex-col flex p-2 ">
                        {/* <div className = "w-full flex items-center justify-center font-moonRegular text-4xl mb-5 text-[#FCE089] font-bold">Waktu & Tempat</div> */}
                        <div className = "relative w-full  flex items-center justify-center font-moonRegular text-3xl mb-14 font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#8C5D1D] via-[#FBE698] to-[#8C5D1D]">
                            Kirimkan Pesan
                            <div className = "absolute flex  items-center justify-center top-5 h-10 w-full md:w-1/3">
                                <img className = " h-auto" src="./images/line.png" alt="waktu-dan-tempat" />
                            </div>
                        </div>
                        <div className = "text-md font-thin text-white text-center mb-10">Yang akan dilaksanakan pada:</div>
                        <div className="flex flex-col md:flex-row p-4">
                            
                            <div className = "  md:mr-2 flex flex-col w-full items-center  mb-10  rounded-lg">
                                
                                <div className="mb-6 w-full">
                                    <label className="block mb-2 text-sm font-medium text-gray-300">Nama</label>
                                    <input value = {messageForm.name} onChange={(e) => setMessageForm({...messageForm, name: e.target.value})} type="text" id="default-input" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Nama Anda"/>
                                </div>
                                <div className="mb-6 w-full">
                                    <label className="block mb-2 text-sm font-medium text-gray-300">Pesan</label>
                                    <textarea value = {messageForm.message} onChange={(e) => setMessageForm({...messageForm, message: e.target.value})} id="message" rows={4} className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Tinggalkan pesan anda"></textarea>
                                </div>
                                <div className="mb-6 w-full">
                                    <div onClick={() => sendMessage()} className = "bg-gradient-to-r from-[#CFAF67] via-[#CEBE83] to-[#CFAF67] p-2 rounded-full text-center text-white">Kirim</div>
                                </div>
                            </div>
                            <div className = "bg-[#374151] rounded-xl md:ml-2 px-3 py-3 w-full h-72 flex ">
                                <div className = " overflow-y-scroll flex flex-col w-full h-full items-center mb-10  rounded-lg">

                                    {messages.map((obj) => {
                                        return (
                                            <div key = {obj.id} className = "flex w-full py-2 ">
                                                <div className = "flex items-center justify-center flex-shrink-0 mr-3">
                                                    <div className = "bg-gradient-to-t from-[#8C5D1D] via-[#FBE698] to-[#8C5D1D] w-7 h-7 md:w-10 md:h-10 rounded-full">
                                                        <div className = "text-gray-600">
                                                            <SVG className = "flex object-cover rounded-full " src={obj.avatar} />
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className = " w-full p-3 rounded-tl-xl rounded-br-xl bg-gray-600 leading-relaxed">
                                                    <div className="flex flex-col md:flex-row md:justify-between md:items-center md:space-x-2 mb-4">
                                                        <strong className = "text-sm text-gray-300"> {obj.name}</strong> 
                                                        <span className = "text-xs text-white">{moment(obj.datePost).format('D MMMM YYYY, HH:mm')}</span>
                                                    </div>
                                                    <p className = "text-xs text-white font-thin">
                                                        {obj.message}
                                                    </p>
                                                </div>
                                            </div>
                                        )
                                    })}
                            
                                </div>
                            </div>
                        </div>

                    </div>
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
                                <div className = "absolute flex z-40 ">
                                    <img className = "rotate-45 object-contain" src="./images/circle-accent.png" alt="vas" />
                                </div>
                                <div className = "absolute flex z-40 bg-red-600 h-full w-full m-4 rounded-full ">
                                    {/* <img className = "object-contain rounded-full" src="https://alexandra.bridestory.com/images/dpr_1.0,f_auto,fl_progressive,q_80,c_fill,g_faces,w_412/blogs/sungjoo.son-66669976_499398623961959_4776602684656989155_n-HkhjhRA3P/prewedding-a-la-foto-romantis-korea-cek-inspirasinya-di-album-ini-20.png" alt="vas" /> */}
                                </div>
                            </div>
                        </div>
                        <div className = "w-full flex flex-col items-center justify-center  ">
                            <div className = "font-bold text-center text-transparent bg-clip-text bg-gradient-to-r from-[#8C5D1D] via-[#FBE698] to-[#8C5D1D] font-moonRegular text-2xl md:text-5xl mb-10 p-2">
                                Ella & Teguh
                            </div>
                            <div className = "font-normal text-center text-sm text-gray-400">
                                Atas kehadiran dan doa restunya, kami ucapkan terimakasih
                            </div>
                            <div className = "mt-10 mb-5 text-xl font-bold text-gray-300">
                                Protokol Kesehatan
                            </div>
                            <div className = "flex items-start space-x-2 w-full">
                                <div className="flex rounded-xl p-2 flex-col space-y-3 items-center justify-center w-1/3 bg-gradient-to-t from-[#8C5D1D] via-[#FBE698] to-[#8C5D1D]">
                                    <div className="flex items-center justify-center">
                                        <img className = "flex h-10" src="./images/mask.png" alt="" />
                                    </div>
                                    <div className=" text-center text-sm ">
                                        Gunakan Masker
                                    </div>
                                </div>
                                <div className="flex rounded-xl p-2 flex-col space-y-3 items-center justify-center w-1/3 bg-gradient-to-t from-[#8C5D1D] via-[#FBE698] to-[#8C5D1D]">
                                    <div className="flex items-center justify-center">
                                        <img className = "flex h-10" src="./images/distance.png" alt="" />
                                    </div>
                                    <div className=" text-center px-2 text-sm">
                                        Menjaga Jarak
                                    </div>
                                </div>
                                <div className="h-full flex rounded-xl p-2 flex-col space-y-3 items-center justify-center w-1/3 bg-gradient-to-t from-[#8C5D1D] via-[#FBE698] to-[#8C5D1D]">
                                    <div className="flex items-center justify-center">
                                        <img className = "flex h-10" src="./images/washing.png" alt="" />
                                    </div>
                                    <div className=" text-center text-sm">
                                        Mencuci Tangan
                                    </div>
                                </div>
                            </div>
                            
                        </div>

                    </motion.div>
                </div>
            </div>
            
        </>
    )
}


export default Index;