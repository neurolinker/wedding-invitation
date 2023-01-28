import { motion } from "framer-motion"
import { ScrollPositionProps } from "../types/scroll-position-props"

const ScrollPosition = ({yPosition} : ScrollPositionProps): JSX.Element => {
    return (
        <div className = "fixed w-full bottom-0 z-40 flex " >
            <div className = "flex relative w-1/2 h-0">
                <div className = " w-6 flex absolute -top-11" style = {{transform : `translateX(${yPosition}px)`}} >
                    <img className = "object-cover" src="./images/female.png" alt="female" />
                </div>
            </div>
            <div className = "flex relative w-1/2 h-0 justify-end ">
                <div className = "w-6  absolute flex  -top-11 " style = {{transform : `translateX(${-yPosition}px)`}} >
                <img className = "object-cover" src="./images/male.png" alt="male" />
                </div>
            </div>
        </div>
    )
}

export default ScrollPosition