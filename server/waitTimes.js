/**
 * Disney Park ID's 
 * Walt Disney Studios Paris: 28 ✅
 * Tokyo DisneySea: 275 ✅
 * Tokyo Disneyland: 274 ✅
 * Shanghai Disneyland: 30 ✅
 * EPCOT: 5 ✅
 * Disneyland Park Paris: 4 ✅
 * Disneyland Hong Kong: 31 ✅
 * Disneyland: 16 ✅
 * Magic Kingdom: 6 ✅
 * Hollywood Studios: 7 ✅
 * California Adventure: 17 ✅
 * Animal Kingdom: 8 ✅
 * 
 */
const parks = [{ id: 4, name: 'Disneyland Park Paris', initial: 'DPP'}, { id: 5, name: 'EPCOT', initial: 'EPCOT'},
    { id: 6, name: 'Magic Kingdom', initial: 'MK'}, { id: 7, name: 'Hollywood Studios', initial: 'HS'},
    { id: 8, name: 'Animal Kingdom', initial: 'AK'}, { id: 16, name: 'Disneyland', initial: 'DL'}, { id: 17, name: 'California Adventure', initial: 'CA'},
    { id: 28, name: 'Walt Disney Studios Park', initial: 'WDSP'}, { id: 30, name: 'Shanghai Disneyland', initial: 'SHDL'},
    { id: 31, name: 'Disneyland Hong Kong', initial: 'DHK'}, { id: 274, name: 'Tokyo Disneyland', initial: 'TDL'},
    { id: 275, name: 'Tokyo DisneySea', initial: 'TDS'}
]

export async function getWaitTimes() {
    const waitTimes = await Promise.all(
      parks.map(async (park) => {
        try {
          const response = await fetch(`https://queue-times.com/parks/${park.id}/queue_times.json`);

          if(response.ok){
             const data = await response.json();
  
            const parsedLands = await Promise.all(
              data.lands.map(async (land) => await parseWaitTimes(land))
            );
    
            return {
              id: park.id,
              initial: park.initial,
              name: park.name,
              rides: parsedLands.flat()
            };
          }
        
        } catch (error) {
          console.log('Error: ', error);
          
        }
      })
    );
    return waitTimes;
  }
  

/**
 * Parses the wait time data into just showing the rides instead of being segmented into
 * their specific lands.
 * 
 * land = land object
 */
async function parseWaitTimes(land){
    const rides = await land.rides.map(ride => ride)
    return rides
}
