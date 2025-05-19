import { useEffect, useState } from "react";
import Header from "./components/Header";
import Search from "./components/Search";
import InformationSection from "./components/InformationSection";
import WaitTimeSection from "./components/WaitTimeSection";
import socket from "./util/socket";
import "./style/App.css";

function App() {
  const [waitTimes, setWaitTimes] = useState([]);
  const [selectedPark, setSelectedPark] = useState({});
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
      console.log(newWaitTimes)
      setWaitTimes(newWaitTimes);

      const updatedPark = newWaitTimes.find((p) => p.id === selectedPark.id);
      setSelectedPark(updatedPark)
    });
  }, []);

  useEffect(() => {

  },[waitTimes])

  function changeSelectedPark(id) {
    const newSelectedPark = waitTimes.find((park) => park.id === id);
    setSelectedPark(newSelectedPark);
  }

  return (
    <>
      <Header />
      <InformationSection />
      <main className="d-flex vh-100">
        <Search
          parkOptions={parkOptions}
          changeSelectedPark={changeSelectedPark}
          currentPark={selectedPark.id}
        />
        {selectedPark?.id ? (
          <WaitTimeSection park={selectedPark} />
        ) : (
          <div>Loading...</div>
        )}
      </main>
    </>
  );
}

export default App;
