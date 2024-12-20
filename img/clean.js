import pg from "pg";
import fs from "fs";

const { Client } = pg;
const client = new Client({
  user: "postgres",
  password: "example",
  host: "db",
  port: 5432,
  database: "postgres",
});
await client.connect();

const res = await client.query(
  `SELECT url FROM "picture" WHERE "adId" IS NOT NULL`
);
const filesToKeep = res.rows.map((el) => el.url);
// console.log("files to keep", filesToKeep);
await client.end();

fs.readdirSync("./uploads/").forEach((currentFile) => {
  if (!filesToKeep.includes("/img/" + currentFile)) {
    // console.log("delete", currentFile);
    fs.unlink("/app/uploads/" + currentFile, (err) => {
      if (err) throw err;
      console.log(currentFile + " was deleted");
    });
  }
});
