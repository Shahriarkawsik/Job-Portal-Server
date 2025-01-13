require("dotenv").config();
const express = require("express");
const cors = require("cors");
const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("welcome");
});

/****************** MongoDB start ********************/

const uri = process.env.DB_URI;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});
// jobs related APIs
const jobsCollection = client.db("Job-Portal").collection("Jobs");

// Get all jobs
app.get("/jobs", async (req, res) => {
  const cursor = jobsCollection.find();
  const result = await cursor.toArray();
  res.send(result);
});

//Get single data‼
app.get(`/jobs/:id`, async (req, res) => {
  const id = req.params.id;
  const query = { _id: new ObjectId(id) };
  const result = await jobsCollection.findOne(query);
  res.send(result);
});

async function run() {
  try {
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);

/****************** MongoDB end ********************/

app.listen(port, (req, res) => {
  console.log(`The server is running on port: ${port}`);
});
