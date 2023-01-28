const BrideInfoPage = (): JSX.Element => {
    return (
        <div className = "bg-main-pattern flex-col flex p-2  ">
            <div className = "relative w-full flex items-center justify-center mb-14 mt-6 ">
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
    )
}

export default BrideInfoPage