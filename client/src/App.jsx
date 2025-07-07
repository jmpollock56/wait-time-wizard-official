import { useEffect, useState } from "react";
import NewSearch from "./components/NewSearch";
import InformationSection from "./components/InformationSection";
import WaitTimeSection from "./components/WaitTimeSection";
import ChooseParkMessage from "./components/ChooseParkMessage";
import socket from "./util/socket";
import "./style/App.css";

function App() {
  const [waitTimes, setWaitTimes] = useState([]);
  const [selectedPark, setSelectedPark] = useState({});
  const [selectedParks, setSelectedParks] = useState([]);
  const [filteredParks, setFilteredParks] = useState([]); 
  const [activeAttributes, setActiveAttributes] = useState([]);
  const allAttributes = [
    {
      id: 1,
      name: "Show",
    },
    {
      id: 2,
      name: "Family-Friendly",
    },
    {
      id: 3,
      name: "Dark Ride",
    },
    {
      id: 4,
      name: "Meet and Greet",
    },
    {
      id: 5,
      name: "Thrill Ride",
    },
    {
      id: 6,
      name: "Coaster",
    },
    {
      id: 7,
      name: "Spinning",
    },
    {
      id: 8,
      name: "Big Drops",
    },
  ];

  useEffect(() => {
    // Initial fetch
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
    /**
     * Needs to update selectedPark(s!!!) instead of selectedPark.
     * !!!!!!
     */
    socket.on("update-wait-times", (newFullWaitTimes) => {
      console.log("---- socket update -----");
      setWaitTimes(newFullWaitTimes)
    
      const selectedIds = selectedParks.map(park => park.id)
      const updatedSelectedParks = waitTimes.filter(park => selectedIds.includes(park.id))
      console.log(updatedSelectedParks, 'updatedSelectedParks')
      setSelectedParks(updatedSelectedParks)
      
      
    });

    return () => {
      socket.off("update-wait-times");
    };
  }, [selectedParks]);
  console.log(selectedParks)
  useEffect(() => {
    console.log("attribute fire");
    if (activeAttributes.length === 0) {
      setFilteredParks([]);
    } else {
     filterParks()
    }
  }, [activeAttributes, selectedParks]);

  function filterParks() {

    const newSelectedParks = selectedParks.map((park) => {
      const filteredRides = park.rides.filter((ride) => {
        const rideAttrs = ride.attributes;
        const isSelected = rideAttrs?.some((el) =>
          activeAttributes.some((el2) => el.id === el2.id)
        );

        if (isSelected) {
          return ride;
        }
      });

      return {
        id: park.id,
        name: park.name,
        rides: filteredRides,
      };
    });

    setFilteredParks(newSelectedParks);
  }

  function addParkToView(park) {
    setSelectedParks((prev) => [...prev, park]);
  }

  function removeParkFromView(park) {
    const newParks = selectedParks.filter((sPark) => sPark.id != park.id);
    setSelectedParks(newParks);
  }

  function addAttributeFilter(attribute) {
    setActiveAttributes((prev) => [...prev, attribute]);
  }

  function removeAttributeFilter(attribute) {
    const newAttributes = activeAttributes.filter(
      (attr) => attr.id != attribute.id
    );
    setActiveAttributes(newAttributes);
  }

  return (
    <div className="app-container">
      <main className="d-flex">
        <NewSearch
          waitTimes={waitTimes}
          addParkToView={addParkToView}
          removeParkFromView={removeParkFromView}
          addAttributeFilter={addAttributeFilter}
          removeAttributeFilter={removeAttributeFilter}
          allAttributes={allAttributes}
        />
        {selectedParks.length > 0 ? (
          <WaitTimeSection
            parks={selectedParks}
            filteredParks={filteredParks}
          />
        ) : (
          <ChooseParkMessage />
        )}
      </main>
    </div>
  );
}

export default App;
