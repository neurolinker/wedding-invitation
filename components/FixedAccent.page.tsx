const FixedActionPage = ():JSX.Element => {

    return (
        <>
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
        </>
    )
}

export default FixedActionPage