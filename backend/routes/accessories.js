const express = require("express");
const {createNewAccessories,getAllAccessories,deleteAccessoryById,updateAccessoryById}=require("../controllers/accessories")

//controllers

const accessoriesRouter = express.Router();
accessoriesRouter.post("/",createNewAccessories)
accessoriesRouter.get("/",getAllAccessories)
accessoriesRouter.delete("/:id",deleteAccessoryById)
accessoriesRouter.put("/:id",updateAccessoryById)

module.exports = accessoriesRouter;
