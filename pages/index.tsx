import React from "react";
import {useScroll } from "framer-motion"
import "yet-another-react-lightbox/styles.css";
import "yet-another-react-lightbox/plugins/thumbnails.css";
import TimeAndPlace from "../components/TimeAndPlace.page";
import BrideInfo from "../components/BrideInfo.page";
import AlbumPage from "../components/Album.page";
import MessagePage from "../components/Message.page";
import ClossingPage from "../components/Clossing.page";
import CoverPage from "../components/Cover.page";
import T2kPage from "../components/T2k.page";
import ScrollPosition from "../components/ScrollPosition";
import Navigation from "../components/Navigation";
import FixedAccentPage from "../components/FixedAccent.page";

function Index(): JSX.Element {
    const startRef = React.createRef<HTMLInputElement>();
    const elementRef = React.useRef(null);
    const { scrollYProgress } = useScroll();
    const [sY, setSy] = React.useState<number>(0)
    const [isMenuOpen, setIsMenuOpen] = React.useState<boolean>(true)
    
    const audioRef = React.useRef(null);
    
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

    const handleClick = async() => {
        await setIsMenuOpen(false)
        startRef.current.scrollIntoView({behavior: "smooth", block: "nearest"})
        await play()
    };

    function play (){
        audioRef.current.play();
    }

    function pause(){
        audioRef.current.pause();
    }

    return (
        <>
            <audio
                ref={audioRef}
                src="./music/I-Wanna-Grow-Old-With-You-Westlife.mp3"
            />
            {/* <ScrollPosition yPosition = {sY}/> */}
            <FixedAccentPage/>
            <Navigation
                open = {isMenuOpen}
                onOpen = {(val) => val && handleClick()}
                onAudio = {(val) => val === 'play' ? play() : pause()}
            />
            <div ref={elementRef} className = "flex flex-col justify-center">
                <div className="w-full h-screen  ">
                    <CoverPage/>
                    <T2kPage ref = {startRef}/>
                    <BrideInfo/>
                    <TimeAndPlace/>
                    <AlbumPage/>
                    <MessagePage/>
                    <ClossingPage/>
                </div>
            </div>
            
        </>
    )
}


export default Index;