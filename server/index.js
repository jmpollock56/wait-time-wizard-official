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
  const newTimes = waitTimes.map((park) => {
    const attributePark = rideAttributes.find(el => park.id === el.id)
    const newRides = park.rides.map((ride) => {
      const attributeRide = attributePark.rides.find(rideEl => ride.id === rideEl.id)
      return {
        id: ride.id,
        name: ride.name,
        wait_time: ride.wait_time,
        attributes: attributeRide.attributes
      }
    })
  })
}

app.get('/', async (req, res) => {
    try {
      const waitTimes = await getWaitTimes(); 
      const completeWaitTimes = await addAttributes(waitTimes)
      
      res.send(waitTimes);
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
  io.emit('update-wait-times', newWaitTimes)
}, 300000)
  
server.listen(3000, () => {
    console.log('Server is listening on Port 3000')
})