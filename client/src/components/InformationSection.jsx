import React from "react";
import '../style/InformationSection.css'

export default function InformationSection(){
    return (
        <section className="d-flex flex-column justify-content-center align-item-center text-center info-sec">
            <h2>Welcome to Wait Time Wizard!</h2>
            <p>
                Welcome to ParkTime, your go-to source 
                for real-time theme park wait times. 
                Whether you're chasing thrills or planning
                a family day out, our powerful search and 
                filtering tools make it easy to find wait times
                for every ride, show, and attraction—fast. 
                Skip the guesswork, plan smarter, and make 
                every moment count.
            </p>
        </section>
    )
}