import React from "react";
import {useScroll } from "framer-motion"
import "yet-another-react-lightbox/styles.css";
import "yet-another-react-lightbox/plugins/thumbnails.css";
import FixedAccentPage from "../components/FixedAccent.page";
import Link from 'next/link'
import {
    WhatsappShareButton,
    WhatsappIcon,
    TelegramShareButton,
    TelegramIcon,
    LineShareButton,
    LineIcon,
  } from 'next-share'
import { GetServerSideProps } from "next";

function Index({url}): JSX.Element {

    const [guest, setGuest] = React.useState("")
    

    return (
        <>
            {/* <ScrollPosition yPosition = {sY}/> */}
            <FixedAccentPage/>
            <div className = "flex flex-col justify-center">
                <div className="w-full h-screen  ">
                    <div className = "absolute text-white inset-0 justify-center items-center w-full flex ">
                        <div className = "w-full flex-col flex items-center justify-center mb-14 mt-10  ">
                            <p className = "text-center font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#A98F5B] via-[#FBE698] to-[#A98F5B] font-moonRegular text-3xl">
                                Welcome to wedding invitation
                            </p>
                            <div className = "mt-5">
                                Kamu mau ngundang siapa nih?
                            </div>
                            <div className="mb-5 mt-3 w-full md:w-1/2 px-4">
                                <input value = {guest} onChange={(e) => setGuest(e.target.value)} type="text" id="default-input" className=" bg-[#FFFBE7] border border-gray-300 text-[#8c5d1d] text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 " placeholder="Nama Tamu"/>
                            </div>
                            {guest!=="" && (
                                <>
                                    <div className = "flex flex-col items-center ">
                                        {/* Kamu akan mengundang "{guest}" */}
                                        <Link className = "mx-1 text-[#FBE698]" href={"/"+guest} rel="noopener noreferrer" target="_blank">Lihat undangan</Link>
                                    </div>
                                    <div className = "text-xs mb-2">Share:</div>
                                    <div className = "flex space-x-2">
                                        <WhatsappShareButton
                                            url={url+"/"+guest}
                                            title={'Kami bermaksud mengundang anda ke pernikahan kami'}
                                            separator="💕"
                                        >
                                            <WhatsappIcon size={32} round />
                                        </WhatsappShareButton>

                                        <TelegramShareButton
                                            url={url+"/"+guest}
                                            title={'Kami bermaksud mengundang anda ke pernikahan kami'}
                                        >
                                            <TelegramIcon size={32} round />
                                        </TelegramShareButton>

                                    </div>
                                </>
                            )}
                            
                        </div>
                    </div>
                </div>
            </div>
            
        </>
    )
}


export const getServerSideProps: GetServerSideProps = async (context) => {

    const { req } = context
   
    return {
        props: {
            url : req.headers.host
        }
    }  
}
  
export default Index;