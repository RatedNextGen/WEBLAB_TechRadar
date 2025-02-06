import express from "express";
import {TechnologyController} from "../controllers/technology.controller";
import {authenticateJWT, authorizeRoles} from "../middleware/authMiddleware";

const router = express.Router();
const technologyController = new TechnologyController();

router.get("/technologies/", authenticateJWT, technologyController.getAllPublished.bind(technologyController));
router.get("/technologies/:id", authenticateJWT, technologyController.getById.bind(technologyController));
router.post("/technologies/", authenticateJWT, authorizeRoles("CTO", "Tech-Lead"), technologyController.create.bind(technologyController));
router.post("/technologies/draft", authenticateJWT, authorizeRoles("CTO", "Tech-Lead"), technologyController.createDraft.bind(technologyController));
router.put("/technologies/:id", authenticateJWT, authorizeRoles("CTO", "Tech-Lead"), technologyController.update.bind(technologyController));
router.delete("/technologies/:id", authenticateJWT, authorizeRoles("CTO", "Tech-Lead"), technologyController.delete.bind(technologyController));

export default router;
