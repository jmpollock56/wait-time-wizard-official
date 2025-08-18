
export async function getWaitTimes(parkId) {
  try {
    
    const response = await fetch(
      `https://queue-times.com/parks/${parkId}/queue_times.json`
    );

    if (!response.ok) {
      throw new Error('Failed to fetch park data');
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
      name: data.name,
      rides: rides
    };

  } catch (error) { 
    console.error("Error fetching wait times:", error);
    throw error;
  }
}

export async function getParks() {
  try {
    const parkResponse = await fetch('https://queue-times.com/parks.json');

    if(parkResponse.ok){
      const parkData = await parkResponse.json();
      return parkData;
    }
  } catch (error) {
    console.log("Error: ", error);
  }
}

/**
 * Parses the wait time data into just showing the rides instead of being segmented into
 * their specific lands.
 *
 * land = land object
 */
async function parseWaitTimes(land) {
  const rides = await land.rides.map((ride) => ride);
  return rides;
}
