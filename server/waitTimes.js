export async function getWaitTimes(parkId) {
  try {
    const parkName = await getParkName(parkId);

    const response = await fetch(
      `https://queue-times.com/parks/${parkId}/queue_times.json`
    );

    if (!response.ok) {
      throw new Error("Failed to fetch park data");
    }

    const data = await response.json();

    let rides = [];

    if (data.lands && data.lands.length > 0) {
      // If the park has lands, combine all rides from all lands
      rides = data.lands.reduce((acc, land) => {
        if (land && Array.isArray(land.rides)) {
          return [...acc, ...land.rides];
        }
        return acc;
      }, []);
    } else if (data.rides) {
      // Some parks might have rides directly without lands
      rides = data.rides;
    }

    return {
      name: parkName,
      rides: rides,
    };
  } catch (error) {
    console.error("Error fetching wait times:", error);
    throw error;
  }
}

export async function getParks() {
  try {
    const parkResponse = await fetch("https://queue-times.com/parks.json");

    if (parkResponse.ok) {
      const parkData = await parkResponse.json();
      return parkData;
    }
  } catch (error) {
    console.log("Error: ", error);
  }
}

export async function getParkName(id) {
  try {
    const parkResponse = await fetch("https://queue-times.com/parks.json");

    if (parkResponse.ok) {
      const parkData = await parkResponse.json();
      
      
      for (const company of parkData) {
        const foundPark = company.parks.find(park => park.id === parseInt(id));
        
        if (foundPark) {
          console.log('Found Park:', foundPark.name);
          return foundPark.name;
        }
      }
      
      return 'Unknown Park';
    }
  } catch (error) {
    console.log("Error: ", error);
    return 'Unknown Park';
  }
}
