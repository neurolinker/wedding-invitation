import React from "react";
import { motion, useScroll } from "framer-motion"

function Index(): JSX.Element {
   
    const elementRef = React.useRef(null);
    const { scrollYProgress } = useScroll();
    const [sY, setSy] = React.useState<number>(0)

    React.useEffect(() => {
        return scrollYProgress.onChange(async (latest) => {
            const hn = await latest * elementRef.current.clientHeight;
            await console.log((hn / elementRef.current.clientHeight) *100)
            setSy(latest * 100 / 2)
        })
    }, [scrollYProgress])
      
    
    return (
        <>
            <div className = "fixed bottom-0 flex flex-row justify-between w-full bg-green-600 z-40" >
                <div className = "justify-end bg-red-600 flex" style = {{width : `${sY}%`}} >
                    E
                </div>
                <div className = " justify-start bg-orange-600 flex" style = {{width : `${sY}%`}} >
                    T
                </div>
            </div>
            <div ref={elementRef} className = "">
                <motion.div
                    className = "w-full h-screen bg-green-600"
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
                    Page 1
                </motion.div>
                <motion.div
                    className = "w-full h-screen bg-orange-600"
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
                    Page 2
                </motion.div>
                <motion.div
                    className = "w-full h-screen bg-pink-600"
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
                    Page 3
                </motion.div>
                <motion.div
                    className = "w-full h-screen bg-yellow-600"
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
                    Page 4
                </motion.div>
                <motion.div
                    className = "w-full h-screen bg-yellow-600"
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
                    Page 4
                </motion.div>
            </div>
        </>
    )
}


export default Index;