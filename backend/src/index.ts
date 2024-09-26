import "reflect-metadata";
import express from "express";
import { dataSourceGoodCorner } from "./config/db";
import { Ad } from "./entities/Ad";
import { validate } from "class-validator";

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

app.post("/ads", async (req, res) => {
  console.log("request body", req.body);
  const adToSave = new Ad();
  adToSave.createdAt = req.body.createdAt;
  adToSave.description = req.body.description;
  adToSave.location = req.body.location;
  adToSave.owner = req.body.owner;
  adToSave.picture = req.body.picture;
  adToSave.price = req.body.price;
  adToSave.title = req.body.title;

  const errors = await validate(adToSave);
  if (errors.length > 0) {
    console.log(errors);
    // throw new Error("Validation failed");
    res.status(400).send("Invalid input");
  } else {
    const result = await adToSave.save();
    res.send(result);
  }
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
