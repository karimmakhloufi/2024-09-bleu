import fs from "fs";
import pg from "pg";

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
  `SELECT url FROM "picture" WHERE "adId" IS NOT NULL;`
);

const filesToKeep = res.rows.map((el) => el.url);

await client.end();

fs.readdirSync("./uploads/").forEach((file) => {
  if (!filesToKeep.includes("/img/" + file)) {
    fs.unlink("/app/uploads/" + file, (err) => {
      if (err) throw err;
      console.log(file, "was deleted");
    });
  }
});
