import express from "express"
import { createListing, deleteListing, updateListing, getListingDetails, getListings } from "../controllers/listing.controller.js"
import { verifyUser } from "../utils/verifyUser.js"

const router = express.Router()

router.post('/create', verifyUser, createListing)
router.delete('/delete/:id', verifyUser, deleteListing)
router.post("/update/:id", verifyUser, updateListing)
router.get("/get/:id", getListingDetails)
router.get("/getListing", getListings)

export default router