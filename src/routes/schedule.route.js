import { Router } from "express";
import { getAllSchedule, getScheduleByWeek } from "../controllers/schedule.controller.js";

const scheduleRoute = Router();

scheduleRoute.get("/schedules", getAllSchedule);
scheduleRoute.get("/schedules/:week", getScheduleByWeek);

export default scheduleRoute;
