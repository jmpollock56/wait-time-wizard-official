import "../style/InformationSection.css";
import background from "/wtw-back.png";

export default function InformationSection() {
  return (
    <section className="d-flex flex-column info-sec">
      <div className="info-div">
        <h2 className="info-header">Welcome to Wait Time Wizard!</h2>
        <p className="info-sub">
          Your go-to source for real-time theme park wait times. Whether you're
          chasing thrills or planning a family day out, our powerful search and
          filtering tools make it easy to find wait times for every ride, show,
          and attraction. Skip the guesswork, plan smarter, and make every
          moment count. Wait Times provided by <a href="https://queue-times.com/"><b>queue-times.com</b></a> 
        </p>
      </div>
    </section>
  );
}
