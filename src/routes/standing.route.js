import { Router } from "express";
import { getAllStanding } from "../controllers/standing.controller.js";

const standingRoute = Router();

standingRoute.get("/standings", getAllStanding);

export default standingRoute;
