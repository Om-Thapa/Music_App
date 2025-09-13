import { Router } from "express";
import { protectRoute, requireAdmin } from "../middleware/auth.middleware";
import { checkAdmin, createAlbum, createSong, deleteAlbum, deleteSong } from "../controller/admin.controller";

const router = Router();

router.use(protectRoute, requireAdmin);

router.get("/check", checkAdmin);

router.post("/songs", createSong);
router.delete("/songs/:id", deleteSong);

router.post("/album", createAlbum);
router.post("/album/:id", deleteAlbum);

export default router;