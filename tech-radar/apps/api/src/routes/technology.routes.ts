import express from "express";
import {TechnologyController} from "../controllers/technology.controller";
import {login} from "../controllers/auth.controller";
import {authenticateJWT, authorizeRoles} from "../middleware/authMiddleware";

const router = express.Router();
const technologyController = new TechnologyController();

router.post("/login", login);
router.get("/", authenticateJWT, technologyController.getAllPublished.bind(technologyController));
router.get("/:id", authenticateJWT, technologyController.getById.bind(technologyController));
router.post("/", authenticateJWT, authorizeRoles("CTO", "Tech-Lead"), technologyController.create.bind(technologyController));
router.post("/draft", authenticateJWT, authorizeRoles("CTO", "Tech-Lead"), technologyController.createDraft.bind(technologyController));
router.put("/:id", authenticateJWT, authorizeRoles("CTO", "Tech-Lead"), technologyController.update.bind(technologyController));
router.delete("/:id", authenticateJWT, authorizeRoles("CTO", "Tech-Lead"), technologyController.delete.bind(technologyController));

export default router;
