import express from "express";
const router =express.Router();
import { allAccControllers } from "../controllers/AccountControllers.js";
import { auth } from "../middlewares/Authmiddleware.js";
import { allControllersPaytmUsers } from "../controllers/userControllers.js";
// router.get()
router.post('/signUP',allControllersPaytmUsers.signup);
router.post('/signIN',allControllersPaytmUsers.signIN);
router.put('/update',auth,allControllersPaytmUsers.updateInfo)
router.get('/filter',auth,allControllersPaytmUsers.filterusers)
router.get('/amount',auth,allAccControllers.fetchAmount)
router.post('/transfer',auth,allAccControllers.transfer);

export default router;