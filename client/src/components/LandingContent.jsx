import '../style/LandingContent.css'
import { MdOutlineWatchLater } from "react-icons/md";
import { LuRollerCoaster } from "react-icons/lu";
import { BiShow } from "react-icons/bi";
import gsap from 'gsap'
import { useGSAP } from "@gsap/react";
import ContentCard from './ContentCard';

export default function LandingContent(){

    gsap.registerPlugin(useGSAP)

    useGSAP(() => {
        
    })

    return (
        <section className="content-sec">
           <div className="content">
                <MdOutlineWatchLater size={150}/>
                <div className='w-100'>Live Wait Times</div>
                <p>Stay one step ahead of the crowds with constantly updated ride wait times.</p>
           </div>

           <div className="content">
                <LuRollerCoaster size={150}/>
                <div className='w-100'>Filter by Ride Type</div>
                <p>Use our magical filters to instantly sort rides by type, thrill level, and more.</p>
           </div>

           <div className="content">
                <BiShow size={150}/>
                <div className='w-100'>View Multiple Parks</div>
                <p>With our multi-park view, you can monitor wait times across several parks at once. </p>
           </div>
        </section>
    )
}