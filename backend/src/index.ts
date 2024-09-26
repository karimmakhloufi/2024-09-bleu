import "reflect-metadata";
import express from "express";
import { dataSourceGoodCorner } from "./config/db";
import { Ad } from "./entities/Ad";

const app = express();
const port = 3000;

app.use(express.json());

app.get("/", (_req, res) => {
  res.send("Hello World test reload");
});

app.get("/ads", async (_req, res) => {
  const ads = await Ad.find();
  res.send(ads);
});

app.post("/ads", (req, res) => {
  console.log("request body", req.body);

  res.send("ad has been created");
});

app.delete("/ads/:id", (_req, res) => {
  res.send("Ad has been deleted");
});

app.put("/ads/:id", (_req, res) => {
  /*

  */
  res.send("Ad has been updated");
});

app.listen(port, async () => {
  await dataSourceGoodCorner.initialize();
  console.log(`Example app listening on port ${port}`);
});
