import { Ad } from "../entities/Ad";
import { DataSource } from "typeorm";

export const dataSourceGoodCorner = new DataSource({
  database: "good_corner.sqlite",
  type: "sqlite",
  entities: [Ad],
  synchronize: true,
  logging: ["error", "query"],
});
