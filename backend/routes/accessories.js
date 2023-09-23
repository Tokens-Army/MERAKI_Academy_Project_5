const express = require("express");
const {createNewAccessories,getAllAccessories,deleteAccessoryById}=require("../controllers/accessories")
//controllers

const accessoriesRouter = express.Router();
accessoriesRouter.post("/",createNewAccessories)
accessoriesRouter.get("/",getAllAccessories)
accessoriesRouter.delete("/:id",deleteAccessoryById)
module.exports = accessoriesRouter;
