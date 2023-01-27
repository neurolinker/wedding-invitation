import React from "react";
import { motion, useScroll } from "framer-motion"
import PhotoAlbum from "react-photo-album";
import { useCountdown } from "../helpers/useCountDown";
import CountdownTimer from "../components/CountDownTimer";
import { app, database } from '../firebase';
import { collection, addDoc, getDocs, onSnapshot, doc, startAfter } from 'firebase/firestore';
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
// import Lightbox, { ImagesListType } from 'react-spring-lightbox';

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
    const [scrollPosition, setScrollPosition] = React.useState(0);

    const audioRef = React.useRef(null);
    const THREE_DAYS_IN_MS = 3 * 24 * 60 * 60 * 1000;
    const NOW_IN_MS = new Date().getTime();
    const albumRef = React.useRef(null);
    const startRef = React.useRef(null);
    const dateTimeAfterThreeDays = NOW_IN_MS + THREE_DAYS_IN_MS;

    const photos = [
        { key:'1', src: "./images/album/wd1.jpg", width: 1032, height: 1500 },
        { key:'2', src: "./images/album/wd2.jpg", width: 1040, height: 1500 },
        { key:'3', src: "./images/album/wd3.jpg", width: 1032, height: 1500 },
        { key:'19', src: "./images/album/wd19.jpg", width: 1024, height: 768 },
        { key:'20', src: "./images/album/wd20.jpg", width: 1024, height: 679 },
        { key:'4', src: "./images/album/wd4.jpg", width: 990, height: 1500 },
        { key:'5', src: "./images/album/wd5.jpg", width: 1030, height: 1500 },
        { key:'6', src: "./images/album/wd6.jpg", width: 1046, height: 1500 },
        { key:'17', src: "./images/album/wd17.jpg", width: 1024, height: 548 },
        { key:'18', src: "./images/album/wd18.jpg", width: 768, height: 512 },
        { key:'7', src: "./images/album/wd7.jpg", width: 1037, height: 1500 },
        { key:'8', src: "./images/album/wd8.jpg", width: 1031, height: 1500 },
        { key:'9', src: "./images/album/wd9.jpg", width: 1032, height: 1500 },
        { key:'10', src: "./images/album/wd10.jpg", width: 1032, height: 1500 },
        { key:'11', src: "./images/album/wd11.jpg", width: 1031, height: 1500 },
        { key:'12', src: "./images/album/wd12.jpg", width: 1033, height: 1500 },
        { key:'13', src: "./images/album/wd13.jpg", width: 1040, height: 1500 },
        { key:'14', src: "./images/album/wd14.jpg", width: 985, height: 1500 },
        { key:'15', src: "./images/album/wd15.jpg", width: 768, height: 512 },
        { key:'16', src: "./images/album/wd16.jpg", width: 768, height: 513 },
        
    ];

    const slides = photos.map(({ src, width, height }) => ({
        src,
        width,
        height
    }));

    const handleClick = async() => {
        // setPlaybackRate(playbackRate + 0.1);
        await setIsMenuOpen(false)
        startRef.current.scrollIntoView({behavior: "smooth", block: "nearest"})
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
        if (typeof window !== "undefined") {
          
          const handleScroll = () => {
            const position = window.scrollY;
            setScrollPosition(position);
          }
    
          window.addEventListener("scroll", handleScroll);
       
          return () => window.removeEventListener("scroll", handleScroll);
        }
    }, [])

    React.useEffect(() => {
        return scrollYProgress.onChange(async (latest) => {
            const wn = await latest * elementRef.current.clientWidth /2 ;
            
            await setSy(wn-24)
        })
    }, [scrollYProgress])
      
    async function renderCheat () {
        await document.body.classList.remove("yarl__no_scroll")
        window.scrollBy({
            top: scrollPosition,
            left: 0,
            behavior: 'instant'
          } as any)
    }

    
  
    
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
            <div className = "fixed bottom-0 right-0">
                <img className = "w-16 md:w-36 -rotate-180  " src="./images/dark-blue/corner.webp" alt="gold-accent-right" />
            </div>
            <div className = "fixed bottom-0 left-0">
                <img className = "w-16 md:w-36 -rotate-90 " src="./images/dark-blue/corner.webp" alt="gold-accent-left" />
            </div>
            <div className = "fixed top-0 left-0">
                <img className = "w-16 md:w-36  " src="./images/dark-blue/corner.webp" alt="gold-accent-right" />
            </div>
            <div className = "fixed top-0 right-0">
                <img className = "w-16 md:w-36 rotate-90 " src="./images/dark-blue/corner.webp" alt="gold-accent-left" />
            </div>
            {(isMenuOpen) && (
                <>
                <div className = " hidden md:block fixed bottom-10 -right-16">
                    <img className = "w-80 -rotate-45" src="./images/dark-blue/pita.webp" alt="pita-lg" />
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
                        <img className = "w-full mt-16" src="./images/dark-blue/pita.webp" alt="pita-sm" />
                        <div onClick={() => handleClick()} className = "mt-9 z-50 flex fixed p-0.5 bg-gradient-to-r from-[#8C5D1D] via-[#B5AF82] to-[#8C5D1D] rounded-full">
                            <div className = "flex animate-pulse rounded-full py-4 px-2 bg-gradient-to-r from-[#2E2B2D] via-[#575757] to-[#2E2B2D] text-white text-sm">
                                Open
                            </div> 
                        </div>
                    </div>
                </>
            )}
            {/* {(!isMenuOpen) && (
            <div className = "flex w-full fixed bottom-0 z-50">
                <div className="flex flex-row items-center justify-center m-2 w-full bg-green-600 rounded-lg p-1">
                    <div className="w-1/4 bg-red-600 flex items-center justify-center">1</div>
                    <div className="w-1/4 bg-yellow-600 flex items-center justify-center">2</div>
                    <div className="w-1/4 bg-red-600 flex items-center justify-center">3</div>
                    <div className="w-1/4 bg-yellow-600 flex items-center justify-center">4</div>
                </div>
            </div>
            )} */}
            <div onClick = {() => audioStatus ? pause() : play()} className = "fixed bottom-5 right-5 bg-gradient-to-r from-[#A98F5B] via-[#FBE698] to-[#A98F5B] rounded-full p-2 z-50 shadow-xl ">
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
                                Uli & Randa
                            </div>
                            
                        </div>

                    </motion.div>

                    <motion.div
                    ref = {startRef}
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
                    
                    <div className = "bg-main-pattern flex-col flex p-2  ">
                        {/* <div className = "w-full flex items-center justify-center font-moonRegular text-4xl mb-5 text-[#FCE089]">Mempelai</div> */}
                        <div className = "relative w-full flex items-center justify-center mb-14 ">
                        <p className = "font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#A98F5B] via-[#FBE698] to-[#A98F5B] font-moonRegular text-4xl">
                            Mempelai
                        </p>
                            <div className = "absolute flex  items-center justify-center top-7 h-10 w-full md:w-1/3">
                                <img className = " h-auto" src="./images/dark-blue/line.webp" alt="mempelai" />
                            </div>
                        </div>
                        <div className = "text-md text-center mb-10 text-[#e2da97] font-normal">Dengan segala kerendahan hati dan dengan ucapan syukur atas karunia Tuhan, kami hendak menyampaikan kabar bahagia pernikahan kami :</div>
                        <div className="flex flex-col md:flex-row">
                            <div className = "flex flex-col w-full md:w-1/2 items-center justify-center mb-10">
                                <img src="./images/album/wd6.jpg" alt="a" className="rounded-t-full  p-1 bg-gradient-to-r from-[#A98F5B] via-[#FBE698] to-[#A98F5B] object-contain w-2/3 min-h-0" />
                                <div className="mt-10 font-moonRegular p-1 text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#A98F5B] via-[#FBE698] to-[#A98F5B]">{process.env.NEXT_PUBLIC_WOMAN_BRIDE_INITIAL}</div>
                                <div className="mt-5 font-normal text-2xl text-[#e2da97]">{process.env.NEXT_PUBLIC_WOMAN_BRIDE}</div>
                                <div className="mt-5 font-thin text-[#e2da97]">Putri dari :</div>
                                <div className="mt-1 font-normal text-[#e2da97]">Bapak {process.env.NEXT_PUBLIC_WOMAN_BRIDE_FATHER}</div>
                                <div className="mt-1 font-normal text-[#e2da97]">&</div>
                                <div className="mt-1 font-normal text-[#e2da97]">Ibu {process.env.NEXT_PUBLIC_WOMAN_BRIDE_MOTHER}</div>
                            </div>
                            <div className = "flex flex-col w-full md:w-1/2 items-center justify-center mb-10">
                                <img src="./images/album/wd5.jpg" alt="b" className="rounded-t-full  p-1 bg-gradient-to-r from-[#A98F5B] via-[#FBE698] to-[#A98F5B] object-contain w-2/3 min-h-0" />
                                <div className="mt-10 p-1 font-moonRegular text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#A98F5B] via-[#FBE698] to-[#A98F5B]">{process.env.NEXT_PUBLIC_MAN_BRIDE_INITIAL}</div>
                                <div className="mt-5 font-normal text-2xl text-[#e2da97]">{process.env.NEXT_PUBLIC_MAN_BRIDE}</div>
                                <div className="mt-5 font-thin text-[#e2da97]">Putra dari :</div>
                                <div className="mt-1 font-normal text-[#e2da97]">Bapak {process.env.NEXT_PUBLIC_MAN_BRIDE_FATHER}</div>
                                <div className="mt-1 font-normal text-[#e2da97]">&</div>
                                <div className="mt-1 font-normal text-[#e2da97]">Ibu {process.env.NEXT_PUBLIC_MAN_BRIDE_MOTHER}</div>
                            </div>
                        </div>

                    </div>

                    <div className = "relative mb-20 bg-[#70a878] bg-opacity-70 bg-clip-padding backdrop-filter backdrop-blur-sm border-y-2 border-[#C4A862] flex-col flex p-2 ">
                        {/* <div className = "w-full flex items-center justify-center font-moonRegular text-4xl mb-5 text-[#FCE089] font-bold">Waktu & Tempat</div> */}
                        <div className = "relative w-full  flex items-center justify-center mb-14 mt-10  ">
                            <p className = "font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#A98F5B] via-[#FBE698] to-[#A98F5B] font-moonRegular text-4xl">
                            Waktu & Tempat
                            </p>
                            <div className = "absolute flex  items-center justify-center top-7 h-10 w-full md:w-1/3">
                                <img className = " h-auto" src="./images/dark-blue/line.webp" alt="waktu-dan-tempat" />
                            </div>
                        </div>
                        <div className = "text-md font-normal text-[#E2DA97] text-center mb-10">Yang akan dilaksanakan pada:</div>
                        <div className="flex flex-col md:flex-row p-4">
                            <div className = " md:mr-2 flex flex-col w-full md:w-1/2 p-4 items-center justify-center mb-10  rounded-lg">
                                <div className = "text-transparent bg-clip-text bg-gradient-to-r from-[#8C5D1D] via-[#FBE698] to-[#8C5D1D] w-full flex items-center justify-center font-moonRegular font-bold text-4xl mb-5 text-white">
                                    Akad Nikah
                                </div>
                                <div className = "w-full flex items-center text-center justify-center font-normal text-md mb-1 text-[#E2DA97]">
                                    Minggu, 9 Oktober 2023
                                </div>
                                <div className = "w-full flex items-center justify-center font-normal text-md mb-5 text-[#E2DA97]">
                                    07.00 WIB
                                </div>
                                <div className = "w-full text-center flex items-center justify-center font-normal text-sm mb-5 text-[#E2DA97]">
                                    Jl. MT Haryono Kp. Gutitan No. 15 Rt. 01 Rw. 02 Kel. Sarirejo Semarang Timur
                                </div>
                        
                            </div>
                            <div className = " md:ml-2 flex flex-col w-full md:w-1/2 p-4 items-center justify-center mb-10  rounded-lg">
                                <div className = "text-transparent bg-clip-text bg-gradient-to-r from-[#8C5D1D] via-[#FBE698] to-[#8C5D1D] w-full flex items-center justify-center font-moonRegular text-4xl mb-5 font-bold text-white">
                                    Resepsi
                                </div>
                                <div className = "w-full flex items-center text-center justify-center font-normal text-md mb-1 text-[#E2DA97]">
                                    Minggu, 9 Oktober 2023
                                </div>
                                <div className = "w-full flex items-center justify-center font-normal text-md mb-5 text-[#E2DA97]">
                                    10.00 WIB
                                </div>
                                <div className = "w-full text-center flex items-center justify-center font-normal text-sm mb-5 text-[#E2DA97]">
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
                    <div ref={albumRef} className=" mb-24 bg-clip-padding backdrop-filter bg-opacity-50 backdrop-blur-sm flex-col flex p-2 ">
                        
                        <div className = "relative w-full flex items-center justify-center mb-14">
                            <p className = "font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#A98F5B] via-[#FBE698] to-[#A98F5B] font-moonRegular text-4xl">
                            Album
                            </p>
                            <div className = "absolute flex  items-center justify-center top-7 h-10 w-full md:w-1/3">
                                <img className = " h-auto" src="./images/dark-blue/line.webp" alt="album" />
                            </div>
                        </div>
                        
                        <div className = "w-full flex items-center text-center md:px-10 justify-center font-normal text-md mb-5 text-[#e2da97]">
                            Tidak ada yang spesial dalam cerita kami. Tapi kami sangat spesial untuk satu sama lain. Dan Kami bersyukur, dipertemukan Allah diwaktu terbaik, Kini kami menanti hari istimewa kami.
                        
                        </div>
                        <PhotoAlbum layout="masonry" photos={photos}  onClick={({ index }) => setIndex(index)} />
                        <Lightbox
                            slides={slides}
                            open={index >= 0}
                            index={index}
                            close={() =>setIndex(-1)}
                            plugins={[Fullscreen, Slideshow, Thumbnails, Zoom]}
                            on={{
                                entered: async() => renderCheat(),
                            }}
                        />
                    </div>

                    <div className = "relative mb-24 bg-[#70a878] bg-opacity-70 bg-clip-padding backdrop-filter  backdrop-blur-sm border-y-2 border-[#C4A862] flex-col flex p-2 ">
                        {/* <div className = "w-full flex items-center justify-center font-moonRegular text-4xl mb-5 text-[#FCE089] font-bold">Waktu & Tempat</div> */}
                        <div className = "relative w-full  flex items-center justify-center mb-14">
                            <p className = "font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#A98F5B] via-[#FBE698] to-[#A98F5B] font-moonRegular text-4xl">
                            Kirimkan Pesan
                            </p>
                            <div className = "absolute flex  items-center justify-center top-7 h-10 w-full md:w-1/3">
                                <img className = " h-auto" src="./images/dark-blue/line.webp" alt="waktu-dan-tempat" />
                            </div>
                        </div>
                        {/* <div className = "text-md font-thin text-[#8c5d1d] text-center mb-10">Tinggalkan pesan anda</div> */}
                        <div className="flex flex-col md:flex-row p-4">
                            
                            <div className = "  md:mr-2 flex flex-col w-full items-center  mb-10  rounded-lg">
                                
                                <div className="mb-6 w-full">
                                    <label className="block mb-2 text-sm font-medium text-[#E2DA97]">Nama</label>
                                    <input value = {messageForm.name} onChange={(e) => setMessageForm({...messageForm, name: e.target.value})} type="text" id="default-input" className=" bg-[#FFFBE7] border border-gray-300 text-[#8c5d1d] text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 " placeholder="Nama Anda"/>
                                </div>
                                <div className="mb-6 w-full">
                                    <label className="block mb-2 text-sm font-medium text-[#E2DA97]">Pesan</label>
                                    <textarea value = {messageForm.message} onChange={(e) => setMessageForm({...messageForm, message: e.target.value})} id="message" rows={4} className="block p-2.5 w-full text-sm text-[#8c5d1d] bg-[#FFFBE7] rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 " placeholder="Tinggalkan pesan anda"></textarea>
                                </div>
                                <div className="mb-6 w-full">
                                    <div onClick={() => sendMessage()} className = "bg-gradient-to-r from-[#CFAF67] via-[#CEBE83] to-[#CFAF67] p-2 rounded-full text-center text-white">Kirim</div>
                                </div>
                            </div>
                            <div className = "rounded-xl md:ml-2 px-3 py-3 w-full h-72 flex ">
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
                                                <div className = " w-full p-3 rounded-tl-xl rounded-br-xl bg-[#FFFBE7] leading-relaxed">
                                                    <div className="flex flex-col md:flex-row md:justify-between md:items-center md:space-x-2 mb-4">
                                                        <strong className = "text-sm text-[#8c5d1d]"> {obj.name}</strong> 
                                                        <span className = "text-xs text-[#8c5d1d]">{moment(obj.datePost).format('D MMMM YYYY, HH:mm')}</span>
                                                    </div>
                                                    <p className = "text-xs text-[#8c5d1d]">
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
                                    {/* <div className="flex items-center justify-center h-full"> */}
                                        <img className = "w-10 h-10" src="./images/mask.png" alt="" />
                                    {/* </div> */}
                                    <div className=" flex text-center text-xs text-[black]">
                                        Gunakan Masker
                                    </div>
                                </div>
                                <div className=" bg-[#e2da97] flex rounded-xl p-2 flex-col items-center  justify-center w-20 h-20">
                                    {/* <div className="flex items-center justify-center h-full"> */}
                                        <img className = "w-10 h-10" src="./images/washing.png" alt="" />
                                    {/* </div> */}
                                    <div className=" flex text-center text-xs text-[black]">
                                        Mencuci Tangan
                                    </div>
                                </div>
                                <div className=" bg-[#e2da97] flex rounded-xl p-2 flex-col items-center  justify-center w-20 h-20">
                                    {/* <div className="flex items-center justify-center h-full"> */}
                                        <img className = "w-10 h-10" src="./images/distance.png" alt="" />
                                    {/* </div> */}
                                    <div className=" flex text-center text-xs text-[black]">
                                        Menjaga Jarak
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