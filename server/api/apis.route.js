import express from "express";
import APIsCtrl from "./apis.controller.js";

const router = express.Router();

router.route("/").get(APIsCtrl.apiGetAPIs);
router.route("/categories").get(APIsCtrl.apiGetAPIsCategories);
router.route("/names").get(APIsCtrl.apiGetAPIsNames);

export default router;
