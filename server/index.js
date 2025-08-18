import express from 'express'
import cors from 'cors'
import { Server } from 'socket.io'
import { createServer } from 'node:http'
import { getWaitTimes, getParks } from './waitTimes.js'



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
      const allParks = await getParks(); 
      res.send(allParks);
    } catch (error) { 
      console.error('Failed to get wait times:', error);
      res.status(500).send({ error: 'Internal Server Error' });
    }
});


app.get('/api/parks/:parkId', async (req, res) => {
    try {
        const parkId = req.params.parkId;
        const parkData = await getWaitTimes(parkId);
        res.json(parkData);
    } catch (error) {
        console.error('Failed to get park data:', error);
        res.status(500).json({ error: 'Failed to fetch park data' });
    }
});

  
server.listen(3000, () => {
    console.log('Server is listening on Port 3000')
})