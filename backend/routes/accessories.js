const express = require("express");
const {createNewAccessories}=require("../controllers/accessories")
//controllers

const accessoriesRouter = express.Router();
accessoriesRouter.post("/",createNewAccessories)
module.exports = accessoriesRouter;
