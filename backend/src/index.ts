import express, { Application } from "express";
import cors from "cors";
import * as trpcExpress from "@trpc/server/adapters/express";
import trpcRouter from "./router";
import { createContext } from "./trpc";

const app: Application = express();

app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
  res.send("Hello");
});

app.use(
  "/todo",
  trpcExpress.createExpressMiddleware({
    router: trpcRouter,
    createContext,
  })
);

app.listen(8080, () => {
  console.log("Server running on port 8080");
});
