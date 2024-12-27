import { Router } from "express";
import scheduleRoute from "./schedule.route.js";
import standingRoute from "./standing.route.js";
import tranferRoute from "./transfer.route.js";
import teamRoute from "./team.route.js";
import statisticRoute from "./statistic.route.js";

const app = Router();

app.use("/api", scheduleRoute);
app.use("/api", standingRoute);
app.use("/api", tranferRoute);
app.use("/api", teamRoute);
app.use("/api", statisticRoute);

export default app;
