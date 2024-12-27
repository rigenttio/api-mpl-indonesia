import { Router } from "express";
import { getAllTeam, getRoasterByTeam } from "../controllers/team.controller.js";

const teamRoute = Router();

teamRoute.get("/teams", getAllTeam);
teamRoute.get("/teams/:teamName", getRoasterByTeam);

export default teamRoute;
