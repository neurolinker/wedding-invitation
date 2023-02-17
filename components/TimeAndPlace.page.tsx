import CountdownTimer from "./CountDownTimer"

const TimeAndPlacePage = (): JSX.Element => {
    const THREE_DAYS_IN_MS = 3 * 24 * 60 * 60 * 1000;
    const NOW_IN_MS = new Date().getTime();
    const dateTimeAfterThreeDays = NOW_IN_MS + THREE_DAYS_IN_MS;
    return (
        <div className = "relative mb-20 bg-[#70a878] bg-opacity-70 bg-clip-padding backdrop-filter backdrop-blur-sm border-y-2 border-[#C4A862] flex-col flex p-2 ">
            <div className = "relative w-full  flex items-center justify-center mb-14 mt-10  ">
                <p className = "font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#A98F5B] via-[#FBE698] to-[#A98F5B] font-moonRegular text-4xl">
                    Waktu & Tempat
                </p>
                <div className = "absolute flex  items-center justify-center top-7 h-10 w-full md:w-1/3">
                    <img className = " h-auto" src="./images/dark-blue/line.webp" alt="waktu-dan-tempat" />
                </div>
            </div>
            <div className = "text-md font-normal text-[#E2DA97] text-center mb-10">Yang akan dilaksanakan pada:</div>
            <div className="flex flex-col md:flex-row p-4 mb-10 ">
                <div className = " md:mr-2 flex flex-col w-full md:w-1/2 p-4 items-center justify-center mb-10  rounded-lg">
                    <div className = "font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#A98F5B] via-[#FBE698] to-[#A98F5B] font-moonRegular text-4xl">
                        Akad Nikah
                    </div>
                    <div className = "mt-3 w-full flex items-center text-center justify-center font-normal text-md mb-1 text-[#E2DA97]">
                        Minggu, 9 Oktober 2023
                    </div>
                    <div className = "w-full flex items-center justify-center font-normal text-md mb-5 text-[#E2DA97]">
                        07.00 WIB
                    </div>
                    <div className = "w-full text-center flex items-center justify-center font-normal text-sm mb-5 text-[#E2DA97]">
                        Sandhill Rd, Menlo Park, CALIFORNIA
                    </div>
                </div>
                <div className = " md:ml-2 flex flex-col w-full md:w-1/2 p-4 items-center justify-center mb-10  rounded-lg">
                    <div className = "font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#A98F5B] via-[#FBE698] to-[#A98F5B] font-moonRegular text-4xl">
                        Resepsi
                    </div>
                    <div className = "mt-3 w-full flex items-center text-center justify-center font-normal text-md mb-1 text-[#E2DA97]">
                        Minggu, 9 Oktober 2023
                    </div>
                    <div className = "w-full flex items-center justify-center font-normal text-md mb-5 text-[#E2DA97]">
                        10.00 WIB
                    </div>
                    <div className = "w-full text-center flex items-center justify-center font-normal text-sm mb-5 text-[#E2DA97]">
                        Sandhill Rd, Menlo Park, CALIFORNIA
                    </div>
                </div>
                <div className = "absolute flex-col left-0 flex items-center justify-center -bottom-12 w-full ">
                    <div className =" text-transparent bg-clip-text bg-gradient-to-r from-[#8C5D1D] via-[#FBE698] to-[#8C5D1D] w-full flex items-center justify-center font-moonRegular text-2xl mb-2 font-bold">Counting down to the Big Day</div>
                    <div className = "flex items-center justify-center flex-col p-3 rounded-lg bg-gradient-to-b from-[#8C5D1D] via-[#FBE698] to-[#8C5D1D]">
                        <CountdownTimer targetDate={dateTimeAfterThreeDays} />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default TimeAndPlacePage