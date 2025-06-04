import { useEffect, useState } from "react";
import NewSearch from "./components/NewSearch";
import InformationSection from "./components/InformationSection";
import WaitTimeSection from "./components/WaitTimeSection";
import socket from "./util/socket";
import "./style/App.css";

function App() {
  const [waitTimes, setWaitTimes] = useState([]);
  const [selectedPark, setSelectedPark] = useState({});
  const [selectedParks, setSelectedParks] = useState([]);
  const [filteredParks, setFilteredParks] = useState([]);
  const allAttributes = [
    { 
      id: 1,
      name: "Show"
    },
     { 
      id: 2,
      name: "Family-Friendly"
    },
     { 
      id: 3,
      name: "Dark Ride"
    },
     { 
      id: 4,
      name: "Meet and Greet"
    },
    { 
      id: 5,
      name: "Thrill Ride"
    },
    { 
      id: 6,
      name: "Coaster"
    },
    { 
      id: 7,
      name: "Spinning"
    },
    { 
      id: 8,
      name: "Big Drops"
    },
  ];
  
  useEffect(() => {
    const fetchWaitTimes = async () => {
      try {
        console.log("----- Fetching Wait Times -----");
        const response = await fetch("http://localhost:3000/");
        const data = await response.json();
        setWaitTimes(data);
      } catch (error) {
        console.log("Error", error);
      }
    };
    fetchWaitTimes();
  }, []);

  useEffect(() => {
    if (waitTimes.length > 0 && !selectedPark.id) {
      const defaultPark = waitTimes.find((park) => park.id === 6);
      console.log("----- Default Park Set -----");
      setSelectedPark(defaultPark);
    }
  }, [waitTimes]);

  useEffect(() => {
    socket.on("update-wait-times", (newWaitTimes) => {
      console.log("---- socket update -----");
      setWaitTimes(newWaitTimes);

      const updatedSelectedPark = newWaitTimes.find(
        (park) => park.id === selectedPark?.id
      );
      if (updatedSelectedPark) {
        setSelectedPark(updatedSelectedPark);
      }
    });

    return () => {
      socket.off("update-wait-times");
    };
  }, [selectedParks]);

  function addParkToView(park) {
    setSelectedParks((prev) => [...prev, park]);
  }

  function removeParkFromView(park) {
    const newParks = selectedParks.filter((sPark) => sPark.id != park.id);
    setSelectedParks(newParks);
  }

  function addAttributeFilter(attribute) {
    /**
     * Filter from selectedParks and present the filtered list as 'filteredParks'
     * WIP!!!
     */

    const newParkList = selectedParks.map((park) => {
      const newRides = park.rides.filter((ride) => {
       const hasAttribute = ride.attribute.some(attr => attr.id === attribute.id)
       return hasAttribute
      })

      return {
        id: park.id,
        name: park.name,
        initial: park.initial,
        rides: newRides
      }
    })
    console.log(newRides)
  }

  function removeAttributeFilter(attribute) {}

  return (
    <div className="app-container">
      <InformationSection />

      <main className="d-flex">
        <NewSearch
          waitTimes={waitTimes}
          addParkToView={addParkToView}
          removeParkFromView={removeParkFromView}
          addAttributeFilter={addAttributeFilter}
          removeAttributeFilter={removeAttributeFilter}
          allAttributes={allAttributes}
        />
        {selectedPark?.id ? (
          <WaitTimeSection parks={selectedParks} />
        ) : (
          <div>Loading...</div>
        )}
      </main>
    </div>
  );
}

export default App;
