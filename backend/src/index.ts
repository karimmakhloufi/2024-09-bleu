import express from "express";
import sqlite3 from "sqlite3";

const db = new sqlite3.Database("good_corner.sqlite");

const app = express();
const port = 3000;

app.use(express.json());

app.get("/", (_req, res) => {
  res.send("Hello World test reload");
});

app.get("/ads", (req, res) => {
  console.log("query", req.query);
  if (req.query.location) {
    db.all(
      "SELECT * from ad WHERE location LIKE ?",
      req.query.location,
      (err, rows) => {
        if (err) {
          console.log(err);
        } else {
          res.send(rows);
        }
      }
    );
  } else {
    db.all("SELECT * from ad", (err, rows) => {
      if (err) {
        console.log(err);
      } else {
        res.send(rows);
      }
    });
  }
});

app.post("/ads", (req, res) => {
  console.log("request body", req.body);
  const stmt = db.prepare(
    "INSERT INTO ad (title, description, owner, price, picture, location, createdAt) VALUES (?, ?, ?, ?, ?, ?,?)"
  );
  stmt.run([
    req.body.title,
    req.body.description,
    req.body.owner,
    req.body.price,
    req.body.picture,
    req.body.location,
    req.body.createdAt,
  ]);
  // ads.push(req.body);
  res.send("ad has been created");
});

app.delete("/ads/:id", (req, res) => {
  // ads = ads.filter((el) => el.id !== parseInt(req.params.id));
  const stmt = db.prepare("DELETE FROM ad WHERE id = (?)");
  stmt.run([req.params.id]);
  res.send("Ad has been deleted");
});

app.put("/ads/:id", (req, res) => {
  db.get(
    "SELECT * FROM ad WHERE id = (?)",
    req.params.id,
    (_err, data: any) => {
      const stmt = db.prepare(
        "UPDATE ad SET title = ?, description = ?, owner = ?, price = ?, picture = ?, location = ?, createdAt = ? WHERE id = ?"
      );
      stmt.run([
        req.body.title ? req.body.title : data.title,
        req.body.description ? req.body.description : data.description,
        req.body.owner ? req.body.owner : data.owner,
        req.body.price ? req.body.price : data.price,
        req.body.picture ? req.body.picture : data.picture,
        req.body.location ? req.body.location : data.location,
        req.body.createdAt ? req.body.createdAt : data.createdAt,
        req.params.id,
      ]);
    }
  );

  /*

  */
  res.send("Ad has been updated");
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
