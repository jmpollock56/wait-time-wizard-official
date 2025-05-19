import express from 'express'
import cors from 'cors'
import { Server } from 'socket.io'
import { createServer } from 'node:http'
import { getWaitTimes } from './waitTimes.js'
import timestamp from './timestamp.js'

const app = express()
const server = createServer(app)
const io = new Server(server, {
  cors: {
    origin: 'http://localhost:5173',
    methods: ['GET', 'POST']
  }
})
app.use(cors())

app.get('/', async (req, res) => {
    try {
      const waitTimes = await getWaitTimes(); 
      
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
  const newWaitTimes = await getWaitTimes();
  const parkParis = newWaitTimes.find((park) => park.id === 28)
  console.log(parkParis)
  io.emit('update-wait-times', newWaitTimes)
}, 300000)
  
server.listen(3000, () => {
    console.log('Server is listening on Port 3000')
})