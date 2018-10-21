// src/index.ts
import "reflect-metadata";
import { createKoaServer } from "routing-controllers";
import setupDb from "./db";

import GameController from "./games/controller";

const app = createKoaServer({
  controllers: [
    GameController,
  ],
});

const stdPort = process.env.PORT || 4000;

const server = (port) => new Promise((resolve, reject) => {
  try {
    app.listen(port, () => resolve(`Listening on port ${port}`));
  } catch (e) {
    reject(port + 1);
  }
});

setupDb()
.then(() => {
  server(stdPort)
  .then((res) => console!.log(res))
  .catch((nextPort) => server(nextPort));
})
.catch((err) => {
  console!.error(err);
});
