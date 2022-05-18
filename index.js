const express = require("express");
const app = express();
const cors = require('cors');
const port = process.env.PORT || 5000;
require("dotenv").config();
const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");



// Middleware
app.use(cors());
app.use(express.json());


const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@todo-server.7cqew.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverApi: ServerApiVersion.v1,
});


async function run() {
  try {
    await client.connect();
    const todoCollection = client.db("todo").collection("notes");
    // Get a user TOdos
    app.get('/todo', async (req, res) => {
      const email = req.query.email;
      const query = {email};
      const result = await todoCollection.find(query).toArray();
      res.send(result)
    });
    app.post('/todo', async (req, res) => {
      const todo = req.body;
      const result = await todoCollection.insertOne(todo);
      res.send(result)
    });

    // delete a todo by Id
    app.delete('/todo/:id',async (req, res) => {
      const id = req.params.id;
      const query = {_id: ObjectId(id)};
      const result = await todoCollection.deleteOne(query);
      res.send(result);
    });
    // delete a todo by Id
    app.put('/todo/:id',async (req, res) => {
      const id = req.params.id;
      const filter = {_id: ObjectId(id)};
      const complete = req.body;
      const options = { upsert: true };
      const updateDoc = {
        $set: complete,
      };
      const result = await todoCollection.updateOne(filter, updateDoc, options);
      res.send(result);
    });
  } finally {
    // await client.close();
  }
}
run().catch(console.dir);


app.get("/", (req, res) => {
  res.send("Todo is active");
});

app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});