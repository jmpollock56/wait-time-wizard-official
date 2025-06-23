import "../style/InformationSection.css";
import { Link } from 'react-router'
import gsap from 'gsap'
import { useGSAP } from "@gsap/react";

export default function InformationSection() {

  gsap.registerPlugin(useGSAP)

  useGSAP(() => {
    gsap.from('.info-header', {
      x: -1000,
      duration: 2,
      opacity: 0
    })  
  })

  return (
    <section className="d-flex info-sec">
      <div className="info-div">
        <h2 className="info-header">A Wizard's Guide to the Queue Realm</h2>
        <p className="info-sub">
          Harness the power of real-time magic to outwit long lines, chart 
          enchanted paths, and make every moment of your adventure 
          spellbinding. Whether you're a thrill-seeking sorcerer or a family 
          of friendly wand-wavers, our mystical guide ensures you spend less 
          time waiting, and more time wandering the wonder.        
        </p>
        <Link to={'/wait-times'} className="call-to-action">Conjure Wait Times</Link>
      </div>
    
      <img src='/hero-image.jpg' className="hero-img"/>
    </section>
  );
}
