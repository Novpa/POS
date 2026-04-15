import { Router } from "express";
import { menuController } from "../controllers/menus.controller";
import { uploader } from "../middleware/uploader.middleware";
import { memoryStorage } from "multer";

const route = Router();

// upload options --> memory & disk
route.post(
  "/",
  uploader("uploads", "IMG-MENU", ["jpg", "png", "jpeg"], "memory").array(
    "menuImages",
    3,
  ),
  menuController.createMenu,
);
route.put("/", menuController.updateMenu);
route.get("/", menuController.getAllMenu);
route.delete("/", menuController.deleteMenu);

export default route;
