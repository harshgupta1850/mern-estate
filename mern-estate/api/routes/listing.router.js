import express from "express"
import { createListing, deleteListing ,updateListing,getListingDetails} from "../controllers/listing.controller.js"
import { verifyUser } from "../utils/verifyUser.js"

const router = express.Router()

router.post('/create', verifyUser, createListing)
router.delete('/delete/:id', verifyUser, deleteListing)
router.post("/update/:id",verifyUser,updateListing)
router.get("/get/:id",getListingDetails)


export default router