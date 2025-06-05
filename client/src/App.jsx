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
  const [filteredParks, setFilteredParks] = useState([]); // Use only when an attribute is selected, otherwise use selectedParks
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
    /**
     * Needs to update selectedPark(s!!!) instead of selectedPark.
     * !!!!!!
     */
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

  /**
   * 1. filteredParks are not updating whenever the user has a park and
   *    and an attribute selected, then selects another park. It will just
   *    show the original list of rides with the original park and attribute
   * 
   * 2. Crashes sometimes with error being
   *      App.jsx:101 Uncaught TypeError: Cannot read properties of undefined (reading 'some')
          at App.jsx:101:40
          at Array.filter (<anonymous>)
          at App.jsx:99:42
          at Array.map (<anonymous>)
          at App.jsx:98:46

      ** No repeatable reason found atm **
   */

  useEffect(() => {
  console.log('attribute fire')
    if (activeAttributes.length === 0) {
      setFilteredParks([]);
    } else {
      const newSelectedParks = selectedParks.map((park) => {
        const filteredRides = park.rides.filter((ride) => {
          const rideAttrs = ride.attributes;
          const isSelected = rideAttrs.some((el) =>
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
  }, [activeAttributes, selectedParks]);

  console.log(filteredParks)

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
        {selectedParks.length > 0 ? (
          <WaitTimeSection
            parks={selectedParks}
            filteredParks={filteredParks}
          />
        ) : (
          <div>Pick a Park!</div>
        )}
      </main>
    </div>
  );
}

export default App;
