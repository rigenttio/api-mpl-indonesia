import { Router } from "express";
import { getAllStatisticPlayer, getAllStatisticTeam } from "../controllers/statistic.controller.js";

const statisticRoute = Router();

statisticRoute.get("/statistics/teams", getAllStatisticTeam);
statisticRoute.get("/statistics/players", getAllStatisticPlayer);

export default statisticRoute;
