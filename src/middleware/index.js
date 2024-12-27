import express from "express";
import cors from "cors";
import app from "../routes/index.js";

const appMiddleware = express();

appMiddleware.use(
  cors({
    methods: "GET",
  })
);

appMiddleware.options("*", cors());
appMiddleware.use(cors());
appMiddleware.use(express.json());
appMiddleware.use(app);

export default appMiddleware;
