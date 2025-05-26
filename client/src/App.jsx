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
console.log(selectedParks)
  function removeParkFromView(id) {

    console.log(id, "remove");
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
          <WaitTimeSection park={selectedPark} />
        ) : (
          <div>Loading...</div>
        )}
      </main>
    </div>
  );
}

export default App;
