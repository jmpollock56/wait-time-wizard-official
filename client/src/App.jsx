import { useEffect, useState } from "react";
import Park from "./components/Park";
import Hero from "./components/Hero";
import "./style/App.css";


function App() {
  const [waitTimes, setWaitTimes] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const liveBackend = 'https://wait-time-wizard-backend.vercel.app/'

  const filteredParks = waitTimes.filter(company => {
    console.log('filteredParks called')
    // Search in company name
    const companyNameMatch = company.name.toLowerCase().includes(searchTerm.toLowerCase());
    
    // Search in individual park names
    const parksMatch = company.parks.some(park => 
      park.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    
    // Return true if either company name or any park name matches
    return companyNameMatch || parksMatch;
  });

  useEffect(() => {
    // Initial fetch
    const fetchWaitTimes = async () => {
      try {
        console.log("----- Fetching Wait Times -----");
        const response = await fetch(
          `${liveBackend}`
        );
        const data = await response.json();
        setWaitTimes(data);
      } catch (error) {
        console.log("Error", error);
      }
    };
    fetchWaitTimes();
  }, []);

  return (
    <div className="app-container">
      <main>
        <Hero />
        <div className="search-container">
          <input 
            type="text" 
            className="search-input"  
            placeholder="Search parks..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <section className={`content-section ${filteredParks.length === 1 ? 'single-result' : ''}`}>
          {filteredParks.map((park, i) => (
            <Park key={i} park={park} searchTerm={searchTerm} />
          ))}
        </section>
      </main>
      <footer></footer>
    </div>
  );
}

export default App;
