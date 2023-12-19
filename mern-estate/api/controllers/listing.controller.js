import Listing from "../models/listing.model.js"
import errorHandler from "../utils/error.js"

export const createListing = async (req, res, next) => {
  try {
    const listing = await Listing.create(req.body)
    return res.status(201).json(listing)
  } catch (error) {
    next(error)
  }
}

export const deleteListing = async (req, res, next) => {
  const listing = await Listing.findById(req.params.id)
  if (!listing) {
    next(errorHandler(401, "No listing found"))
  }
  if (req.user.id !== listing.userRef) {
    next(errorHandler(404, "you can delete your own listing"))
  }
  try {
    await Listing.findByIdAndDelete(req.params.id)
    res.status(200).json("listing successfully deleted ")
  } catch (error) {
    next(error)
  }
}

export const updateListing = async (req, res, next) => {
  const listing = await Listing.findById(req.params.id)
  if (!listing) {
    return next(errorHandler(401, "Listing Not found"))
  }
  if (req.user.id !== listing.userRef) {
    console.log(listing.userRef, "listing.userRef", req.user.id)
    return next(errorHandler(404, "You can your own listing"))
  }
  try {
    const updatedListing = await Listing.findByIdAndUpdate(req.params.id, req.body, { new: true })
    res.status(200).json(updatedListing)
  } catch (error) {
    return next(error)
  }
}

export const getListingDetails = async (req, res, next) => {
  try {
    const listing = await Listing.findById(req.params.id)
    if (!listing) {
      next(errorHandler(404, "listing not found"))
    }
    res.status(200).json(listing)
  } catch (error) {
    next(error)
  }
}