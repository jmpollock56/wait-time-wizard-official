import { useEffect, useState } from "react";
import Header from "./components/Header";
import NewSearch from "./components/NewSearch";
import InformationSection from "./components/InformationSection";
import WaitTimeSection from "./components/WaitTimeSection";
import socket from "./util/socket";
import "./style/App.css";

function App() {
  const [waitTimes, setWaitTimes] = useState([]);
  const [selectedPark, setSelectedPark] = useState({});
  const [selectedParks, setSelectedParks] = useState([]);
  const parkOptions = waitTimes.map((park) => {
    return {
      id: park.id,
      name: park.name,
    };
  });

  /**
   * Terracota Cream Light theme
   */

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
      console.log(newWaitTimes);
      setWaitTimes(newWaitTimes);

      /**
       * TODO:
       * This useEffect now needs to service the selectedParks to update
       * the wait times of any park that is selected.
       */

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
  }, [selectedPark?.id]);

  function changeSelectedPark(id) {
    const newSelectedPark = waitTimes.find((park) => park?.id === id);
    setSelectedPark(newSelectedPark);
    console.log("selectedPark-change: ", selectedPark);
  }

  function addParkToView(park) {
    setSelectedParks((prev) => [...prev, park])
  }

  function removeParkFromView(park) {
    console.log(park)
    const newParks = selectedParks.filter(sPark => sPark.id != park.id)
    setSelectedParks(newParks)
  }
  
  return (
    <div className="app-container">
      <InformationSection />

      <main className="d-flex">
        <NewSearch
          waitTimes={waitTimes}
          addParkToView={addParkToView}
          removeParkFromView={removeParkFromView}
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
