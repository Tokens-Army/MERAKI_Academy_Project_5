const express = require("express");
const {createNewAccessories,getAllAccessories}=require("../controllers/accessories")
//controllers

const accessoriesRouter = express.Router();
accessoriesRouter.post("/",createNewAccessories)
accessoriesRouter.get("/",getAllAccessories)
module.exports = accessoriesRouter;
