import express from 'express'
import cors from 'cors'
import { Server } from 'socket.io'
import { createServer } from 'node:http'
import { getWaitTimes } from './waitTimes.js'
import timestamp from './timestamp.js'
import rideAttributes from './data/rideAttributes.js'


const app = express()
const server = createServer(app)
const io = new Server(server, {
  cors: {
    origin: 'http://localhost:5173',
    methods: ['GET', 'POST']
  }
})
app.use(cors())

function addAttributes(waitTimes){
  
  const newTimes = waitTimes.map((park) => { // Loop through the waitTimes
    const attributePark = rideAttributes.find(el => park.id === el.id) // find the park in rideAttributes that the loop is currently on in waitTimes

    const newRides = park.rides.map((ride) => { // Loop through the rides from waitTimes of each park
      let currentRideAttributes = []
      if(attributePark){
        const attributeRide = attributePark.rides.find(rideEl => ride.id === rideEl.id) // Find the ride in the current park that matches the ride in waitTimes ride
        if(attributeRide){
          currentRideAttributes = attributeRide.attributes
        }
      }

      return  {
        id: ride.id,
        name: ride.name,
        is_open: ride.is_open,
        wait_time: ride.wait_time,
        initial: park.initial,
        attributes: currentRideAttributes
      }
    })
    return {
      id: park.id,
      name: park.name,
      rides: newRides
    }
  })
  
  return newTimes
}

app.get('/', async (req, res) => {
    try {
      const waitTimes = await getWaitTimes(); 
      const completeWaitTimes = await addAttributes(waitTimes)
      
      res.send(completeWaitTimes);
    } catch (error) { 
      console.error('Failed to get wait times:', error);
      res.status(500).send({ error: 'Internal Server Error' });
    }
});

/**
 * Queue-Times updates every 5 minutes
 */
setInterval(async () => {
  const ts = timestamp()
  console.log(`${ts} ---- Wait Times Updated`)
  const newWaitTimes = await getWaitTimes()
  const newFullWaitTimes = await addAttributes(newWaitTimes)
  io.emit('update-wait-times', newFullWaitTimes)
}, 300000)
  
server.listen(3000, () => {
    console.log('Server is listening on Port 3000')
})