import express from "express";
import { TechnologyController } from "../controllers/technology.controller";

const router = express.Router();
const technologyController = new TechnologyController();

router.get("/", technologyController.getAllPublished.bind(technologyController));
router.get("/:id", technologyController.getById.bind(technologyController));
router.post("/", technologyController.create.bind(technologyController));
router.put("/:id", technologyController.update.bind(technologyController));
router.delete("/:id", technologyController.delete.bind(technologyController));

export default router;
