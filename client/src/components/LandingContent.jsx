import '../style/LandingContent.css'
import { MdOutlineWatchLater } from "react-icons/md";
import { LuRollerCoaster } from "react-icons/lu";
import { BiShow } from "react-icons/bi";
import gsap from 'gsap'
import { useGSAP } from "@gsap/react";

export default function LandingContent(){

    gsap.registerPlugin(useGSAP)

    useGSAP(() => {
        
    })

    return (
        <section className="content-sec">
           <div className="content">
                <MdOutlineWatchLater size={350}/>
                <div className='w-100 text-center'>Live Wait Times</div>
           </div>

           <div className="content">
                <LuRollerCoaster size={350}/>
                <div className='w-100 text-center'>Filter by Ride Type</div>
           </div>

           <div className="content">
                <BiShow size={350}/>
                <div className='w-100 text-center'>View Multiple Parks</div>
           </div>
        </section>
    )
}