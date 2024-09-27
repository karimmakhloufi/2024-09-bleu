import "reflect-metadata";
import express from "express";
import { Like } from "typeorm";
import { dataSourceGoodCorner } from "./config/db";
import { Ad } from "./entities/Ad";
import { validate } from "class-validator";
import { Category } from "./entities/Category";

const app = express();
const port = 3000;

app.use(express.json());

app.get("/", (_req, res) => {
  res.send("Hello World test reload");
});

app.get("/ads", async (req, res) => {
  let ads: Ad[];
  if (req.query.category) {
    ads = await Ad.find({
      where: {
        category: { title: req.query.category as string },
      },
      relations: { category: true },
    });
  } else {
    ads = await Ad.find({ relations: { category: true } });
  }
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
  adToSave.category = req.body.category ? req.body.category : 1;

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

app.delete("/ads/:id", async (req, res) => {
  const result = await Ad.delete(req.params.id);
  console.log(result);
  res.send("Ad has been deleted");
});

app.put("/ads/:id", async (req, res) => {
  try {
    let adToUpdate = await Ad.findOneByOrFail({ id: parseInt(req.params.id) });
    adToUpdate = Object.assign(adToUpdate, req.body);
    const result = await adToUpdate.save();
    console.log(result);
    res.send("Ad has been updated");
  } catch (err) {
    console.log(err);
    res.status(400).send("invalid request");
  }
});

app.get("/categories", async (req, res) => {
  let categories: Category[];
  if (req.query.title) {
    categories = await Category.find({
      where: {
        title: Like(`${req.query.title as string}%`),
      },
    });
  } else {
    categories = await Category.find();
  }
  res.send(categories);
});

app.listen(port, async () => {
  await dataSourceGoodCorner.initialize();
  console.log(`Example app listening on port ${port}`);
});
