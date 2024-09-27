import { Category } from "../entities/Category";
import { Ad } from "../entities/Ad";
import { DataSource } from "typeorm";

export const dataSourceGoodCorner = new DataSource({
  database: "good_corner.sqlite",
  type: "sqlite",
  entities: [Ad, Category],
  synchronize: true,
  logging: ["error", "query"],
});
