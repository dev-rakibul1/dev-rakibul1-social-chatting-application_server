const express = require("express");
const app = express();
require("dotenv").config();
const port = process.env.PORT || 8000;
const cors = require("cors");
const { MongoClient, ServerApiVersion } = require("mongodb");

// Middle ware
app.use(cors());
app.use(express.json());

// mongodb collection

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.lqqbhox.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverApi: ServerApiVersion.v1,
});

async function run() {
  try {
    await client.connect();
  } finally {
  }
}
run().catch((error) => console.log(error));

// =====================all db collection======================
const postCollection = client.db("end_games_social_app").collection("posts");

app.get("/posts", async (req, res) => {
  try {
    const query = {};
    const result = await postCollection
      .find(query)
      .sort({ like: -1 })
      .toArray();
    res.status(200).json(result);
  } catch (e) {
    res.status(500).send({ message: e.message });
  }
});

app.get("/", (req, res) => {
  res.send("Welcome from server");
});

app.listen(port, () => {
  console.log(`Server url: http://localhost:${port}/`);
});
