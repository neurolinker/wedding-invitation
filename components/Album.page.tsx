import React from "react";
import PhotoAlbum from "react-photo-album";
import Lightbox from "yet-another-react-lightbox";
import {Zoom,Thumbnails,Slideshow,Fullscreen} from "yet-another-react-lightbox/plugins"
import "yet-another-react-lightbox/styles.css";
import "yet-another-react-lightbox/plugins/thumbnails.css";

const AlbumPage = (): JSX.Element => {
    const [index, setIndex] = React.useState<number>(-1)
    const [scrollPosition, setScrollPosition] = React.useState(0);
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

    async function renderCheat () {
        await document.body.classList.remove("yarl__no_scroll")
        window.scrollBy({
            top: scrollPosition,
            left: 0,
            behavior: 'instant'
        } as any)
        // set any because instant behavior not available on TS
    }

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

    return (
        <div className=" mb-24 bg-clip-padding backdrop-filter bg-opacity-50 backdrop-blur-sm flex-col flex p-2 ">  
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
                slides={photos}
                open={index >= 0}
                index={index}
                close={() =>setIndex(-1)}
                plugins={[Fullscreen, Slideshow, Thumbnails, Zoom]}
                on={{
                    entered: async() => renderCheat(),
                }}
            />
        </div>
    )
}

export default AlbumPage