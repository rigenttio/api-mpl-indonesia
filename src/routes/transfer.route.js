import { Router } from "express";
import { getAllTransfer } from "../controllers/transfer.controller.js";

const tranferRoute = Router();

tranferRoute.get("/transfers", getAllTransfer);

export default tranferRoute;
