import express from "express";
import {TechnologyController} from "../controllers/technology.controller";
import {authenticateJWT, authorizeRoles} from "../middleware/authMiddleware";
import { UserRole } from '../../../../shared/src/lib/models/user.model';

const router = express.Router();
const technologyController = new TechnologyController();

router.get("/technologies/", authenticateJWT, technologyController.getAllPublished.bind(technologyController));
router.get("/technologies/:id", authenticateJWT, technologyController.getById.bind(technologyController));
router.post("/technologies/", authenticateJWT, authorizeRoles(UserRole.CTO, UserRole.TECH_LEAD), technologyController.create.bind(technologyController));
router.post("/technologies/draft", authenticateJWT, authorizeRoles(UserRole.CTO, UserRole.TECH_LEAD), technologyController.createDraft.bind(technologyController));
router.put("/technologies/:id", authenticateJWT, authorizeRoles(UserRole.CTO, UserRole.TECH_LEAD), technologyController.update.bind(technologyController));
router.put("/technologies/draft/:id", authenticateJWT, authorizeRoles(UserRole.CTO, UserRole.TECH_LEAD), technologyController.updateDraft.bind(technologyController));
router.put("/technologies/draft/:id/publish", authenticateJWT, authorizeRoles(UserRole.CTO, UserRole.TECH_LEAD), technologyController.updateDraftAndPublish.bind(technologyController));
router.delete("/technologies/:id", authenticateJWT, authorizeRoles(UserRole.CTO, UserRole.TECH_LEAD), technologyController.delete.bind(technologyController));

export default router;
