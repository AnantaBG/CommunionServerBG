require('dotenv').config();
const express = require('express');
const cors = require('cors');
const app = express();
const port = process.env.PORT || 4000;
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');

// middleware
app.use(cors());
app.use(express.json());

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.nh8g7.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {

    const db = client.db('CommunionDB');
    const allEvents = db.collection('EventCL');


    app.post('/addedEvent', async (req, res) => {
        const allEventData = req.body;
    
        if (!allEventData.title || !allEventData.date || !allEventData.category) {
            return res.status(400).json({ error: 'Missing required fields' });
        }
    
        try {
            const result = await allEvents.insertOne(allEventData);
            res.status(201).json(result); //send 201 on success.
        } catch (error) {
            console.error("Error adding event:", error);
            res.status(500).json({ error: 'Internal server error' });
        }
    
    });



    app.get('/allEvents', async (req, res) => {
      const result = await allEvents.find().toArray();
      res.send(result);
    });




    // app.get('/allTasks', async (req, res) => {
    //   const result = await allTasks.find().toArray();
    //   res.send(result);
    // });

    console.log("Pinged your deployment. You successfully connected Communion to MongoDB!");

  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
    process.exit(1); // Exit if DB connection fails
  }
}



run();

app.get('/', (req, res) => {
  res.send(`CommunionDB Server Is Running Successfully at port: ${port}`);
});

process.on('SIGINT', async () => {
  console.log('Shutting down server...');
  try {
    console.log('MongoDB connection closed.');
    process.exit(0);
  } catch (err) {
    console.error('Error closing MongoDB connection:', err);
    process.exit(1);
  }
});

app.listen(port, () => {
  console.log(`CommunionDB Server Is Running at port: ${port}`);
});