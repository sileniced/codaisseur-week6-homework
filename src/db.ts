// src/db.ts
import { createConnection } from "typeorm";
import { CustomNamingStrategy } from "./customNamingStrategy";

import Game from "./games/entity";

export default () =>
  createConnection({
    entities: [Game],
    logging: true,
    namingStrategy: new CustomNamingStrategy(),
    synchronize: true,
    type: "postgres",
    url: process.env.DATABASE_URL || "postgres://postgres:secret@localhost:5432/postgres",
  })
  .then((_) => console!.log("Connected to Postgres with TypeORM"));
