import express, { Request, Response } from "express";
import { createClient } from "redis";

const app = express();
const client = createClient();

app.get("/", async (req: Request, res: Response) => {
  console.time("request");
  const queryTerm = req.url.split("?")[1];

  const result = await client.get(`photos:${queryTerm}`);
  if (result) {
    console.log("returning from cache");

    res.json(JSON.parse(result));
    console.timeEnd("request");
  } else {
    console.log("returning from api");

    const response = await fetch(
      `https://jsonplaceholder.typicode.com/photos?${queryTerm}`
    );
    const data = await response.json();

    client.setEx(`photos:${queryTerm}`, 60, JSON.stringify(data));

    res.json(data);
    console.timeEnd("request");
  }
});

(async () => {
  client.on("error", (err) => console.log("Redis connection error"));

  client.connect().then(() => {
    console.log("Redis connection open");
    app.listen(8080, () => {
      console.log("Server is on port 8080");
    });
  });
})();
