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




    // app.post('/users', async (req, res) => {
    //   const user = req.body;
    //   const query = { email: user.email };
    //   const existuser = await allUsers.findOne(query);
    //   if (existuser) {
    //     return res.send({ message: 'user exists', insertedId: null });
    //   }
    //   const result = await allUsers.insertOne(user);
    //   res.send(result);
    // });

    // app.delete('/alltasks/:id', async (req, res) => {
    //     const taskId = req.params.id;
    //     try {
    //         const objectId = new ObjectId(taskId);
    //         const result = await allTasks.deleteOne({ _id: objectId }); // Correct way to delete
    
    //         if (result.deletedCount === 0) { // Essential check!
    //             return res.status(404).json({ message: "Task not found" });
    //         }
    
    //         res.status(200).json({ message: "Task deleted successfully" }); // Send success message
    
    //     } catch (error) {
    //         console.error("Error deleting task:", error);
    //         res.status(500).json({ error: 'Failed to delete task' });
    //     }
    // });

    // app.post('/alltasks', async (req, res) => {
    //   const alltasks = req.body;
    //   const result = await allTasks.insertOne(alltasks);
    //   res.send(result);
    // });

    // app.get('/allTasks/:id', async (req, res) => {
    //   const taskId = req.params.id;
    //   try {
    //     const objectId = new ObjectId(taskId);
    //     const task = await allTasks.findOne({ _id: objectId });
    //     if (!task) {
    //       return res.status(404).json({ message: "Task not found" });
    //     }
    //     res.status(200).json(task);
    //   } catch (error) {
    //     console.error("Error fetching task:", error);
    //     res.status(500).json({ error: 'Failed to fetch task' });
    //   }
    // });

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